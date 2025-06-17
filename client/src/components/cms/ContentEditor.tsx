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
  Gift: Gift
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