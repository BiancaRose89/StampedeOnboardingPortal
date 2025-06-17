import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Edit3,
  Eye,
  EyeOff,
  CheckCircle,
  Calendar,
  Star,
  Target,
  BarChart3,
  Users,
  Settings,
  Wifi,
  Gift
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ContentItem {
  id: number;
  key: string;
  title: string;
  content: any;
  isPublished: boolean;
  publishedAt: string | null;
  contentTypeId: number;
}

interface ContentType {
  id: number;
  name: string;
  displayName: string;
  description: string;
}

interface ContentEditorProps {
  contentItems: ContentItem[];
  contentTypes: ContentType[];
  onRefresh: () => void;
}

const iconMap = {
  Calendar: Calendar,
  Star: Star,
  Target: Target,
  BarChart3: BarChart3,
  Users: Users,
  Settings: Settings,
  Wifi: Wifi,
  Gift: Gift,
  CheckCircle: CheckCircle,
  CreditCard: Plus, // Using Plus as placeholder for CreditCard
  Book: Plus, // Using Plus as placeholder for Book 
  Rocket: Plus // Using Plus as placeholder for Rocket
};

export default function ContentEditor({ contentItems, contentTypes, onRefresh }: ContentEditorProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get items by type
  const getItemsByType = (typeName: string) => {
    const type = contentTypes.find(t => t.name === typeName);
    if (!type) return [];
    return contentItems.filter(item => item.contentTypeId === type.id)
      .sort((a, b) => (a.content.order || 0) - (b.content.order || 0));
  };

  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      return await apiRequest(`/api/cms/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/content'] });
      onRefresh();
      toast({ title: "Content Updated", description: "Changes saved successfully." });
      setEditingItem(null);
      setFormData({});
    },
    onError: (error: any) => {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    },
  });

  // Create content mutation
  const createContentMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/cms/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/content'] });
      onRefresh();
      toast({ title: "Content Created", description: "New item created successfully." });
      setShowCreateForm(false);
      setFormData({});
    },
    onError: (error: any) => {
      toast({ title: "Creation Failed", description: error.message, variant: "destructive" });
    },
  });

  // Delete content mutation
  const deleteContentMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/cms/content/${id}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/content'] });
      onRefresh();
      toast({ title: "Content Deleted", description: "Item deleted successfully." });
    },
    onError: (error: any) => {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
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
      onRefresh();
      toast({ title: "Content Published", description: "Content is now live." });
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
      onRefresh();
      toast({ title: "Content Unpublished", description: "Content is now hidden." });
    },
  });

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setFormData(item.content);
  };

  const handleSave = () => {
    if (!editingItem) return;
    
    updateContentMutation.mutate({
      id: editingItem.id,
      updates: { content: formData }
    });
  };

  const handleCreate = () => {
    const type = contentTypes.find(t => t.name === selectedType);
    if (!type) return;

    const key = `${selectedType}_${Date.now()}`;
    createContentMutation.mutate({
      key,
      contentTypeId: type.id,
      title: formData.title || 'New Item',
      content: formData
    });
  };

  const renderTrainingModuleEditor = (items: ContentItem[]) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Training Modules</h3>
        <Button
          size="sm"
          onClick={() => {
            setSelectedType('training_modules');
            setShowCreateForm(true);
            setFormData({ title: '', description: '', estimatedTime: '', completed: false, icon: 'Calendar', order: items.length + 1 });
          }}
          className="bg-[#FF389A] hover:bg-[#E6329C]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>
      
      <div className="grid gap-3">
        {items.map((item) => {
          const IconComponent = iconMap[item.content.icon as keyof typeof iconMap] || Calendar;
          return (
            <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#FF389A]/20 rounded-full flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-[#FF389A]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.content.title}</h4>
                      <p className="text-sm text-gray-400">{item.content.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={item.content.completed}
                      onCheckedChange={(checked) => {
                        updateContentMutation.mutate({
                          id: item.id,
                          updates: { content: { ...item.content, completed: checked } }
                        });
                      }}
                    />
                    <Badge variant={item.isPublished ? "default" : "secondary"}>
                      {item.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => item.isPublished ? unpublishMutation.mutate(item.id) : publishMutation.mutate(item.id)}
                    >
                      {item.isPublished ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteContentMutation.mutate(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderPlatformFeaturesEditor = (items: ContentItem[]) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Master Platform Features</h3>
        <Button
          size="sm"
          onClick={() => {
            setSelectedType('platform_features');
            setShowCreateForm(true);
            setFormData({ 
              title: '', 
              description: '', 
              icon: 'Calendar', 
              category: 'Core Features',
              difficulty: 'Beginner',
              estimatedTime: '',
              order: items.length + 1
            });
          }}
          className="bg-[#FF389A] hover:bg-[#E6329C]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>
      
      <div className="grid gap-3">
        {items.map((item) => {
          const IconComponent = iconMap[item.content.icon as keyof typeof iconMap] || Settings;
          return (
            <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-blue-400" />
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
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => item.isPublished ? unpublishMutation.mutate(item.id) : publishMutation.mutate(item.id)}
                    >
                      {item.isPublished ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteContentMutation.mutate(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderVenueOnboardingEditor = (items: ContentItem[]) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Venue Onboarding Tasks</h3>
        <Button
          size="sm"
          onClick={() => {
            setSelectedType('venue_onboarding');
            setShowCreateForm(true);
            setFormData({ 
              venueNumber: 1,
              totalTasks: 8,
              completedTasks: 0,
              progressPercentage: 0,
              goLiveDate: '2025-01-07',
              pageTitle: 'Complete the onboarding for your venue',
              tasksOutstandingText: 'Tasks Outstanding: 8 tasks across all venues',
              goLiveDateText: 'Go-Live Date (Target launch: 07/01/2025)',
              venueProgressTitle: 'Venue Onboarding Progress',
              tasks: []
            });
          }}
          className="bg-[#FF389A] hover:bg-[#E6329C]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Venue
        </Button>
      </div>
      
      <div className="grid gap-3">
        {items.map((item) => {
          const progressPercentage = Math.round((item.content.completedTasks / item.content.totalTasks) * 100);
          const daysToGoLive = Math.ceil((new Date(item.content.goLiveDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
          
          return (
            <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{item.content.pageTitle}</h4>
                      <p className="text-sm text-gray-400">
                        {item.content.completedTasks}/{item.content.totalTasks} Total Tasks Complete • {progressPercentage}% Complete
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={item.isPublished ? "default" : "secondary"}>
                        {item.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => item.isPublished ? unpublishMutation.mutate(item.id) : publishMutation.mutate(item.id)}
                      >
                        {item.isPublished ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteContentMutation.mutate(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#FF389A] h-2 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>

                  {/* Go-Live Countdown */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{item.content.tasksOutstandingText}</span>
                    <span className="text-[#FF389A] font-medium">
                      {daysToGoLive > 0 ? `${daysToGoLive} days to go-live` : 'Go-Live Date Reached'}
                    </span>
                  </div>

                  {/* Task Preview */}
                  <div className="grid grid-cols-2 gap-2">
                    {item.content.tasks?.slice(0, 4).map((task: any, index: number) => {
                      const IconComponent = iconMap[task.icon as keyof typeof iconMap] || Settings;
                      return (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-[#0D0D24] rounded">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            task.status === 'completed' ? 'bg-green-500/20' : 
                            task.status === 'in-progress' ? 'bg-yellow-500/20' : 'bg-gray-500/20'
                          }`}>
                            <IconComponent className={`h-3 w-3 ${
                              task.status === 'completed' ? 'text-green-400' : 
                              task.status === 'in-progress' ? 'text-yellow-400' : 'text-gray-400'
                            }`} />
                          </div>
                          <span className="text-xs text-white truncate">{task.name}</span>
                        </div>
                      );
                    })}
                    {item.content.tasks?.length > 4 && (
                      <div className="flex items-center justify-center p-2 bg-[#0D0D24] rounded text-xs text-gray-400">
                        +{item.content.tasks.length - 4} more tasks
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderLiveExamplesEditor = (items: ContentItem[]) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Live Feature Examples</h3>
        <Button
          size="sm"
          onClick={() => {
            setSelectedType('live_examples');
            setShowCreateForm(true);
            setFormData({ 
              title: '', 
              description: '', 
              demoUrl: '',
              thumbnailUrl: '',
              category: 'Bookings',
              tags: [],
              order: items.length + 1
            });
          }}
          className="bg-[#FF389A] hover:bg-[#E6329C]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Example
        </Button>
      </div>
      
      <div className="grid gap-3">
        {items.map((item) => (
          <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded flex items-center justify-center">
                    <Eye className="h-4 w-4 text-green-400" />
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
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => item.isPublished ? unpublishMutation.mutate(item.id) : publishMutation.mutate(item.id)}
                  >
                    {item.isPublished ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteContentMutation.mutate(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEditForm = () => {
    if (!editingItem) return null;

    const type = contentTypes.find(t => t.id === editingItem.contentTypeId);
    if (!type) return null;

    return (
      <Card className="bg-[#0D0D24] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Edit {type.displayName}
            <Button variant="outline" size="sm" onClick={() => setEditingItem(null)}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {type.name === 'training_modules' && (
            <>
              <div>
                <Label className="text-gray-200">Title</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">Description</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">Estimated Time</Label>
                <Input
                  value={formData.estimatedTime || ''}
                  onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">Icon</Label>
                <Select value={formData.icon || 'Calendar'} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger className="bg-[#1A1A2E] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(iconMap).map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {type.name === 'platform_features' && (
            <>
              <div>
                <Label className="text-gray-200">Title</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">Description</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-200">Category</Label>
                  <Input
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-[#1A1A2E] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Difficulty</Label>
                  <Select value={formData.difficulty || 'Beginner'} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                    <SelectTrigger className="bg-[#1A1A2E] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {type.name === 'live_examples' && (
            <>
              <div>
                <Label className="text-gray-200">Title</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">Description</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">Demo URL</Label>
                <Input
                  value={formData.demoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">Category</Label>
                <Input
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>
            </>
          )}

          {type.name === 'venue_onboarding' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-200">Page Title</Label>
                  <Input
                    value={formData.pageTitle || ''}
                    onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                    className="bg-[#1A1A2E] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Venue Number</Label>
                  <Input
                    type="number"
                    value={formData.venueNumber || ''}
                    onChange={(e) => setFormData({ ...formData, venueNumber: parseInt(e.target.value) || 1 })}
                    className="bg-[#1A1A2E] border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-200">Total Tasks</Label>
                  <Input
                    type="number"
                    value={formData.totalTasks || ''}
                    onChange={(e) => setFormData({ ...formData, totalTasks: parseInt(e.target.value) || 8 })}
                    className="bg-[#1A1A2E] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Completed Tasks</Label>
                  <Input
                    type="number"
                    value={formData.completedTasks || ''}
                    onChange={(e) => setFormData({ ...formData, completedTasks: parseInt(e.target.value) || 0 })}
                    className="bg-[#1A1A2E] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Go-Live Date</Label>
                  <Input
                    type="date"
                    value={formData.goLiveDate || ''}
                    onChange={(e) => setFormData({ ...formData, goLiveDate: e.target.value })}
                    className="bg-[#1A1A2E] border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-200">Tasks Outstanding Text</Label>
                <Input
                  value={formData.tasksOutstandingText || ''}
                  onChange={(e) => setFormData({ ...formData, tasksOutstandingText: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-200">Go-Live Date Text</Label>
                <Input
                  value={formData.goLiveDateText || ''}
                  onChange={(e) => setFormData({ ...formData, goLiveDateText: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-200">Venue Progress Title</Label>
                <Input
                  value={formData.venueProgressTitle || ''}
                  onChange={(e) => setFormData({ ...formData, venueProgressTitle: e.target.value })}
                  className="bg-[#1A1A2E] border-gray-700 text-white"
                />
              </div>

              {/* Tasks Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-200 text-lg">Task Management</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const newTask = {
                        id: (formData.tasks?.length || 0) + 1,
                        name: 'New Task',
                        description: 'Task description',
                        timeEstimate: '30 minutes',
                        status: 'pending',
                        assignedTo: 'Team Member',
                        icon: 'Settings',
                        category: 'General',
                        priority: 'Medium',
                        dueDate: '',
                        notes: ''
                      };
                      setFormData({ 
                        ...formData, 
                        tasks: [...(formData.tasks || []), newTask],
                        totalTasks: (formData.tasks?.length || 0) + 1
                      });
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Task
                  </Button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-3">
                  {formData.tasks?.map((task: any, index: number) => (
                    <Card key={index} className="bg-[#0D0D24] border-gray-600">
                      <CardContent className="p-3">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">Task #{task.id}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const updatedTasks = formData.tasks.filter((_: any, i: number) => i !== index);
                                setFormData({ 
                                  ...formData, 
                                  tasks: updatedTasks,
                                  totalTasks: updatedTasks.length
                                });
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs text-gray-300">Task Name</Label>
                              <Input
                                value={task.name}
                                onChange={(e) => {
                                  const updatedTasks = [...formData.tasks];
                                  updatedTasks[index] = { ...task, name: e.target.value };
                                  setFormData({ ...formData, tasks: updatedTasks });
                                }}
                                className="bg-[#1A1A2E] border-gray-600 text-white text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-300">Assigned To</Label>
                              <Input
                                value={task.assignedTo}
                                onChange={(e) => {
                                  const updatedTasks = [...formData.tasks];
                                  updatedTasks[index] = { ...task, assignedTo: e.target.value };
                                  setFormData({ ...formData, tasks: updatedTasks });
                                }}
                                className="bg-[#1A1A2E] border-gray-600 text-white text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs text-gray-300">Description</Label>
                            <Textarea
                              value={task.description}
                              onChange={(e) => {
                                const updatedTasks = [...formData.tasks];
                                updatedTasks[index] = { ...task, description: e.target.value };
                                setFormData({ ...formData, tasks: updatedTasks });
                              }}
                              className="bg-[#1A1A2E] border-gray-600 text-white text-xs"
                              rows={2}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <Label className="text-xs text-gray-300">Time Estimate</Label>
                              <Input
                                value={task.timeEstimate}
                                onChange={(e) => {
                                  const updatedTasks = [...formData.tasks];
                                  updatedTasks[index] = { ...task, timeEstimate: e.target.value };
                                  setFormData({ ...formData, tasks: updatedTasks });
                                }}
                                className="bg-[#1A1A2E] border-gray-600 text-white text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-300">Status</Label>
                              <Select 
                                value={task.status} 
                                onValueChange={(value) => {
                                  const updatedTasks = [...formData.tasks];
                                  updatedTasks[index] = { ...task, status: value };
                                  setFormData({ ...formData, tasks: updatedTasks });
                                }}
                              >
                                <SelectTrigger className="bg-[#1A1A2E] border-gray-600 text-white text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-300">Priority</Label>
                              <Select 
                                value={task.priority} 
                                onValueChange={(value) => {
                                  const updatedTasks = [...formData.tasks];
                                  updatedTasks[index] = { ...task, priority: value };
                                  setFormData({ ...formData, tasks: updatedTasks });
                                }}
                              >
                                <SelectTrigger className="bg-[#1A1A2E] border-gray-600 text-white text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Low">Low</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                  <SelectItem value="Critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="flex space-x-3">
            <Button
              onClick={handleSave}
              className="bg-[#FF389A] hover:bg-[#E6329C]"
              disabled={updateContentMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              {updateContentMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Venue Onboarding Tasks */}
      {renderVenueOnboardingEditor(getItemsByType('venue_onboarding'))}
      
      {/* Training Modules */}
      {renderTrainingModuleEditor(getItemsByType('training_modules'))}
      
      {/* Platform Features */}
      {renderPlatformFeaturesEditor(getItemsByType('platform_features'))}
      
      {/* Live Examples */}
      {renderLiveExamplesEditor(getItemsByType('live_examples'))}

      {/* Edit Form Modal */}
      {editingItem && renderEditForm()}

      {/* Create Form Modal */}
      {showCreateForm && (
        <Card className="bg-[#0D0D24] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Create New {contentTypes.find(t => t.name === selectedType)?.displayName}
              <Button variant="outline" size="sm" onClick={() => setShowCreateForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-200">Title</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-[#1A1A2E] border-gray-700 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-200">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#1A1A2E] border-gray-700 text-white"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleCreate}
                className="bg-[#FF389A] hover:bg-[#E6329C]"
                disabled={createContentMutation.isPending}
              >
                <Plus className="h-4 w-4 mr-2" />
                {createContentMutation.isPending ? 'Creating...' : 'Create'}
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}