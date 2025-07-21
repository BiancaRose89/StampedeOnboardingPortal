import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Star,
  CheckCircle,
  Clock,
  Users,
  Gift,
  Settings,
  BarChart3,
  ExternalLink,
  ArrowLeft,
  Smartphone,
  Mail,
  QrCode,
  Target
} from 'lucide-react';

interface LoyaltyTask {
  id: string;
  title: string;
  description: string;
  category: 'access-setup' | 'rewards-creation' | 'automations' | 'customer-signup' | 'monitoring' | 'final-checks';
  completed: boolean;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
  image?: string;
}

interface LoyaltyTaskListProps {
  venueName: string;
  onBack: () => void;
}

export default function LoyaltyTaskList({ venueName, onBack }: LoyaltyTaskListProps) {
  const [tasks, setTasks] = useState<LoyaltyTask[]>([
    // Step 1: Access your Loyalty Scheme
    {
      id: 'access-loyalty-dashboard',
      title: 'Navigate to Loyalty in your Stampede dashboard',
      description: 'Access the main loyalty interface from your dashboard menu',
      category: 'access-setup',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Screenshot%202025-04-21%20at%2011.52.57.png'
    },
    {
      id: 'click-loyalty-card',
      title: 'Click on your Loyalty Card to access pre-configured scheme',
      description: 'Open your loyalty card configuration to view setup options',
      category: 'access-setup',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high'
    },
    {
      id: 'review-signup-form',
      title: 'Review the pre-built Sign-Up Form',
      description: 'Examine the customer registration form and customize if needed',
      category: 'access-setup',
      completed: false,
      estimatedTime: '3 min',
      priority: 'medium'
    },
    {
      id: 'explore-dashboard-tabs',
      title: 'Familiarise yourself with Automations, Rewards, and Interactions tabs',
      description: 'Navigate through all main sections to understand the interface',
      category: 'access-setup',
      completed: false,
      estimatedTime: '5 min',
      priority: 'medium'
    },
    {
      id: 'understand-setup-flow',
      title: 'Understand the complete setup flow process',
      description: 'Learn how points are awarded, rewards work, and customer interactions',
      category: 'access-setup',
      completed: false,
      estimatedTime: '10 min',
      priority: 'medium'
    },

    // Step 2: Create Your Rewards
    {
      id: 'design-appealing-rewards',
      title: 'Design appealing rewards with appropriate point values',
      description: 'Plan reward structure ensuring they are achievable and valuable',
      category: 'rewards-creation',
      completed: false,
      estimatedTime: '15 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Screenshot%202025-04-21%20at%2011.53.41.png'
    },
    {
      id: 'determine-point-requirements',
      title: 'Determine the number of points required for each reward',
      description: 'Set point thresholds that encourage engagement but remain attainable',
      category: 'rewards-creation',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },
    {
      id: 'create-reward-examples',
      title: 'Create rewards (free items, discounts, exclusive access)',
      description: 'Add specific rewards like free coffee, 10% discount, VIP events',
      category: 'rewards-creation',
      completed: false,
      estimatedTime: '20 min',
      priority: 'high'
    },
    {
      id: 'navigate-create-reward',
      title: 'Go to Loyalty > Rewards > Create New Reward',
      description: 'Access the reward creation interface in the dashboard',
      category: 'rewards-creation',
      completed: false,
      estimatedTime: '2 min',
      priority: 'high'
    },
    {
      id: 'input-reward-details',
      title: 'Input reward details including name, description, and point cost',
      description: 'Complete all required fields for each reward offering',
      category: 'rewards-creation',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },
    {
      id: 'upload-reward-images',
      title: 'Upload relevant images and set availability parameters',
      description: 'Add attractive visuals and configure when rewards are available',
      category: 'rewards-creation',
      completed: false,
      estimatedTime: '15 min',
      priority: 'medium'
    },

    // Step 3: Configure Loyalty Automations
    {
      id: 'navigate-automations',
      title: 'Navigate to Loyalty > Automations > Create Automation',
      description: 'Access the automation setup interface',
      category: 'automations',
      completed: false,
      estimatedTime: '2 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Screenshot%202025-04-21%20at%2012.01.23.png'
    },
    {
      id: 'set-trigger-actions',
      title: 'Set triggers such as Wi-Fi logins, bookings, or purchases',
      description: 'Configure what customer actions will award loyalty points',
      category: 'automations',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },
    {
      id: 'define-point-awards',
      title: 'Define the number of points awarded per action',
      description: 'Set point values for each type of customer interaction',
      category: 'automations',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'test-automations',
      title: 'Test automations to ensure points are correctly awarded',
      description: 'Verify that trigger actions properly award the specified points',
      category: 'automations',
      completed: false,
      estimatedTime: '15 min',
      priority: 'high'
    },
    {
      id: 'monitor-interactions-tab',
      title: 'Monitor the Interactions tab to verify automation performance',
      description: 'Check that automations are working correctly and tracking properly',
      category: 'automations',
      completed: false,
      estimatedTime: '5 min',
      priority: 'medium'
    },

    // Step 4: Enable Customer Sign-Ups
    {
      id: 'share-signup-link',
      title: 'Share loyalty sign-up link via email, SMS, and social media',
      description: 'Distribute the registration link across all marketing channels',
      category: 'customer-signup',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Screenshot%202025-04-21%20at%2011.57.53.png'
    },
    {
      id: 'display-qr-codes',
      title: 'Display QR codes in your venue for easy access',
      description: 'Print and place QR codes at tables, counters, and high-traffic areas',
      category: 'customer-signup',
      completed: false,
      estimatedTime: '15 min',
      priority: 'high'
    },
    {
      id: 'train-staff-promotion',
      title: 'Train staff to inform customers about the loyalty program',
      description: 'Ensure all team members can explain and promote the loyalty scheme',
      category: 'customer-signup',
      completed: false,
      estimatedTime: '30 min',
      priority: 'high'
    },
    {
      id: 'enable-digital-wallet',
      title: 'Enable digital wallet integration (Apple/Google Wallet)',
      description: 'Configure customers to add loyalty cards to their mobile wallets',
      category: 'customer-signup',
      completed: false,
      estimatedTime: '10 min',
      priority: 'medium'
    },
    {
      id: 'test-signup-process',
      title: 'Test the complete customer sign-up process',
      description: 'Go through registration flow to ensure it works smoothly',
      category: 'customer-signup',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },

    // Step 5: Monitor and Optimize Engagement
    {
      id: 'track-performance-metrics',
      title: 'Use Loyalty Dashboard to monitor sign-ups, points, and redemptions',
      description: 'Review analytics to understand program performance',
      category: 'monitoring',
      completed: false,
      estimatedTime: '10 min',
      priority: 'medium',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Screenshot%202025-04-21%20at%2011.54.01.png'
    },
    {
      id: 'identify-popular-rewards',
      title: 'Identify popular rewards and customer engagement trends',
      description: 'Analyze which rewards are most redeemed and engagement patterns',
      category: 'monitoring',
      completed: false,
      estimatedTime: '15 min',
      priority: 'medium'
    },
    {
      id: 'adjust-strategies',
      title: 'Adjust rewards and automations based on data insights',
      description: 'Optimize program based on customer behavior and performance data',
      category: 'monitoring',
      completed: false,
      estimatedTime: '20 min',
      priority: 'low'
    },
    {
      id: 'plan-seasonal-promotions',
      title: 'Consider seasonal promotions or limited-time offers',
      description: 'Develop special campaigns to boost participation during key periods',
      category: 'monitoring',
      completed: false,
      estimatedTime: '15 min',
      priority: 'low',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Screenshot%202025-04-21%20at%2012.00.00.png'
    },

    // Final Checks Before Launch
    {
      id: 'verify-rewards-setup',
      title: 'All rewards are correctly set up with clear descriptions and images',
      description: 'Final review of all reward configurations and visual assets',
      category: 'final-checks',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },
    {
      id: 'confirm-automations-tested',
      title: 'Automations are tested and functioning as intended',
      description: 'Verify all automated point awards and triggers work correctly',
      category: 'final-checks',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'check-signup-processes',
      title: 'Sign-up processes are seamless across all customer touchpoints',
      description: 'Test registration flow from all entry points (QR, web, app)',
      category: 'final-checks',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high'
    },
    {
      id: 'staff-training-complete',
      title: 'Staff are trained to promote and assist with the loyalty program',
      description: 'Ensure all team members can help customers with the program',
      category: 'final-checks',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high'
    },
    {
      id: 'prepare-marketing-materials',
      title: 'Marketing materials (emails, social posts) are prepared for launch',
      description: 'Create and schedule launch announcements across all channels',
      category: 'final-checks',
      completed: false,
      estimatedTime: '20 min',
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
      case 'access-setup': return <Settings className="h-4 w-4" />;
      case 'rewards-creation': return <Gift className="h-4 w-4" />;
      case 'automations': return <Target className="h-4 w-4" />;
      case 'customer-signup': return <Users className="h-4 w-4" />;
      case 'monitoring': return <BarChart3 className="h-4 w-4" />;
      case 'final-checks': return <CheckCircle className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'access-setup': return 'Step 1: Access Your Loyalty Scheme';
      case 'rewards-creation': return 'Step 2: Create Your Rewards';
      case 'automations': return 'Step 3: Configure Loyalty Automations';
      case 'customer-signup': return 'Step 4: Enable Customer Sign-Ups';
      case 'monitoring': return 'Step 5: Monitor and Optimize Engagement';
      case 'final-checks': return 'Final Checks Before Launch';
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

  const categories = ['access-setup', 'rewards-creation', 'automations', 'customer-signup', 'monitoring', 'final-checks'];

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
        <h1 className="text-3xl font-bold text-white">Loyalty Go-Live Readiness</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Ensure your Stampede Loyalty program is fully set up and ready to reward your customers. This guide walks you through the essential steps to launch a successful loyalty scheme.
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
              You're Ready to Launch Your Loyalty Program!
            </h3>
            <p className="text-gray-300 mb-4">
              With your Stampede Loyalty program configured and tested, you're set to enhance customer retention and drive repeat business.
            </p>
            <Button 
              variant="outline" 
              className="border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
              onClick={() => window.open('https://help.stampede.ai/hc/en-gb/categories/25679132684434-Loyalty', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Check Loyalty Knowledge Base for More Help
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}