import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Users, 
  Activity, 
  Settings, 
  Lock, 
  Unlock, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Zap,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import ContentEditor from './ContentEditorFixed';

interface CmsAdmin {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
}

interface ContentItem {
  id: number;
  key: string;
  title: string;
  content: any;
  isPublished: boolean;
  publishedAt: string | null;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

interface ContentLock {
  id: number;
  contentItemId: number;
  lockedBy: number;
  lockToken: string;
  expiresAt: string;
}

interface CmsDashboardProps {
  admin: CmsAdmin;
  onLogout: () => void;
}

export default function CmsDashboard({ admin, onLogout }: CmsDashboardProps) {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [currentLock, setCurrentLock] = useState<ContentLock | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch content items
  const { data: contentItems = [], isLoading: contentLoading, refetch: refetchContent } = useQuery({
    queryKey: ['/api/cms/content'],
    retry: false,
  });

  // Fetch content types
  const { data: contentTypes = [] } = useQuery({
    queryKey: ['/api/cms/content-types'],
    retry: false,
  });

  // Fetch activity log
  const { data: activities = [] } = useQuery({
    queryKey: ['/api/cms/activity/my'],
    retry: false,
  });

  // Acquire content lock mutation
  const acquireLockMutation = useMutation({
    mutationFn: async (contentId: number) => {
      return await apiRequest(`/api/cms/content/${contentId}/lock`, {
        method: 'POST',
        body: JSON.stringify({ durationMinutes: 30 })
      });
    },
    onSuccess: (lock) => {
      setCurrentLock(lock);
      toast({
        title: "Content Locked",
        description: "You now have exclusive editing access for 30 minutes.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lock Failed",
        description: error.message || "Another admin is currently editing this content.",
        variant: "destructive",
      });
    },
  });

  // Release lock mutation
  const releaseLockMutation = useMutation({
    mutationFn: async (lockToken: string) => {
      return await apiRequest(`/api/cms/content/lock/${lockToken}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      setCurrentLock(null);
      setEditingContent(null);
      toast({
        title: "Lock Released",
        description: "Content is now available for other admins to edit.",
      });
    },
  });

  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      return await apiRequest(`/api/cms/content/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/content'] });
      toast({
        title: "Content Updated",
        description: "Changes have been saved successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to save changes.",
        variant: "destructive",
      });
    },
  });

  // Publish/unpublish mutations
  const publishMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/cms/content/${id}/publish`, {
        method: 'POST'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/content'] });
      toast({
        title: "Content Published",
        description: "Content is now live on the website.",
      });
    },
  });

  const unpublishMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/cms/content/${id}/unpublish`, {
        method: 'POST'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/content'] });
      toast({
        title: "Content Unpublished",
        description: "Content is no longer visible on the website.",
      });
    },
  });

  const handleEditContent = async (content: ContentItem) => {
    if (currentLock && currentLock.contentItemId !== content.id) {
      toast({
        title: "Release Current Lock",
        description: "Please save and release your current edit session first.",
        variant: "destructive",
      });
      return;
    }

    setSelectedContent(content);
    setEditingContent({ ...content.content });
    
    if (!currentLock || currentLock.contentItemId !== content.id) {
      acquireLockMutation.mutate(content.id);
    }
  };

  const handleSaveContent = async () => {
    if (!selectedContent || !editingContent) return;

    await updateContentMutation.mutateAsync({
      id: selectedContent.id,
      updates: { content: editingContent }
    });

    if (currentLock) {
      releaseLockMutation.mutate(currentLock.lockToken);
    }
  };

  const handleCancelEdit = () => {
    if (currentLock) {
      releaseLockMutation.mutate(currentLock.lockToken);
    } else {
      setSelectedContent(null);
      setEditingContent(null);
    }
  };

