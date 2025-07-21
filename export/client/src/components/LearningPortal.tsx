import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  Search,
  Clock,
  Play,
  CheckCircle,
  Star,
  Download,
  ExternalLink
} from 'lucide-react';

interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'template';
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  rating: number;
  tags: string[];
}

interface LearningPortalProps {
  onBack: () => void;
  topic: string;
}

export default function LearningPortal({ onBack, topic }: LearningPortalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<LearningResource | null>(null);

  // Sample learning resources - in real app, these would come from Zendesk/external APIs
  const learningResources: LearningResource[] = [
    {
      id: '1',
      title: 'Getting Started with Marketing Campaigns',
      description: 'Learn the fundamentals of creating effective marketing campaigns for your venue.',
      type: 'guide',
      category: 'basics',
      duration: '15 min',
      difficulty: 'Beginner',
      completed: false,
      rating: 4.8,
      tags: ['campaigns', 'basics', 'setup']
    },
    {
      id: '2',
      title: 'Advanced Email Marketing Strategies',
      description: 'Master advanced email marketing techniques to boost customer engagement.',
      type: 'video',
      category: 'advanced',
      duration: '25 min',
      difficulty: 'Advanced',
      completed: true,
      rating: 4.9,
      tags: ['email', 'advanced', 'engagement']
    },
    {
      id: '3',
      title: 'Social Media Integration Guide',
      description: 'Step-by-step guide to integrate your social media channels.',
      type: 'article',
      category: 'integration',
      duration: '10 min',
      difficulty: 'Intermediate',
      completed: false,
      rating: 4.7,
      tags: ['social-media', 'integration', 'channels']
    },
    {
      id: '4',
      title: 'Marketing Analytics Dashboard Template',
      description: 'Ready-to-use template for tracking your marketing performance.',
      type: 'template',
      category: 'analytics',
      duration: '5 min',
      difficulty: 'Beginner',
      completed: false,
      rating: 4.6,
      tags: ['analytics', 'template', 'tracking']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', count: learningResources.length },
    { id: 'basics', name: 'Getting Started', count: learningResources.filter(r => r.category === 'basics').length },
    { id: 'advanced', name: 'Advanced', count: learningResources.filter(r => r.category === 'advanced').length },
    { id: 'integration', name: 'Integration', count: learningResources.filter(r => r.category === 'integration').length },
    { id: 'analytics', name: 'Analytics', count: learningResources.filter(r => r.category === 'analytics').length }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'template': return <Download className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const completedCount = learningResources.filter(r => r.completed).length;
  const progressPercentage = (completedCount / learningResources.length) * 100;

  if (selectedResource) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setSelectedResource(null)}
            className="text-[#FF389A] hover:bg-[#FF389A]/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </div>

        <Card className="bg-black border-[#FF389A]/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(selectedResource.type)}
                  <Badge variant="outline" className="border-[#FF389A]/30 text-[#FF389A]">
                    {selectedResource.type}
                  </Badge>
                  <Badge className={getDifficultyColor(selectedResource.difficulty)}>
                    {selectedResource.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-white text-2xl">{selectedResource.title}</CardTitle>
                <p className="text-gray-300">{selectedResource.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedResource.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {selectedResource.rating}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-[#FF389A] hover:bg-[#E6329C] text-white">
                <Play className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
              <div className="text-center text-gray-400">
                <p>This content would be loaded from your Zendesk knowledge base or external learning platform.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#FF389A] hover:bg-[#FF389A]/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Master Platform
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Learning Portal</h1>
        <p className="text-lg text-gray-300">Master {topic} with our comprehensive learning resources</p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-black border-[#FF389A]/20">
        <CardHeader>
          <CardTitle className="text-white">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Completed</span>
              <span className="text-white">{completedCount}/{learningResources.length} resources</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1">
          <Card className="bg-black border-[#FF389A]/20">
            <CardHeader>
              <CardTitle className="text-white">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className={`w-full justify-between ${
                    selectedCategory === category.id 
                      ? "bg-[#FF389A] hover:bg-[#E6329C] text-white" 
                      : "text-gray-300 hover:bg-[#FF389A]/10 hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black border-[#FF389A]/30 text-white focus:border-[#FF389A]"
            />
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <Card
                key={resource.id}
                className="bg-black border-[#FF389A]/20 hover:border-[#FF389A]/40 transition-colors cursor-pointer"
                onClick={() => setSelectedResource(resource)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="outline" className="border-[#FF389A]/30 text-[#FF389A]">
                        {resource.type}
                      </Badge>
                    </div>
                    {resource.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <CardTitle className="text-white text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(resource.difficulty)} variant="secondary">
                          {resource.difficulty}
                        </Badge>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {resource.rating}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No resources found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}