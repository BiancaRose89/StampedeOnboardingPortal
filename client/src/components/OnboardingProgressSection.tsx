import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlayCircle, CheckCircle2, Clock, Users, Palette, Shield, Settings, FileText, Video, Wifi, Star, Gift, Calendar, MessageSquare } from 'lucide-react';

interface OnboardingBlock {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl?: string;
  steps: Array<{
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    articles: Array<{
      title: string;
      url: string;
      type: 'guide' | 'tutorial' | 'reference';
    }>;
  }>;
}

const onboardingBlocks: OnboardingBlock[] = [
  {
    id: 'account-setup',
    title: 'Account Setup',
    description: 'Complete your basic account configuration and business profile setup',
    icon: <Users className="h-8 w-8 text-white" />,
    progress: 85,
    status: 'in-progress',
    estimatedTime: '10 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://example.com/account-setup',
    steps: [
      {
        id: 'business-profile',
        title: 'Business Profile',
        description: 'Set up your business information and contact details',
        articles: [
          { title: 'Profile Setup Guide', url: '#', type: 'guide' }
        ]
      }
    ]
  },
  {
    id: 'wifi-setup',
    title: 'WiFi',
    description: 'Configure guest WiFi with marketing capture and customer engagement',
    icon: <Wifi className="h-8 w-8 text-white" />,
    progress: 60,
    status: 'in-progress',
    estimatedTime: '15 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://example.com/wifi-setup',
    steps: [
      {
        id: 'guest-network',
        title: 'Guest Network Setup',
        description: 'Configure WiFi access for customers',
        articles: [
          { title: 'WiFi Marketing Best Practices', url: '#', type: 'guide' }
        ]
      }
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Set up automated marketing campaigns and customer engagement tools',
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    progress: 25,
    status: 'in-progress',
    estimatedTime: '30 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://example.com/marketing-setup',
    steps: [
      {
        id: 'email-campaigns',
        title: 'Email Campaigns',
        description: 'Create automated email marketing sequences',
        articles: [
          { title: 'Email Marketing Strategy', url: '#', type: 'guide' }
        ]
      }
    ]
  },
  {
    id: 'reviews',
    title: 'Reviews',
    description: 'Manage customer feedback and online reputation management',
    icon: <Star className="h-8 w-8 text-white" />,
    progress: 0,
    status: 'not-started',
    estimatedTime: '20 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://example.com/reviews-setup',
    steps: [
      {
        id: 'review-requests',
        title: 'Review Requests',
        description: 'Automate customer review requests',
        articles: [
          { title: 'Review Management Guide', url: '#', type: 'guide' }
        ]
      }
    ]
  },
  {
    id: 'loyalty',
    title: 'Loyalty',
    description: 'Create customer loyalty programs and reward systems',
    icon: <Gift className="h-8 w-8 text-white" />,
    progress: 0,
    status: 'not-started',
    estimatedTime: '25 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://example.com/loyalty-setup',
    steps: [
      {
        id: 'rewards-program',
        title: 'Rewards Program',
        description: 'Design your customer loyalty rewards',
        articles: [
          { title: 'Loyalty Program Best Practices', url: '#', type: 'guide' }
        ]
      }
    ]
  },
  {
    id: 'bookings',
    title: 'Bookings',
    description: 'Configure appointment scheduling and reservation management',
    icon: <Calendar className="h-8 w-8 text-white" />,
    progress: 100,
    status: 'completed',
    estimatedTime: '35 minutes',
    difficulty: 'Advanced',
    videoUrl: 'https://example.com/bookings-setup',
    steps: [
      {
        id: 'calendar-setup',
        title: 'Calendar Integration',
        description: 'Connect your booking system with calendars',
        articles: [
          { title: 'Booking System Guide', url: '#', type: 'guide' }
        ]
      }
    ]
  }
];

interface OnboardingModalProps {
  block: OnboardingBlock;
  currentStep: number;
  onStepChange: (step: number) => void;
}

function OnboardingModal({ block, currentStep, onStepChange }: OnboardingModalProps) {
  const totalSteps = block.steps.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {block.icon}
          {block.title}
        </DialogTitle>
        <DialogDescription>
          Step {currentStep + 1} of {totalSteps} • {block.estimatedTime} total
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Main video section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
          <PlayCircle className="h-16 w-16 mx-auto mb-2 text-blue-600" />
          <p className="text-sm text-muted-foreground">Main Tutorial Video</p>
          <p className="text-xs text-muted-foreground">{block.videoUrl}</p>
        </div>

        {/* Current step content */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">{block.steps[currentStep].title}</h3>
          <p className="text-muted-foreground mb-4">{block.steps[currentStep].description}</p>
          
          {/* Step video */}
          {block.steps[currentStep].videoUrl && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Video className="h-4 w-4" />
                <span>Step Tutorial Video</span>
              </div>
            </div>
          )}

          {/* Articles and guides */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Related Resources</h4>
            {block.steps[currentStep].articles.map((article, index) => (
              <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <FileText className="h-4 w-4" />
                <span>{article.title}</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {article.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
            disabled={currentStep === totalSteps - 1}
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default function OnboardingProgressSection() {
  const [currentModalStep, setCurrentModalStep] = useState(0);

  const getStatusIcon = (status: OnboardingBlock['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: OnboardingBlock['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800';
      case 'in-progress':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: OnboardingBlock['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Onboarding Progress</h2>
          <p className="text-muted-foreground">Complete these essential setup tasks to get the most out of your platform</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">
            {onboardingBlocks.filter(block => block.status === 'completed').length}/{onboardingBlocks.length}
          </div>
          <div className="text-sm text-muted-foreground">Tasks Complete</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {onboardingBlocks.map((block) => (
          <Dialog key={block.id} onOpenChange={() => setCurrentModalStep(0)}>
            <DialogTrigger asChild>
              <div className="interactive-card group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF2E88]/20 to-[#8B5CF6]/20 border border-[#FF2E88]/20">
                      {block.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-glow-pink transition-all duration-300">
                        {block.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        {getStatusIcon(block.status)}
                        <span className="text-sm text-muted-foreground font-medium">{block.estimatedTime}</span>
                        <Badge className={`${getDifficultyColor(block.difficulty)} shadow-sm`}>
                          {block.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">{block.description}</p>
                
                {block.status !== 'not-started' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-foreground">Progress</span>
                      <span className="text-glow-pink">{block.progress}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={block.progress} className="h-3 bg-muted/50" />
                      <div 
                        className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-[#FF2E88] to-[#8B5CF6] transition-all duration-500"
                        style={{ width: `${block.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#00D98B] animate-pulse" />
                    Ready to start
                  </div>
                  <div className="text-[#FF2E88] group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <OnboardingModal 
              block={block} 
              currentStep={currentModalStep}
              onStepChange={setCurrentModalStep}
            />
          </Dialog>
        ))}
      </div>
    </div>
  );
}