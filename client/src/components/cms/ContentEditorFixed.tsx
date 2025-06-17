import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Eye, 
  EyeOff, 
  Save, 
  Edit3, 
  Trash2, 
  GripVertical, 
  Upload,
  Link as LinkIcon,
  Type,
  Image as ImageIcon,
  Monitor,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentSection {
  id: string;
  type: 'hero' | 'feature' | 'cta' | 'testimonial' | 'footer' | 'custom';
  title: string;
  description: string;
  content: {
    headline?: string;
    text?: string;
    imageUrl?: string;
    linkUrl?: string;
    linkText?: string;
  };
  metadata: {
    headlineTag: 'h1' | 'h2' | 'h3' | 'h4';
    visible: boolean;
    order: number;
  };
}

interface ContentEditorFixedProps {
  contentItem: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function ContentEditorFixed({ contentItem, onSave, onCancel }: ContentEditorFixedProps) {
  const { toast } = useToast();
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Hero Banner',
      description: 'Main banner section with headline and call-to-action',
      content: {
        headline: 'Welcome to Stampede',
        text: 'Your all-in-one hospitality platform helping you manage bookings, loyalty, and marketing.',
        imageUrl: '/api/placeholder/1200/600',
        linkUrl: '/get-started',
        linkText: 'Get Started'
      },
      metadata: {
        headlineTag: 'h1',
        visible: true,
        order: 1
      }
    },
    {
      id: '2',
      type: 'feature',
      title: 'Features Section',
      description: 'Highlight key platform features and benefits',
      content: {
        headline: 'Everything You Need',
        text: 'Streamline your operations with our comprehensive suite of tools designed for hospitality businesses.',
        imageUrl: '/api/placeholder/800/400',
        linkUrl: '/features',
        linkText: 'Explore Features'
      },
      metadata: {
        headlineTag: 'h2',
        visible: true,
        order: 2
      }
    },
    {
      id: '3',
      type: 'cta',
      title: 'Call to Action',
      description: 'Primary conversion section for user engagement',
      content: {
        headline: 'Ready to Transform Your Business?',
        text: 'Join thousands of venues already using Stampede to boost their revenue and customer satisfaction.',
        linkUrl: '/contact',
        linkText: 'Contact Sales'
      },
      metadata: {
        headlineTag: 'h2',
        visible: true,
        order: 3
      }
    }
  ]);
  
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [draggedSection, setDraggedSection] = useState<ContentSection | null>(null);

  const handleSectionUpdate = (sectionId: string, updates: Partial<ContentSection>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const handleContentUpdate = (sectionId: string, contentUpdates: Partial<ContentSection['content']>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, content: { ...section.content, ...contentUpdates } }
        : section
    ));
  };

  const handleMetadataUpdate = (sectionId: string, metadataUpdates: Partial<ContentSection['metadata']>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, metadata: { ...section.metadata, ...metadataUpdates } }
        : section
    ));
  };

  const addNewSection = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      type: 'custom',
      title: 'New Section',
      description: 'Custom content section',
      content: {
        headline: 'Section Headline',
        text: 'Section content goes here...',
        linkText: 'Learn More'
      },
      metadata: {
        headlineTag: 'h2',
        visible: true,
        order: sections.length + 1
      }
    };
    setSections(prev => [...prev, newSection]);
  };

  const deleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
    toast({ title: "Section deleted", description: "Content section has been removed" });
  };

  const reorderSections = (draggedId: string, targetId: string) => {
    const draggedIndex = sections.findIndex(s => s.id === draggedId);
    const targetIndex = sections.findIndex(s => s.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    const newSections = [...sections];
    const [movedSection] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, movedSection);
    
    // Update order metadata
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      metadata: { ...section.metadata, order: index + 1 }
    }));
    
    setSections(updatedSections);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero': return '🎯';
      case 'feature': return '⭐';
      case 'cta': return '🚀';
      case 'testimonial': return '💬';
      case 'footer': return '🔗';
      default: return '📄';
    }
  };

  const saveAllChanges = () => {
    const contentData = {
      sections: sections,
      lastModified: new Date().toISOString()
    };
    onSave(contentData);
    toast({ title: "Content saved", description: "All sections have been updated successfully" });
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Front Page Content Editor</h3>
          <p className="text-gray-400">Edit your website sections with visual preview</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={addNewSection} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
          <Button onClick={saveAllChanges} className="bg-[#FF389A] hover:bg-[#E6329C]">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">Content Sections</h4>
          
          {sections
            .sort((a, b) => a.metadata.order - b.metadata.order)
            .map((section) => (
              <Card 
                key={section.id} 
                className={`bg-[#1A1A2E] border-gray-700 ${
                  editingSection === section.id ? 'border-[#FF389A]' : ''
                } ${!section.metadata.visible ? 'opacity-60' : ''}`}
                draggable
                onDragStart={() => setDraggedSection(section)}
                onDragEnd={() => setDraggedSection(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggedSection && draggedSection.id !== section.id) {
                    reorderSections(draggedSection.id, section.id);
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="h-4 w-4 text-gray-500 cursor-move" />
                      <span className="text-lg">{getSectionIcon(section.type)}</span>
                      <div>
                        <CardTitle className="text-white text-base">{section.title}</CardTitle>
                        <p className="text-xs text-gray-400">{section.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {section.metadata.headlineTag}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMetadataUpdate(section.id, { visible: !section.metadata.visible })}
                        className={section.metadata.visible ? 'text-green-400' : 'text-gray-500'}
                      >
                        {section.metadata.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteSection(section.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {editingSection === section.id && (
                  <CardContent className="space-y-4">
                    {/* Section Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Section Title</label>
                        <Input
                          value={section.title}
                          onChange={(e) => handleSectionUpdate(section.id, { title: e.target.value })}
                          className="bg-[#0D0D24] border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Headline Tag</label>
                        <Select 
                          value={section.metadata.headlineTag}
                          onValueChange={(value) => handleMetadataUpdate(section.id, { headlineTag: value as any })}
                        >
                          <SelectTrigger className="bg-[#0D0D24] border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A2E] border-gray-700">
                            <SelectItem value="h1">H1</SelectItem>
                            <SelectItem value="h2">H2</SelectItem>
                            <SelectItem value="h3">H3</SelectItem>
                            <SelectItem value="h4">H4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Content Fields */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Type className="h-3 w-3 text-gray-400" />
                          <label className="text-sm text-gray-400">Headline</label>
                        </div>
                        <Input
                          value={section.content.headline || ''}
                          onChange={(e) => handleContentUpdate(section.id, { headline: e.target.value })}
                          className="bg-[#0D0D24] border-gray-600 text-white"
                          placeholder="Section headline"
                        />
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Type className="h-3 w-3 text-gray-400" />
                          <label className="text-sm text-gray-400">Content Text</label>
                        </div>
                        <Textarea
                          value={section.content.text || ''}
                          onChange={(e) => handleContentUpdate(section.id, { text: e.target.value })}
                          className="bg-[#0D0D24] border-gray-600 text-white resize-none"
                          rows={3}
                          placeholder="Section content text"
                        />
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <ImageIcon className="h-3 w-3 text-gray-400" />
                          <label className="text-sm text-gray-400">Image URL</label>
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            value={section.content.imageUrl || ''}
                            onChange={(e) => handleContentUpdate(section.id, { imageUrl: e.target.value })}
                            className="bg-[#0D0D24] border-gray-600 text-white flex-1"
                            placeholder="https://example.com/image.jpg"
                          />
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <LinkIcon className="h-3 w-3 text-gray-400" />
                            <label className="text-sm text-gray-400">Link URL</label>
                          </div>
                          <Input
                            value={section.content.linkUrl || ''}
                            onChange={(e) => handleContentUpdate(section.id, { linkUrl: e.target.value })}
                            className="bg-[#0D0D24] border-gray-600 text-white"
                            placeholder="/page-url"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Type className="h-3 w-3 text-gray-400" />
                            <label className="text-sm text-gray-400">Link Text</label>
                          </div>
                          <Input
                            value={section.content.linkText || ''}
                            onChange={(e) => handleContentUpdate(section.id, { linkText: e.target.value })}
                            className="bg-[#0D0D24] border-gray-600 text-white"
                            placeholder="Button text"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <div className="text-xs text-gray-400">
                        Order: {section.metadata.order} • {section.metadata.visible ? 'Visible' : 'Hidden'}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#0D0D24] border-gray-800 max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-white">Section Preview: {section.title}</DialogTitle>
                            </DialogHeader>
                            <div className="bg-white p-6 rounded-lg">
                              <div className={`text-center ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                                {section.content.imageUrl && (
                                  <img 
                                    src={section.content.imageUrl} 
                                    alt={section.content.headline}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                  />
                                )}
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                  {section.content.headline}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                  {section.content.text}
                                </p>
                                {section.content.linkText && (
                                  <button className="bg-[#FF389A] text-white px-6 py-2 rounded-lg hover:bg-[#E6329C]">
                                    {section.content.linkText}
                                  </button>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm"
                          onClick={() => {
                            toast({ title: "Section saved", description: `${section.title} has been updated` });
                          }}
                          className="bg-[#FF389A] hover:bg-[#E6329C]"
                        >
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">Live Preview</h4>
          
          <Card className="bg-[#1A1A2E] border-gray-700">
            <CardContent className="p-0">
              <div className={`bg-white overflow-hidden ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                {sections
                  .filter(section => section.metadata.visible)
                  .sort((a, b) => a.metadata.order - b.metadata.order)
                  .map((section) => (
                    <div key={section.id} className="p-6 border-b border-gray-200 last:border-b-0">
                      {section.content.imageUrl && (
                        <img 
                          src={section.content.imageUrl} 
                          alt={section.content.headline}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      )}
                      {section.content.headline && (
                        <h2 className={`font-bold text-gray-900 mb-2 ${
                          section.metadata.headlineTag === 'h1' ? 'text-3xl' :
                          section.metadata.headlineTag === 'h2' ? 'text-2xl' :
                          section.metadata.headlineTag === 'h3' ? 'text-xl' : 'text-lg'
                        }`}>
                          {section.content.headline}
                        </h2>
                      )}
                      {section.content.text && (
                        <p className="text-gray-600 mb-4">{section.content.text}</p>
                      )}
                      {section.content.linkText && (
                        <button className="bg-[#FF389A] text-white px-4 py-2 rounded hover:bg-[#E6329C] text-sm">
                          {section.content.linkText}
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}