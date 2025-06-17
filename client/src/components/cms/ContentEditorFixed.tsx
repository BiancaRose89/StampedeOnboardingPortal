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

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#FF389A] h-2 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{item.content.tasksOutstandingText}</span>
                    <span className="text-[#FF389A] font-medium">
                      {daysToGoLive > 0 ? `${daysToGoLive} days to go-live` : 'Go-Live Date Reached'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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

  return (
    <div className="space-y-6">
      {/* Venue Onboarding Tasks */}
      {renderVenueOnboardingEditor(getItemsByType('venue_onboarding'))}

      {/* Edit Form Modal with Live Preview */}
      {editingItem && renderEditForm()}
    </div>
  );
}