  const getStatusBadge = (item: ContentItem) => {
    if (item.isPublished) {
      return <Badge className="bg-green-600 hover:bg-green-700">Published</Badge>;
    }
    return <Badge variant="secondary">Draft</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      super_admin: "bg-red-600",
      admin: "bg-blue-600",
      editor: "bg-green-600"
    };
    return (
      <Badge className={colors[role as keyof typeof colors] || "bg-gray-600"}>
        {role.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-[#0D0D24] border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#FF389A]/20 rounded-full flex items-center justify-center">
              <Settings className="h-6 w-6 text-[#FF389A]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CMS Admin Dashboard</h1>
              <p className="text-sm text-gray-400">Content Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{admin.name}</p>
              <div className="flex items-center space-x-2">
                {getRoleBadge(admin.role)}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="bg-[#1A1A2E] border-gray-700">
            <TabsTrigger value="content" className="data-[state=active]:bg-[#FF389A]">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="venues" className="data-[state=active]:bg-[#FF389A]">
              <Calendar className="h-4 w-4 mr-2" />
              Venue Onboarding
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="data-[state=active]:bg-[#FF389A]">
              <Zap className="h-4 w-4 mr-2" />
              Master the Platform
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-[#FF389A]">
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            {(admin.role === 'super_admin' || admin.role === 'admin') && (
              <TabsTrigger value="users" className="data-[state=active]:bg-[#FF389A]">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
            )}
          </TabsList>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            {currentLock && (
              <Alert className="bg-yellow-900/20 border-yellow-500/50 text-yellow-200">
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  You are currently editing content. Lock expires in {
                    Math.ceil((new Date(currentLock.expiresAt).getTime() - Date.now()) / (1000 * 60))
                  } minutes.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content List */}
              <Card className="bg-[#0D0D24] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Front Page – Website
                    <Button size="sm" className="bg-[#FF389A] hover:bg-[#E6329C]">
                      <Plus className="h-4 w-4 mr-2" />
                      New Content
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {contentLoading ? (
                    <div className="text-center py-8 text-gray-400">Loading content...</div>
                  ) : contentItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No content items found</div>
                  ) : (
                    <div className="space-y-3">
                      {contentItems.map((item: ContentItem) => (
                        <div
                          key={item.id}
                          className="p-4 bg-[#1A1A2E] rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-white">{item.title}</h3>
                            {getStatusBadge(item)}
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{item.key}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditContent(item)}
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                disabled={acquireLockMutation.isPending}
                              >
                                <Edit3 className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              {item.isPublished ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => unpublishMutation.mutate(item.id)}
                                  className="border-orange-600 text-orange-400 hover:bg-orange-900/20"
                                  disabled={unpublishMutation.isPending}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Unpublish
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => publishMutation.mutate(item.id)}
                                  className="border-green-600 text-green-400 hover:bg-green-900/20"
                                  disabled={publishMutation.isPending}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Publish
                                </Button>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(item.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card className="bg-[#0D0D24] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Content Editor
                    {currentLock && (
                      <Badge className="bg-yellow-600">
                        <Lock className="h-3 w-3 mr-1" />
                        Locked
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedContent ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          {selectedContent.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                          Key: {selectedContent.key}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">
                            Content (JSON)
                          </label>
                          <textarea
                            value={JSON.stringify(editingContent, null, 2)}
                            onChange={(e) => {
                              try {
                                setEditingContent(JSON.parse(e.target.value));
                              } catch {
                                // Keep the string value for now
                              }
                            }}
                            rows={12}
                            className="w-full p-3 bg-[#1A1A2E] border border-gray-700 rounded-md text-white font-mono text-sm"
                            placeholder="Enter content as JSON..."
                          />
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={handleSaveContent}
                          className="bg-[#FF389A] hover:bg-[#E6329C]"
                          disabled={updateContentMutation.isPending || !currentLock}
                        >
                          {updateContentMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Edit3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a content item to edit</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Venue Onboarding Tab */}
          <TabsContent value="venues" className="space-y-6">
            <Card className="bg-[#0D0D24] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Venue Onboarding Management</CardTitle>
                <p className="text-gray-400">Manage venue-specific onboarding progress, tasks, and go-live schedules for each location.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Complete the onboarding for each of your venues</h3>
                      <p className="text-sm text-gray-400">Manage venue-specific onboarding progress and tasks</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        // Handle add venue functionality
                      }}
                      className="bg-[#FF389A] hover:bg-[#E6329C]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Venue
                    </Button>
                  </div>
                  
                  <div className="grid gap-3">
                    {contentItems.filter((item: any) => 
                      contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                    ).map((item: any) => {
                      const progressPercentage = Math.round((item.content.completedTasks / item.content.totalTasks) * 100);
                      
                      return (
                        <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-[#FF389A]/20 rounded-full flex items-center justify-center">
                                  <Calendar className="h-5 w-5 text-[#FF389A]" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-white">{item.content.pageTitle}</h4>
                                  <p className="text-sm text-gray-400">
                                    {item.content.completedTasks}/{item.content.totalTasks} Total Tasks Complete • {progressPercentage}% Complete
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-gray-500">⏱ Go-live: {new Date(item.content.goLiveDate).toLocaleDateString()}</span>
                                    <Badge variant={progressPercentage === 100 ? "default" : "secondary"} className="text-xs">
                                      {progressPercentage === 100 ? "Complete" : "In Progress"}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={item.isPublished ? "default" : "secondary"}>
                                  {item.isPublished ? "Published" : "Draft"}
                                </Badge>
                                <Button size="sm" variant="outline">
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Master the Platform Tab */}
          <TabsContent value="onboarding" className="space-y-6">
            <Card className="bg-[#0D0D24] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Master the Platform</CardTitle>
                <p className="text-gray-400">Manage training modules, platform features, and live examples for customer education.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Training Modules */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Training Modules</h3>
                        <p className="text-sm text-gray-400">Interactive training modules for platform mastery</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#FF389A] hover:bg-[#E6329C]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Module
                      </Button>
                    </div>
                    
                    <div className="grid gap-3">
                      {contentItems.filter((item: any) => 
                        contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'training_modules'
                      ).map((item: any) => (
                        <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-[#FF389A]/20 rounded-full flex items-center justify-center">
                                  <Zap className="h-5 w-5 text-[#FF389A]" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-white">{item.content.title}</h4>
                                  <p className="text-sm text-gray-400">{item.content.description}</p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-gray-500">⏱ {item.content.estimatedTime}</span>
                                    <Badge variant={item.content.completed ? "default" : "secondary"} className="text-xs">
                                      {item.content.completed ? "Completed" : "Pending"}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={item.isPublished ? "default" : "secondary"}>
                                  {item.isPublished ? "Published" : "Draft"}
                                </Badge>
                                <Button size="sm" variant="outline">
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Platform Features */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Platform Features</h3>
                        <p className="text-sm text-gray-400">Platform features and capabilities overview</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#FF389A] hover:bg-[#E6329C]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                    
                    <div className="grid gap-3">
                      {contentItems.filter((item: any) => 
                        contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'platform_features'
                      ).map((item: any) => (
                        <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                  <Settings className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-white">{item.content.title}</h4>
                                  <p className="text-sm text-gray-400">{item.content.description}</p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="outline" className="text-xs">{item.content.category}</Badge>
                                    <Badge variant="outline" className="text-xs">{item.content.difficulty}</Badge>
                                    <span className="text-xs text-gray-500">{item.content.estimatedTime}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={item.isPublished ? "default" : "secondary"}>
                                  {item.isPublished ? "Published" : "Draft"}
                                </Badge>
                                <Button size="sm" variant="outline">
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Live Examples */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Live Feature Examples</h3>
                        <p className="text-sm text-gray-400">Interactive demos and live examples</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#FF389A] hover:bg-[#E6329C]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Example
                      </Button>
                    </div>
                    
                    <div className="grid gap-3">
                      {contentItems.filter((item: any) => 
                        contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'live_examples'
                      ).map((item: any) => (
                        <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                  <Zap className="h-5 w-5 text-green-400" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-white">{item.content.title}</h4>
                                  <p className="text-sm text-gray-400">{item.content.description}</p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="outline" className="text-xs">{item.content.category}</Badge>
                                    {item.content.tags?.map((tag: string, index: number) => (
                                      <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={item.isPublished ? "default" : "secondary"}>
                                  {item.isPublished ? "Published" : "Draft"}
                                </Badge>
                                <Button size="sm" variant="outline">
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-[#0D0D24] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">No recent activity</div>
                ) : (
                  <div className="space-y-3">
                    {activities.map((activity: any) => (
                      <div
                        key={activity.id}
                        className="p-3 bg-[#1A1A2E] rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#FF389A]/20 rounded-full flex items-center justify-center">
                              <Activity className="h-4 w-4 text-[#FF389A]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">
                                {activity.action.toUpperCase()} {activity.resourceType}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(activity.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab (Admin only) */}
          {(admin.role === 'super_admin' || admin.role === 'admin') && (
            <TabsContent value="users">
              <Card className="bg-[#0D0D24] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Admin Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-400">
                    User management interface coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}