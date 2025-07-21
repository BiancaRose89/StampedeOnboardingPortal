import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target,
  CheckCircle,
  Clock,
  Users,
  Mail,
  Settings,
  BarChart3,
  ExternalLink,
  ArrowLeft,
  Filter,
  Send,
  TestTube,
  Zap
} from 'lucide-react';

interface MarketingTask {
  id: string;
  title: string;
  description: string;
  category: 'customer-segments' | 'email-campaigns' | 'test-campaign' | 'automation' | 'final-checks';
  completed: boolean;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
  image?: string;
}

interface MarketingTaskListProps {
  venueName: string;
  onBack: () => void;
}

export default function MarketingTaskList({ venueName, onBack }: MarketingTaskListProps) {
  const [tasks, setTasks] = useState<MarketingTask[]>([
    // Step 1: Create Customer Segments
    {
      id: 'navigate-segments',
      title: 'Go to Marketing > Audiences > Segments',
      description: 'Access the customer segmentation interface in your dashboard',
      category: 'customer-segments',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/image%2010.png'
    },
    {
      id: 'click-create-segment',
      title: 'Click Create New Segment',
      description: 'Start the process of building your first customer audience',
      category: 'customer-segments',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high'
    },
    {
      id: 'create-newsletter-segment',
      title: 'Create Newsletter Subscribers segment',
      description: 'Filter by tag: newsletter to target email subscribers',
      category: 'customer-segments',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'create-frequent-visitors-segment',
      title: 'Create Frequent Visitors segment',
      description: 'Filter by visit count or loyalty tier to target loyal customers',
      category: 'customer-segments',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'create-wifi-signups-segment',
      title: 'Create WiFi Signups This Month segment',
      description: 'Filter by signup date or campaign source for recent acquisitions',
      category: 'customer-segments',
      completed: false,
      estimatedTime: '5 min',
      priority: 'medium'
    },
    {
      id: 'name-segments-clearly',
      title: 'Clearly name each segment',
      description: 'Use descriptive names that make segment purpose obvious',
      category: 'customer-segments',
      completed: false,
      estimatedTime: '3 min',
      priority: 'medium'
    },
    {
      id: 'check-contact-counts',
      title: 'Check contact counts to confirm data is pulling correctly',
      description: 'Verify that segments contain expected number of contacts',
      category: 'customer-segments',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },

    // Step 2: Build Email Campaigns
    {
      id: 'navigate-campaigns',
      title: 'Go to Marketing > Campaigns > Create New Campaign',
      description: 'Access the campaign creation interface',
      category: 'email-campaigns',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/image%2011.png'
    },
    {
      id: 'choose-campaign-type',
      title: 'Choose your campaign type (standard or promotional)',
      description: 'Select the appropriate campaign format for your message',
      category: 'email-campaigns',
      completed: false,
      estimatedTime: '2 min',
      priority: 'high'
    },
    {
      id: 'add-subject-preview',
      title: 'Add subject line, preview text, and branded email content',
      description: 'Create compelling email headers and branded content',
      category: 'email-campaigns',
      completed: false,
      estimatedTime: '15 min',
      priority: 'high'
    },
    {
      id: 'include-cta-buttons',
      title: 'Include call-to-action buttons, links, and images',
      description: 'Add interactive elements to drive customer engagement',
      category: 'email-campaigns',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },
    {
      id: 'choose-target-segment',
      title: 'Choose your target segment and send schedule',
      description: 'Select audience and timing for your campaign delivery',
      category: 'email-campaigns',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'review-campaign',
      title: 'Review for typos, mobile responsiveness, and spam triggers',
      description: 'Complete quality check before campaign deployment',
      category: 'email-campaigns',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },

    // Step 3: Send a Test Campaign
    {
      id: 'duplicate-campaign',
      title: 'Duplicate a campaign and create a small test segment',
      description: 'Create test version with your email and team members',
      category: 'test-campaign',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/image%2013.png'
    },
    {
      id: 'send-test-email',
      title: 'Send test email to team',
      description: 'Deploy test campaign to verify functionality',
      category: 'test-campaign',
      completed: false,
      estimatedTime: '2 min',
      priority: 'high'
    },
    {
      id: 'verify-inbox-delivery',
      title: 'Verify it lands in inbox (not spam)',
      description: 'Check that emails are properly delivered and not filtered',
      category: 'test-campaign',
      completed: false,
      estimatedTime: '3 min',
      priority: 'high'
    },
    {
      id: 'check-branding-formatting',
      title: 'Verify branding and formatting look correct',
      description: 'Ensure visual elements display properly across devices',
      category: 'test-campaign',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'test-all-links',
      title: 'Test that all links work',
      description: 'Click through every link to verify correct destinations',
      category: 'test-campaign',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'verify-reporting',
      title: 'Verify reporting shows opens and clicks',
      description: 'Confirm analytics are tracking email engagement metrics',
      category: 'test-campaign',
      completed: false,
      estimatedTime: '3 min',
      priority: 'medium'
    },

    // Step 4: Set Up One Automated Campaign
    {
      id: 'navigate-automation',
      title: 'Go to Marketing > Automation > Create Automation',
      description: 'Access the marketing automation interface',
      category: 'automation',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/image%2014.png'
    },
    {
      id: 'choose-automation-trigger',
      title: 'Choose a trigger (joins WiFi list, birthday, hasn\'t visited)',
      description: 'Select customer behavior that will initiate the automation',
      category: 'automation',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'build-automation-content',
      title: 'Build the email content and set a delay',
      description: 'Create automated email content and timing parameters',
      category: 'automation',
      completed: false,
      estimatedTime: '15 min',
      priority: 'high'
    },
    {
      id: 'apply-automation-segment',
      title: 'Apply automation to a specific segment',
      description: 'Target the automation to relevant customer groups',
      category: 'automation',
      completed: false,
      estimatedTime: '3 min',
      priority: 'high'
    },
    {
      id: 'activate-test-workflow',
      title: 'Activate and test the workflow',
      description: 'Enable automation and verify it functions correctly',
      category: 'automation',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },

    // Final Marketing Checks
    {
      id: 'enable-tracking',
      title: 'Tracking is enabled for opens and clicks',
      description: 'Confirm analytics tracking is properly configured',
      category: 'final-checks',
      completed: false,
      estimatedTime: '3 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/image%2015.png'
    },
    {
      id: 'verify-link-destinations',
      title: 'All links lead to the correct destination',
      description: 'Final verification that all links are properly configured',
      category: 'final-checks',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'monitor-reply-emails',
      title: 'Reply-to emails are monitored by your team',
      description: 'Ensure customer responses will be seen and handled',
      category: 'final-checks',
      completed: false,
      estimatedTime: '2 min',
      priority: 'medium'
    },
    {
      id: 'review-schedule-campaigns',
      title: 'Campaigns are reviewed and scheduled properly',
      description: 'Final check of all campaign timing and deployment',
      category: 'final-checks',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'verify-email-domain',
      title: 'Email domain is verified and campaigns are branded',
      description: 'Confirm domain authentication and brand consistency',
      category: 'final-checks',
      completed: false,
      estimatedTime: '3 min',
      priority: 'high'
    },
    {
      id: 'clean-segments',
      title: 'Segments are set up and clean',
      description: 'Final review of all customer segments for accuracy',
      category: 'final-checks',
      completed: false,
      estimatedTime: '5 min',
      priority: 'medium'
    }
  ]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'customer-segments': return <Users className="h-4 w-4" />;
      case 'email-campaigns': return <Mail className="h-4 w-4" />;
      case 'test-campaign': return <TestTube className="h-4 w-4" />;
      case 'automation': return <Zap className="h-4 w-4" />;
      case 'final-checks': return <CheckCircle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'customer-segments': return 'Step 1: Create Customer Segments';
      case 'email-campaigns': return 'Step 2: Build Email Campaigns';
      case 'test-campaign': return 'Step 3: Send a Test Campaign';
      case 'automation': return 'Step 4: Set Up One Automated Campaign';
      case 'final-checks': return 'Final Marketing Checks';
      default: return category;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const categories = ['customer-segments', 'email-campaigns', 'test-campaign', 'automation', 'final-checks'];

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
          Back to {venueName} Tasks
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Marketing Go-Live Readiness</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Here's everything you need to action before going live with Stampede Marketing. This checklist ensures your campaigns are targeted, tested, and ready to engage your customers.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-black border-[#FF389A]/20">
        <CardHeader>
          <CardTitle className="text-white">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Tasks Completed</span>
              <span className="text-white">{completedTasks}/{totalTasks}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-gray-400 text-center">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Task Categories */}
      {categories.map((category) => {
        const categoryTasks = tasks.filter(task => task.category === category);
        const categoryCompleted = categoryTasks.filter(task => task.completed).length;
        const categoryProgress = (categoryCompleted / categoryTasks.length) * 100;

        return (
          <Card key={category} className="bg-black border-[#FF389A]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(category)}
                  <CardTitle className="text-white">{getCategoryTitle(category)}</CardTitle>
                </div>
                <Badge variant="outline" className="border-[#FF389A] text-[#FF389A]">
                  {categoryCompleted}/{categoryTasks.length}
                </Badge>
              </div>
              <Progress value={categoryProgress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      task.completed 
                        ? 'border-green-500/30 bg-green-500/10' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-medium ${task.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                              {task.title}
                            </h4>
                            <p className="text-gray-300 text-sm mt-1">{task.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge className={getPriorityColor(task.priority)} variant="secondary">
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.estimatedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Ready to Launch Message */}
      {progressPercentage === 100 && (
        <Card className="bg-gradient-to-r from-green-900/50 to-[#FF389A]/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              You're Ready to Launch Marketing!
            </h3>
            <p className="text-gray-300 mb-4">
              Email domain is verified and campaigns are branded. Segments are set up and clean. Campaigns are tested, scheduled, or automated. Your marketing system is live and ready to drive engagement!
            </p>
            <Button 
              variant="outline" 
              className="border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
              onClick={() => window.open('https://help.stampede.ai/hc/en-gb/categories/25679085633298-Marketing', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Check Marketing Knowledge Base for More Help
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}