import { useState } from 'react';
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
import ContentPreview from './ContentPreview';

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
  CreditCard: Plus,
  Book: Plus,
  Rocket: Plus
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
      const response = await fetch(`/api/cms/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Update failed');
      return response.json();
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
      const response = await fetch('/api/cms/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Create failed');
      return response.json();
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
      const response = await fetch(`/api/cms/content/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Delete failed');
      return response.json();
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
      const response = await fetch(`/api/cms/content/${id}/publish`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Publish failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/content'] });
      onRefresh();
      toast({ title: "Content Published", description: "Content is now live." });
    },
  });

  const unpublishMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/cms/content/${id}/unpublish`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Unpublish failed');
      return response.json();
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

  const renderVenueOnboardingEditor = (items: ContentItem[]) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Complete the onboarding for each of your venues</h3>
          <p className="text-sm text-gray-400">Manage venue-specific onboarding progress and tasks</p>
        </div>
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

  const renderTrainingModuleEditor = (items: ContentItem[]) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Master Your Platform - Training Modules</h3>
          <p className="text-sm text-gray-400">Interactive training modules for platform mastery</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setSelectedType('training_modules');
            setShowCreateForm(true);
            setFormData({ 
              title: 'New Training Module',
              description: 'Module description',
              estimatedTime: '15 minutes',
              icon: 'Calendar',
              completed: false,
              order: items.length + 1
            });
          }}
          className="bg-[#FF389A] hover:bg-[#E6329C]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>
      
      <div className="grid gap-3">
        {items.map((item) => (
          <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#FF389A]/20 rounded-full flex items-center justify-center">
                    {(() => {
                      const IconComponent = iconMap[item.content.icon as keyof typeof iconMap] || Calendar;
                      return <IconComponent className="h-5 w-5 text-[#FF389A]" />;
                    })()}
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

  const renderPlatformFeaturesEditor = (items: ContentItem[]) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Master Your Platform - Features</h3>
          <p className="text-sm text-gray-400">Platform features and capabilities overview</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setSelectedType('platform_features');
            setShowCreateForm(true);
            setFormData({ 
              title: 'New Feature',
              description: 'Feature description',
              category: 'General',
              difficulty: 'Beginner',
              estimatedTime: '10 minutes',
              icon: 'Settings',
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
        {items.map((item) => (
          <Card key={item.id} className="bg-[#1A1A2E] border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    {(() => {
                      const IconComponent = iconMap[item.content.icon as keyof typeof iconMap] || Settings;
                      return <IconComponent className="h-5 w-5 text-blue-400" />;
                    })()}
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
        ))}
      </div>
    </div>
  );

  const renderLiveExamplesEditor = (items: ContentItem[]) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Live Feature Examples</h3>
          <p className="text-sm text-gray-400">Interactive demos and live examples</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setSelectedType('live_examples');
            setShowCreateForm(true);
            setFormData({ 
              title: 'New Live Example',
              description: 'Example description',
              demoUrl: 'https://example.com',
              category: 'Demo',
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
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Plus className="h-5 w-5 text-green-400" />
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

    const previewItem = {
      ...editingItem,
      content: formData
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#0D0D24] border border-gray-800 rounded-lg w-full max-w-7xl h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Edit {type.displayName}</h2>
            <Button variant="outline" size="sm" onClick={() => setEditingItem(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Edit Form - Left Side */}
            <div className="w-1/2 border-r border-gray-800 overflow-auto">
              <div className="p-4 space-y-4">
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
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.completed || false}
                        onCheckedChange={(checked) => setFormData({ ...formData, completed: checked })}
                        id="completed"
                      />
                      <Label htmlFor="completed" className="text-gray-200">Mark as Completed</Label>
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
                      <Select value={formData.icon || 'Settings'} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
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
                    <div>
                      <Label className="text-gray-200">Tags (comma-separated)</Label>
                      <Input
                        value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) })}
                        className="bg-[#1A1A2E] border-gray-700 text-white"
                        placeholder="tag1, tag2, tag3"
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
                        <Label className="text-gray-200">Go-Live Date</Label>
                        <Input
                          type="date"
                          value={formData.goLiveDate || ''}
                          onChange={(e) => setFormData({ ...formData, goLiveDate: e.target.value })}
                          className="bg-[#1A1A2E] border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
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
                  </>
                )}

                <div className="flex space-x-3 mt-6">
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
              </div>
            </div>

            {/* Live Preview - Right Side */}
            <div className="w-1/2 overflow-auto">
              <ContentPreview 
                item={previewItem} 
                contentType={type} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCreateForm = () => {
    if (!showCreateForm) return null;

    const type = contentTypes.find(t => t.name === selectedType);
    if (!type) return null;

    return (
      <Card className="bg-[#0D0D24] border-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Create New {type.displayName}
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
    );
  };

  return (
    <div className="space-y-8">
      {/* Venue Onboarding - Complete the onboarding for each of your venues */}
      {renderVenueOnboardingEditor(getItemsByType('venue_onboarding'))}

      {/* Training Modules - Master Your Platform */}
      {renderTrainingModuleEditor(getItemsByType('training_modules'))}
      
      {/* Platform Features - Master Your Platform */}
      {renderPlatformFeaturesEditor(getItemsByType('platform_features'))}
      
      {/* Live Examples */}
      {renderLiveExamplesEditor(getItemsByType('live_examples'))}

      {/* Create Form */}
      {renderCreateForm()}

      {/* Edit Form Modal with Live Preview */}
      {editingItem && renderEditForm()}
    </div>
  );
}