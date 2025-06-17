import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Users, 
  Activity, 
  Settings, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff,
  Edit3, 
  Trash2, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Zap,
  Calendar,
  Save,
  X,
  Move,
  Copy,
  GripVertical
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

  // Editing states for making everything configurable
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  
  // Configuration states
  const [dashboardConfig, setDashboardConfig] = useState({
    showSummaryCards: true,
    showSearchFilters: true,
    showTeamInfo: true,
    summaryCardOrder: ['total', 'onTrack', 'atRisk', 'avgProgress'],
    venueDisplayMode: 'cards',
  });

  // Venue onboarding feature configuration
  const [venueFeatures, setVenueFeatures] = useState([
    { id: 'account', name: 'Account Setup', description: 'Platform configuration and initial setup', icon: 'Settings', color: 'blue', visible: true },
    { id: 'bookings', name: 'Bookings Go-Live Guide', description: 'Table management and reservation system', icon: 'Calendar', color: 'pink', visible: true },
    { id: 'loyalty', name: 'Loyalty Go-Live Guide', description: 'Customer rewards and loyalty program setup', icon: 'Zap', color: 'yellow', visible: true },
    { id: 'marketing', name: 'Marketing Go-Live Guide', description: 'Email campaigns and marketing automation', icon: 'Activity', color: 'green', visible: true },
    { id: 'wifi', name: 'WiFi & Guest Capture', description: 'Guest network setup and data collection', icon: 'Settings', color: 'purple', visible: true },
    { id: 'reviews', name: 'Reviews Management', description: 'Online review collection and management', icon: 'CheckCircle', color: 'orange', visible: true },
    { id: 'staff', name: 'Staff Training', description: 'Team onboarding and system training', icon: 'Users', color: 'cyan', visible: true },
    { id: 'golive', name: 'Go-Live Checklist', description: 'Final launch preparation and validation', icon: 'AlertCircle', color: 'red', visible: true },
  ]);

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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#1A1A2E] border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#FF389A]">
              <Settings className="h-4 w-4 mr-2" />
              Admin Overview
            </TabsTrigger>
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

          {/* Admin Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-[#0D0D24] border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-2xl">Admin Overview Dashboard</CardTitle>
                    <p className="text-gray-400">Complete visibility into all venue onboarding progress and performance</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {contentItems.filter((item: any) => 
                        contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                      ).length} Active Venues
                    </Badge>
                    
                    {/* Dashboard Configuration Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure Dashboard
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0D0D24] border-gray-800 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">Dashboard Configuration</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-white font-medium">Display Options</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  checked={dashboardConfig.showSummaryCards}
                                  onChange={(e) => setDashboardConfig(prev => ({...prev, showSummaryCards: e.target.checked}))}
                                  className="rounded"
                                />
                                <span className="text-white">Show Summary Cards</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  checked={dashboardConfig.showSearchFilters}
                                  onChange={(e) => setDashboardConfig(prev => ({...prev, showSearchFilters: e.target.checked}))}
                                  className="rounded"
                                />
                                <span className="text-white">Show Search & Filters</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  checked={dashboardConfig.showTeamInfo}
                                  onChange={(e) => setDashboardConfig(prev => ({...prev, showTeamInfo: e.target.checked}))}
                                  className="rounded"
                                />
                                <span className="text-white">Show Team Info</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="text-white font-medium">Layout</h4>
                            <Select 
                              value={dashboardConfig.venueDisplayMode} 
                              onValueChange={(value) => setDashboardConfig(prev => ({...prev, venueDisplayMode: value}))}
                            >
                              <SelectTrigger className="bg-[#1A1A2E] border-gray-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1A1A2E] border-gray-700">
                                <SelectItem value="cards">Card Layout</SelectItem>
                                <SelectItem value="table">Table Layout</SelectItem>
                                <SelectItem value="grid">Grid Layout</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button className="bg-[#FF389A] hover:bg-[#E6329C]" onClick={() => setShowAddDialog('venue')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Venue
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter Controls */}
                <div className="mb-6 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search venues..."
                          className="w-full sm:w-64 px-4 py-2 bg-[#1A1A2E] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF389A]"
                        />
                      </div>
                      <select className="px-4 py-2 bg-[#1A1A2E] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#FF389A]">
                        <option value="">All Statuses</option>
                        <option value="on-track">On Track</option>
                        <option value="delayed">Delayed</option>
                        <option value="not-started">Not Started</option>
                        <option value="completed">Completed</option>
                      </select>
                      <select className="px-4 py-2 bg-[#1A1A2E] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#FF389A]">
                        <option value="">Sort by</option>
                        <option value="name">Venue Name</option>
                        <option value="progress">Completion %</option>
                        <option value="start-date">Start Date</option>
                        <option value="go-live">Go-Live Date</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Auto-refresh:</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400">Live</span>
                    </div>
                  </div>
                </div>

                {/* Analytics & Insights Panel */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Onboarding Analytics & Insights</h3>
                    <Button variant="outline" size="sm" onClick={() => setEditMode(editMode === 'analytics' ? null : 'analytics')}>
                      <Activity className="h-3 w-3 mr-1" />
                      {editMode === 'analytics' ? 'Hide Analytics' : 'Show Analytics'}
                    </Button>
                  </div>
                  
                  {editMode === 'analytics' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      {/* Time-in-Stage Tracking */}
                      <Card className="bg-[#1A1A2E] border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Time-in-Stage Analysis</CardTitle>
                          <p className="text-gray-400 text-sm">Track venue progress and identify bottlenecks</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {venueFeatures.map((feature) => {
                              // Simulated analytics data based on feature
                              const venueCount = Math.floor(Math.random() * 5) + 1;
                              const avgTime = Math.floor(Math.random() * 24) + 4; // 4-28 hours
                              const isBottleneck = avgTime > 20;
                              
                              return (
                                <div key={feature.id} className="flex items-center justify-between p-3 bg-[#0D0D24] rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                      isBottleneck ? 'bg-red-500/20' : 'bg-green-500/20'
                                    }`}>
                                      <div className={`w-2 h-2 rounded-full ${
                                        isBottleneck ? 'bg-red-400' : 'bg-green-400'
                                      }`}></div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-white text-sm">{feature.name}</h4>
                                      <p className="text-xs text-gray-400">
                                        {venueCount} venues • Avg: {avgTime}hrs
                                        {isBottleneck && <span className="text-red-400 ml-2">⚠ Bottleneck</span>}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className={`text-sm font-medium ${isBottleneck ? 'text-red-400' : 'text-green-400'}`}>
                                      {isBottleneck ? 'Delayed' : 'On Track'}
                                    </div>
                                    <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                                      <div 
                                        className={`h-1 rounded-full ${isBottleneck ? 'bg-red-400' : 'bg-green-400'}`}
                                        style={{ width: `${Math.min(100, (venueCount / 5) * 100)}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <h5 className="text-white font-medium mb-2">Quick Insights</h5>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div className="text-gray-400">
                                <span className="text-red-400">●</span> Most Delayed: Marketing Setup (24hrs avg)
                              </div>
                              <div className="text-gray-400">
                                <span className="text-green-400">●</span> Fastest: Account Setup (4hrs avg)
                              </div>
                              <div className="text-gray-400">
                                <span className="text-yellow-400">●</span> 3 venues stuck 4+ hours
                              </div>
                              <div className="text-gray-400">
                                <span className="text-blue-400">●</span> Total avg: 156hrs
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Section Performance Heatmap */}
                      <Card className="bg-[#1A1A2E] border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Performance Heatmap</CardTitle>
                          <p className="text-gray-400 text-sm">Visual completion time analysis</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {venueFeatures.map((feature, index) => {
                              const completionRate = Math.floor(Math.random() * 40) + 60; // 60-100%
                              const avgTime = Math.floor(Math.random() * 20) + 5; // 5-25 hours
                              const difficulty = avgTime > 18 ? 'hard' : avgTime > 12 ? 'medium' : 'easy';
                              
                              return (
                                <div key={feature.id} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-white text-sm">{feature.name}</span>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline" className={`text-xs ${
                                        difficulty === 'hard' ? 'text-red-400 border-red-400' :
                                        difficulty === 'medium' ? 'text-yellow-400 border-yellow-400' :
                                        'text-green-400 border-green-400'
                                      }`}>
                                        {avgTime}h avg
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full transition-all duration-300 ${
                                        difficulty === 'hard' ? 'bg-red-500' :
                                        difficulty === 'medium' ? 'bg-yellow-500' :
                                        'bg-green-500'
                                      }`}
                                      style={{ width: `${completionRate}%` }}
                                    ></div>
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-400">
                                    <span>{completionRate}% completion rate</span>
                                    <span>{Math.floor(Math.random() * 3) + 1} venues active</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-gray-400">Fast (≤12h)</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                  <span className="text-gray-400">Medium (13-18h)</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <span className="text-gray-400">Slow (18h+)</span>
                                </div>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-[#FF389A] hover:text-white">
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-[#0D0D24] border-gray-800 max-w-4xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="text-white">Section Breakdown Analysis</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-6">
                                    {venueFeatures.map((feature) => {
                                      const activeVenues = Math.floor(Math.random() * 4) + 1;
                                      const avgTime = Math.floor(Math.random() * 20) + 5;
                                      
                                      return (
                                        <Card key={feature.id} className="bg-[#1A1A2E] border-gray-700">
                                          <CardHeader>
                                            <CardTitle className="text-white text-lg">{feature.name}</CardTitle>
                                            <p className="text-gray-400">{activeVenues} venues currently in this section</p>
                                          </CardHeader>
                                          <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                              {/* Venue List */}
                                              <div className="md:col-span-2">
                                                <h5 className="text-white font-medium mb-3">Active Venues</h5>
                                                <div className="space-y-2">
                                                  {Array.from({length: activeVenues}, (_, i) => (
                                                    <div key={i} className="flex items-center justify-between p-2 bg-[#0D0D24] rounded">
                                                      <div className="flex items-center space-x-2">
                                                        <div className="w-6 h-6 bg-[#FF389A]/20 rounded flex items-center justify-center text-xs text-[#FF389A]">
                                                          {i + 1}
                                                        </div>
                                                        <span className="text-white text-sm">Venue {i + 1}</span>
                                                      </div>
                                                      <div className="flex items-center space-x-3">
                                                        <span className="text-xs text-gray-400">{Math.floor(Math.random() * 10) + 2}h spent</span>
                                                        <div className="flex -space-x-1">
                                                          <div className="w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">J</div>
                                                          <div className="w-4 h-4 bg-green-500 rounded-full text-xs text-white flex items-center justify-center">M</div>
                                                        </div>
                                                        <Badge variant="outline" className="text-xs">
                                                          {Math.random() > 0.5 ? 'On Track' : 'Needs Help'}
                                                        </Badge>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                              
                                              {/* Section Stats */}
                                              <div>
                                                <h5 className="text-white font-medium mb-3">Section Stats</h5>
                                                <div className="space-y-3">
                                                  <div className="p-3 bg-[#0D0D24] rounded">
                                                    <div className="text-xs text-gray-400">Average Time</div>
                                                    <div className="text-lg font-bold text-white">{avgTime}h</div>
                                                  </div>
                                                  <div className="p-3 bg-[#0D0D24] rounded">
                                                    <div className="text-xs text-gray-400">Completion Rate</div>
                                                    <div className="text-lg font-bold text-green-400">{Math.floor(Math.random() * 30) + 70}%</div>
                                                  </div>
                                                  <div className="p-3 bg-[#0D0D24] rounded">
                                                    <div className="text-xs text-gray-400">Drop-off Rate</div>
                                                    <div className="text-lg font-bold text-red-400">{Math.floor(Math.random() * 15) + 5}%</div>
                                                  </div>
                                                  <div className="p-3 bg-[#0D0D24] rounded">
                                                    <div className="text-xs text-gray-400">Support Tickets</div>
                                                    <div className="text-lg font-bold text-yellow-400">{Math.floor(Math.random() * 5)}</div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      );
                                    })}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card className="bg-[#1A1A2E] border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Total Venues</p>
                          <p className="text-2xl font-bold text-white">
                            {contentItems.filter((item: any) => 
                              contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                            ).length}
                          </p>
                        </div>
                        <Calendar className="h-8 w-8 text-[#FF389A]" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#1A1A2E] border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">On Track</p>
                          <p className="text-2xl font-bold text-green-400">
                            {contentItems.filter((item: any) => {
                              const isVenue = contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding';
                              if (!isVenue) return false;
                              const progress = Math.round((item.content.completedTasks / item.content.totalTasks) * 100);
                              return progress >= 75;
                            }).length}
                          </p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#1A1A2E] border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">At Risk</p>
                          <p className="text-2xl font-bold text-yellow-400">
                            {contentItems.filter((item: any) => {
                              const isVenue = contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding';
                              if (!isVenue) return false;
                              const progress = Math.round((item.content.completedTasks / item.content.totalTasks) * 100);
                              return progress < 75 && progress > 25;
                            }).length}
                          </p>
                        </div>
                        <AlertCircle className="h-8 w-8 text-yellow-400" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#1A1A2E] border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Avg Progress</p>
                          <p className="text-2xl font-bold text-[#FF389A]">
                            {contentItems.filter((item: any) => 
                              contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                            ).length > 0 ? Math.round(
                              contentItems.filter((item: any) => 
                                contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                              ).reduce((sum: number, item: any) => sum + Math.round((item.content.completedTasks / item.content.totalTasks) * 100), 0) /
                              contentItems.filter((item: any) => 
                                contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                              ).length
                            ) : 0}%
                          </p>
                        </div>
                        <Zap className="h-8 w-8 text-[#FF389A]" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Venues Table */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Active Venue Onboarding</h3>
                  
                  <div className="space-y-3">
                    {contentItems.filter((item: any) => 
                      contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                    ).map((item: any) => {
                      const progressPercentage = Math.round((item.content.completedTasks / item.content.totalTasks) * 100);
                      const startDate = new Date(item.createdAt);
                      const goLiveDate = new Date(item.content.goLiveDate);
                      const today = new Date();
                      const daysElapsed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                      const daysToGoLive = Math.floor((goLiveDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      let status = 'On Track';
                      let statusColor = 'text-green-400';
                      if (progressPercentage < 25) {
                        status = 'Not Started';
                        statusColor = 'text-gray-400';
                      } else if (daysToGoLive < 7 && progressPercentage < 90) {
                        status = 'Delayed';
                        statusColor = 'text-red-400';
                      } else if (progressPercentage < 50 && daysToGoLive < 14) {
                        status = 'At Risk';
                        statusColor = 'text-yellow-400';
                      }
                      
                      return (
                        <Card key={item.id} className="bg-[#1A1A2E] border-gray-700 hover:border-[#FF389A]/50 transition-colors cursor-pointer">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                              {/* Venue Info */}
                              <div className="lg:col-span-2">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-[#FF389A]/20 rounded-lg flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-[#FF389A]" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-white">{item.content.pageTitle}</h4>
                                    <p className="text-sm text-gray-400">ID: {item.id}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Badge variant="outline" className="text-xs">Premium Package</Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Progress */}
                              <div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Progress</span>
                                    <span className="text-sm font-medium text-white">{progressPercentage}%</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="bg-[#FF389A] h-2 rounded-full transition-all duration-300" 
                                      style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-gray-400">
                                    {item.content.completedTasks}/{item.content.totalTasks} tasks
                                  </p>
                                </div>
                              </div>
                              
                              {/* Team & Timing */}
                              <div>
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-400">Team:</span>
                                  </div>
                                  <div className="flex -space-x-1">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                                      J
                                    </div>
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">
                                      M
                                    </div>
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white">
                                      S
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-400">{daysElapsed} days elapsed</p>
                                </div>
                              </div>
                              
                              {/* Dates */}
                              <div>
                                <div className="space-y-1">
                                  <p className="text-xs text-gray-400">Started:</p>
                                  <p className="text-sm text-white">{startDate.toLocaleDateString()}</p>
                                  <p className="text-xs text-gray-400">Go-Live:</p>
                                  <p className="text-sm text-white">{goLiveDate.toLocaleDateString()}</p>
                                  <p className={`text-xs ${daysToGoLive > 0 ? 'text-gray-400' : 'text-red-400'}`}>
                                    {daysToGoLive > 0 ? `${daysToGoLive} days left` : `${Math.abs(daysToGoLive)} days overdue`}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Status & Actions */}
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <Badge variant="outline" className={`${statusColor} border-current`}>
                                    {status}
                                  </Badge>
                                  <Badge variant={item.isPublished ? "default" : "secondary"} className="block text-xs">
                                    {item.isPublished ? "Published" : "Draft"}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" variant="outline" className="text-xs">
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-xs">
                                    <Edit3 className="h-3 w-3 mr-1" />
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  
                  {contentItems.filter((item: any) => 
                    contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                  ).length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">No Active Venues</h3>
                      <p className="text-gray-500 mb-4">Start by adding your first venue to begin the onboarding process.</p>
                      <Button className="bg-[#FF389A] hover:bg-[#E6329C]">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Venue
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                  
                  <div className="space-y-6">
                    {contentItems.filter((item: any) => 
                      contentTypes.find((type: any) => type.id === item.contentTypeId)?.name === 'venue_onboarding'
                    ).map((item: any) => {
                      const progressPercentage = Math.round((item.content.completedTasks / item.content.totalTasks) * 100);
                      
                      return (
                        <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
                          <CardContent className="p-6">
                            {/* Venue Header */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-[#FF389A]/20 rounded-full flex items-center justify-center">
                                  <Calendar className="h-6 w-6 text-[#FF389A]" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-white">{item.content.pageTitle}</h4>
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

                            {/* Progress Bar */}
                            <div className="mb-6">
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-[#FF389A] h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${progressPercentage}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Onboarding Features Grid */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h5 className="text-md font-medium text-white">Onboarding Features & Tasks</h5>
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" variant="outline" onClick={() => setShowAddDialog('feature')}>
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add Feature
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => setEditMode(editMode === 'features' ? null : 'features')}>
                                    <Edit3 className="h-3 w-3 mr-1" />
                                    {editMode === 'features' ? 'Done' : 'Edit All'}
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="grid gap-3">
                                {venueFeatures.filter(feature => feature.visible).map((feature, index) => {
                                  const getIconComponent = (iconName: string) => {
                                    const iconMap: any = {
                                      Settings, Calendar, Zap, Activity, CheckCircle, Users, AlertCircle
                                    };
                                    return iconMap[iconName] || Settings;
                                  };
                                  
                                  const getColorClasses = (color: string) => {
                                    const colorMap: any = {
                                      blue: 'bg-blue-500/20 text-blue-400',
                                      pink: 'bg-[#FF389A]/20 text-[#FF389A]',
                                      yellow: 'bg-yellow-500/20 text-yellow-400',
                                      green: 'bg-green-500/20 text-green-400',
                                      purple: 'bg-purple-500/20 text-purple-400',
                                      orange: 'bg-orange-500/20 text-orange-400',
                                      cyan: 'bg-cyan-500/20 text-cyan-400',
                                      red: 'bg-red-500/20 text-red-400',
                                    };
                                    return colorMap[color] || 'bg-gray-500/20 text-gray-400';
                                  };
                                  
                                  const IconComponent = getIconComponent(feature.icon);
                                  
                                  return (
                                    <div 
                                      key={feature.id}
                                      className={`flex items-center justify-between p-3 bg-[#0D0D24] rounded-lg border border-gray-700 ${
                                        editMode === 'features' ? 'border-[#FF389A]/50' : ''
                                      } ${draggedItem?.id === feature.id ? 'opacity-50' : ''}`}
                                      draggable={editMode === 'features'}
                                      onDragStart={() => setDraggedItem(feature)}
                                      onDragEnd={() => setDraggedItem(null)}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        e.preventDefault();
                                        if (draggedItem && draggedItem.id !== feature.id) {
                                          const draggedIndex = venueFeatures.findIndex(f => f.id === draggedItem.id);
                                          const targetIndex = venueFeatures.findIndex(f => f.id === feature.id);
                                          const newFeatures = [...venueFeatures];
                                          const [movedItem] = newFeatures.splice(draggedIndex, 1);
                                          newFeatures.splice(targetIndex, 0, movedItem);
                                          setVenueFeatures(newFeatures);
                                        }
                                      }}
                                    >
                                      <div className="flex items-center space-x-3">
                                        {editMode === 'features' && (
                                          <GripVertical className="h-4 w-4 text-gray-500 cursor-move" />
                                        )}
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(feature.color)}`}>
                                          <IconComponent className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1">
                                          {editingItem?.id === feature.id ? (
                                            <div className="space-y-1">
                                              <Input
                                                value={editingItem.name}
                                                onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                                                className="bg-[#1A1A2E] border-gray-600 text-white text-sm"
                                                placeholder="Feature name"
                                              />
                                              <Textarea
                                                value={editingItem.description}
                                                onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                                                className="bg-[#1A1A2E] border-gray-600 text-white text-xs resize-none"
                                                rows={2}
                                                placeholder="Description"
                                              />
                                            </div>
                                          ) : (
                                            <div>
                                              <h6 className="font-medium text-white">{feature.name}</h6>
                                              <p className="text-xs text-gray-400">{feature.description}</p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        {editingItem?.id === feature.id ? (
                                          <div className="flex items-center space-x-1">
                                            <Button 
                                              size="sm" 
                                              variant="ghost" 
                                              className="text-green-400 hover:text-green-300"
                                              onClick={() => {
                                                const updatedFeatures = venueFeatures.map(f => 
                                                  f.id === feature.id ? editingItem : f
                                                );
                                                setVenueFeatures(updatedFeatures);
                                                setEditingItem(null);
                                                toast({ title: "Feature updated", description: "Changes saved successfully" });
                                              }}
                                            >
                                              <Save className="h-3 w-3" />
                                            </Button>
                                            <Button 
                                              size="sm" 
                                              variant="ghost" 
                                              className="text-gray-400 hover:text-white"
                                              onClick={() => setEditingItem(null)}
                                            >
                                              <X className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        ) : (
                                          <>
                                            <Button 
                                              size="sm" 
                                              variant="ghost" 
                                              className={`text-gray-400 hover:text-white ${feature.visible ? 'text-green-400' : 'text-gray-500'}`}
                                              onClick={() => {
                                                const updatedFeatures = venueFeatures.map(f => 
                                                  f.id === feature.id ? {...f, visible: !f.visible} : f
                                                );
                                                setVenueFeatures(updatedFeatures);
                                              }}
                                            >
                                              {feature.visible ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                                              {feature.visible ? 'Visible' : 'Hidden'}
                                            </Button>
                                            <Button 
                                              size="sm" 
                                              variant="ghost" 
                                              className="text-gray-400 hover:text-white"
                                              onClick={() => setEditingItem(feature)}
                                            >
                                              <Edit3 className="h-3 w-3" />
                                            </Button>
                                            {editMode === 'features' && (
                                              <Button 
                                                size="sm" 
                                                variant="ghost" 
                                                className="text-red-400 hover:text-red-300"
                                                onClick={() => {
                                                  const updatedFeatures = venueFeatures.filter(f => f.id !== feature.id);
                                                  setVenueFeatures(updatedFeatures);
                                                  toast({ title: "Feature removed", description: "Feature has been deleted" });
                                                }}
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </Button>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-6 pt-4 border-t border-gray-700">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" className="bg-[#FF389A] hover:bg-[#E6329C]">
                                    Save Changes
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Preview Changes
                                  </Button>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                    <Eye className="h-3 w-3 mr-1" />
                                    Show All
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                    <EyeOff className="h-3 w-3 mr-1" />
                                    Hide All
                                  </Button>
                                </div>
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