import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  Download, 
  MessageCircle, 
  FileText, 
  Video, 
  HelpCircle,
  Star,
  Clock,
  Filter,
  Tag,
  Users,
  CheckCircle2
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'checklist' | 'template' | 'guide' | 'video' | 'pdf';
  category: 'setup' | 'advanced' | 'troubleshooting' | 'best-practices';
  downloadUrl?: string;
  readTime?: string;
  popularity: number;
  isNew?: boolean;
}

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  votes: number;
  views: number;
  isAnswered: boolean;
  tags: string[];
  askedBy: string;
  askedDate: string;
}

const topQuestions: Question[] = [
  {
    id: '1',
    question: 'How do I integrate with external payment processors?',
    answer: 'To integrate with external payment processors, navigate to Settings > Payments and select your preferred processor. Follow the step-by-step setup wizard...',
    category: 'Payments',
    votes: 45,
    views: 1250,
    isAnswered: true,
    tags: ['payments', 'integration', 'setup'],
    askedBy: 'Sarah Chen',
    askedDate: '2 days ago'
  },
  {
    id: '2',
    question: 'Best practices for customer data security?',
    answer: 'Customer data security involves multiple layers including encryption, access controls, and regular audits...',
    category: 'Security',
    votes: 38,
    views: 890,
    isAnswered: true,
    tags: ['security', 'privacy', 'compliance'],
    askedBy: 'Mike Rodriguez',
    askedDate: '3 days ago'
  },
  {
    id: '3',
    question: 'How to set up automated email campaigns?',
    answer: 'Automated email campaigns can be configured in the Marketing section. Start by creating email templates...',
    category: 'Marketing',
    votes: 32,
    views: 675,
    isAnswered: true,
    tags: ['email', 'automation', 'marketing'],
    askedBy: 'Lisa Park',
    askedDate: '1 week ago'
  },
  {
    id: '4',
    question: 'Calendar sync issues with Google Calendar',
    answer: '',
    category: 'Integrations',
    votes: 28,
    views: 540,
    isAnswered: false,
    tags: ['calendar', 'google', 'sync'],
    askedBy: 'David Kim',
    askedDate: '5 days ago'
  },
  {
    id: '5',
    question: 'How to customize booking confirmation emails?',
    answer: 'Booking confirmation emails can be customized in Communications > Email Templates. You can modify the layout, content, and branding...',
    category: 'Communications',
    votes: 24,
    views: 420,
    isAnswered: true,
    tags: ['bookings', 'email', 'customization'],
    askedBy: 'Jennifer Wu',
    askedDate: '1 week ago'
  }
];

const resources: Resource[] = [
  {
    id: '1',
    title: 'Complete Setup Checklist',
    description: 'Step-by-step checklist to ensure your platform is properly configured',
    type: 'checklist',
    category: 'setup',
    downloadUrl: '/downloads/setup-checklist.pdf',
    readTime: '10 min',
    popularity: 95,
    isNew: true
  },
  {
    id: '2',
    title: 'Customer Onboarding Template',
    description: 'Ready-to-use template for smooth customer onboarding process',
    type: 'template',
    category: 'best-practices',
    downloadUrl: '/downloads/onboarding-template.docx',
    readTime: '5 min',
    popularity: 87
  },
  {
    id: '3',
    title: 'Advanced API Integration Guide',
    description: 'Comprehensive guide for integrating with third-party APIs',
    type: 'guide',
    category: 'advanced',
    downloadUrl: '/downloads/api-integration-guide.pdf',
    readTime: '25 min',
    popularity: 78
  },
  {
    id: '4',
    title: 'Security Best Practices Video Series',
    description: '5-part video series covering platform security essentials',
    type: 'video',
    category: 'best-practices',
    readTime: '45 min',
    popularity: 92,
    isNew: true
  },
  {
    id: '5',
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to the most frequently encountered problems',
    type: 'guide',
    category: 'troubleshooting',
    downloadUrl: '/downloads/troubleshooting-guide.pdf',
    readTime: '15 min',
    popularity: 84
  },
  {
    id: '6',
    title: 'Email Marketing Templates Pack',
    description: 'Collection of proven email templates for different scenarios',
    type: 'template',
    category: 'best-practices',
    downloadUrl: '/downloads/email-templates.zip',
    readTime: '8 min',
    popularity: 89
  }
];

const categories = ['All', 'setup', 'advanced', 'troubleshooting', 'best-practices'];
const resourceTypes = ['All', 'checklist', 'template', 'guide', 'video', 'pdf'];

export default function KnowledgeBaseSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'checklist':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'template':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'guide':
        return <FileText className="h-5 w-5 text-purple-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'pdf':
        return <Download className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: Resource['category']) => {
    switch (category) {
      case 'setup':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'troubleshooting':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'best-practices':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Knowledge Base & Resources</h2>
        <p className="text-muted-foreground">
          Find answers, download resources, and connect with the community
        </p>
      </div>

      {/* Smart Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Smart Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search guides, templates, or ask a question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All' ? 'All Categories' : category.replace('-', ' ')}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Type:</span>
            </div>
            {resourceTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type === 'All' ? 'All Types' : type}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending Questions
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Resource Hub
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Community Q&A
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top 5 Questions This Week
              </CardTitle>
              <CardDescription>
                Most viewed and discussed topics in the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <Badge className={question.isAnswered ? 'bg-green-100 text-green-800 dark:bg-green-900' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900'}>
                          {question.isAnswered ? 'Answered' : 'Pending'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{question.category}</span>
                      </div>
                      <h4 className="font-medium">{question.question}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {question.votes} votes
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {question.views} views
                        </div>
                        <span>by {question.askedBy} • {question.askedDate}</span>
                      </div>
                      <div className="flex gap-1">
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {question.isAnswered && (
                    <div className="bg-muted/50 rounded p-3">
                      <p className="text-sm">{question.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="relative">
                {resource.isNew && (
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 dark:bg-green-900">
                    New
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-start gap-3">
                    {getResourceIcon(resource.type)}
                    <div className="space-y-1">
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(resource.category)}>
                          {resource.category.replace('-', ' ')}
                        </Badge>
                        {resource.readTime && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {resource.readTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{resource.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{resource.popularity}% helpful</span>
                    </div>
                    <Button size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      {resource.type === 'video' ? 'Watch' : 'Download'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Community Support
              </CardTitle>
              <CardDescription>
                Get help from other users and share your knowledge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Ask a Question
                </Button>
                <Button variant="outline">Browse All Questions</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Active Discussions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-sm text-muted-foreground">ongoing conversations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Expert Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">community experts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Questions Answered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">this month</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}