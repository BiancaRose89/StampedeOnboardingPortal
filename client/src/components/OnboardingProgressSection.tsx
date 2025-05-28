import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlayCircle, CheckCircle2, Clock, Users, Palette, Shield, Settings, FileText, Video, Wifi, Star, Gift, Calendar, MessageSquare, Target, Zap, Heart, ChevronRight, Play, BookOpen, Image } from 'lucide-react';

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
      type: 'guide' | 'tutorial' | 'reference' | 'template';
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
    description: 'Build powerful marketing campaigns that drive customer engagement and repeat business',
    icon: <Target className="h-8 w-8 text-white" />,
    progress: 25,
    status: 'in-progress',
    estimatedTime: '30 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://h.stampede.ai/marketing-readiness',
    steps: [
      {
        id: 'email-automation',
        title: 'Email Marketing Automation',
        description: 'Set up automated email sequences for welcome campaigns, birthday offers, and win-back campaigns',
        articles: [
          { title: 'Welcome Email Sequences', url: '#', type: 'guide' },
          { title: 'Birthday Campaign Setup', url: '#', type: 'tutorial' },
          { title: 'Win-Back Email Strategies', url: '#', type: 'guide' }
        ]
      },
      {
        id: 'social-media',
        title: 'Social Media Integration',
        description: 'Connect your social accounts and automate posting for consistent brand presence',
        articles: [
          { title: 'Social Media Calendar', url: '#', type: 'template' },
          { title: 'Instagram Integration Guide', url: '#', type: 'tutorial' }
        ]
      },
      {
        id: 'review-campaigns',
        title: 'Review Generation Campaigns',
        description: 'Automatically request reviews from satisfied customers to build your online reputation',
        articles: [
          { title: 'Review Request Templates', url: '#', type: 'template' },
          { title: 'Timing Your Review Requests', url: '#', type: 'guide' }
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
    description: 'Build customer loyalty programs that increase repeat visits and customer lifetime value',
    icon: <Heart className="h-8 w-8 text-white" />,
    progress: 0,
    status: 'not-started',
    estimatedTime: '25 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://h.stampede.ai/loyalty',
    steps: [
      {
        id: 'loyalty-program-design',
        title: 'Loyalty Program Design',
        description: 'Create point-based rewards system with tiers and special perks for VIP customers',
        articles: [
          { title: 'Points System Setup', url: '#', type: 'guide' },
          { title: 'VIP Tier Benefits', url: '#', type: 'template' },
          { title: 'Reward Redemption Rules', url: '#', type: 'guide' }
        ]
      },
      {
        id: 'referral-system',
        title: 'Referral Program',
        description: 'Reward customers for bringing friends and family to your business',
        articles: [
          { title: 'Referral Campaign Setup', url: '#', type: 'tutorial' },
          { title: 'Referral Tracking Methods', url: '#', type: 'guide' }
        ]
      },
      {
        id: 'engagement-campaigns',
        title: 'Engagement Campaigns',
        description: 'Create special challenges and bonus point opportunities to keep customers active',
        articles: [
          { title: 'Birthday Bonus Campaigns', url: '#', type: 'template' },
          { title: 'Seasonal Loyalty Events', url: '#', type: 'guide' }
        ]
      }
    ]
  },
  {
    id: 'bookings',
    title: 'Bookings',
    description: 'Set up table reservations and appointment scheduling for seamless customer booking experience',
    icon: <Calendar className="h-8 w-8 text-white" />,
    progress: 100,
    status: 'completed',
    estimatedTime: '35 minutes',
    difficulty: 'Advanced',
    videoUrl: 'https://h.stampede.ai/table-bookings-readiness',
    steps: [
      {
        id: 'table-management',
        title: 'Table Management System',
        description: 'Set up table layouts, capacity limits, and availability schedules for optimal seating',
        articles: [
          { title: 'Table Layout Configuration', url: '#', type: 'guide' },
          { title: 'Capacity Management Rules', url: '#', type: 'guide' },
          { title: 'Peak Hours Planning', url: '#', type: 'tutorial' }
        ]
      },
      {
        id: 'booking-automation',
        title: 'Booking Automation',
        description: 'Automate confirmations, reminders, and follow-up communications for reservations',
        articles: [
          { title: 'Confirmation Email Setup', url: '#', type: 'tutorial' },
          { title: 'Reminder Scheduling', url: '#', type: 'guide' }
        ]
      },
      {
        id: 'payment-deposits',
        title: 'Payment & Deposit Collection',
        description: 'Collect deposits or full payments at booking time to reduce no-shows',
        articles: [
          { title: 'Deposit Collection Setup', url: '#', type: 'guide' },
          { title: 'No-Show Prevention Strategies', url: '#', type: 'tutorial' }
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
    <div className="space-y-16">
      {/* Your Onboarding Progress Section */}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {onboardingBlocks.map((block) => (
          <Dialog key={block.id} onOpenChange={() => setCurrentModalStep(0)}>
            <DialogTrigger asChild>
              <div className="interactive-card group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm">
                      {block.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-white group-hover:text-glow-pink transition-all duration-300">
                        {block.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        {getStatusIcon(block.status)}
                        <span className="text-sm text-gray-300 font-medium">{block.estimatedTime}</span>
                        <Badge className={`${getDifficultyColor(block.difficulty)} shadow-sm font-bold`}>
                          {block.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">{block.description}</p>
                
                {block.status !== 'not-started' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-white">Progress</span>
                      <span className="text-glow-pink">{block.progress}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={block.progress} className="h-3 bg-[#0D0D24]/80" />
                      <div 
                        className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-[#FF389A] to-[#FF389A] transition-all duration-500 shadow-lg"
                        style={{ width: `${block.progress}%`, boxShadow: '0 0 10px rgba(255, 56, 154, 0.5)' }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#FF389A]/30">
                  <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                    <div className="w-3 h-3 rounded-full bg-[#FF389A] animate-pulse shadow-lg" style={{boxShadow: '0 0 8px rgba(255, 56, 154, 0.6)'}} />
                    Ready to launch
                  </div>
                  <div className="text-[#FF389A] group-hover:translate-x-2 transition-transform duration-300 text-lg font-bold">
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

      {/* Progress to Go Live Section */}
      <div className="mt-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-6">Progress Till Go Live!</h3>
          
          {/* Progress Gauge */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255, 56, 154, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#FF389A"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(onboardingBlocks.filter(block => block.status === 'completed').length / onboardingBlocks.length) * 283} 283`}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 56, 154, 0.6))'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">
                  {Math.round((onboardingBlocks.filter(block => block.status === 'completed').length / onboardingBlocks.length) * 100)}%
                </div>
                <div className="text-sm text-gray-300">Complete</div>
              </div>
            </div>
          </div>

          {/* Go Live Explanation */}
          <div className="bg-gradient-to-r from-[#FF389A]/20 to-[#FF389A]/10 rounded-xl p-6 border border-[#FF389A]/30">
            <h4 className="text-xl font-bold text-white mb-4">What does "Go Live" mean?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <h5 className="font-semibold text-white">Platform Ready</h5>
                <p className="text-gray-300 text-sm">All core features configured and tested</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h5 className="font-semibold text-white">Team Training</h5>
                <p className="text-gray-300 text-sm">Staff onboarded and comfortable with tools</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <h5 className="font-semibold text-white">Customer Launch</h5>
                <p className="text-gray-300 text-sm">Begin serving customers with new system</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Master Your Platform Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Master Your Platform</h2>
          <p className="text-gray-300">Comprehensive training and resources for every feature and capability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onboardingBlocks.map((block) => (
            <Card key={block.id} className="bg-[#16173F] border-[#FF389A]/20 hover:border-[#FF389A]/50 transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-[#FF389A] to-[#E6329C] rounded-xl shadow-lg">
                    {block.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white group-hover:text-[#FF389A] transition-colors">
                      {block.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{block.description}</p>
                <div className="space-y-2">
                  {block.steps.slice(0, 2).map((step) => (
                    <div key={step.id} className="flex items-center justify-between p-2 bg-[#16173F] rounded-lg">
                      <span className="text-sm text-gray-300">{step.title}</span>
                      <ChevronRight className="h-4 w-4 text-[#FF389A]" />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-[#FF389A] hover:bg-[#E6329C] text-white">
                  Explore Features
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Go Readiness Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">What does "Go Live" mean?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              number: "1",
              title: "Platform Ready",
              description: "All core features configured and tested",
              status: "completed"
            },
            {
              number: "2", 
              title: "Team Training",
              description: "Staff onboarded and comfortable with tools",
              status: "current"
            },
            {
              number: "3",
              title: "Customer Launch", 
              description: "Begin serving customers with new system",
              status: "pending"
            }
          ].map((block) => (
            <Dialog key={block.number}>
              <DialogTrigger asChild>
                <Card className={`
                  cursor-pointer transition-all duration-300 group border-2
                  ${block.status === 'completed' 
                    ? 'bg-[#FF389A]/10 border-[#FF389A] shadow-lg shadow-[#FF389A]/20' 
                    : block.status === 'current'
                    ? 'bg-white/5 border-white/30 shadow-lg shadow-white/10'
                    : 'bg-[#16173F] border-[#FF389A]/20 hover:border-[#FF389A]/50'
                  }
                `}>
                  <CardContent className="p-6 text-center">
                    <div className={`
                      w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold
                      ${block.status === 'completed' 
                        ? 'bg-[#FF389A] text-white' 
                        : block.status === 'current'
                        ? 'bg-white text-[#0D0D24]'
                        : 'bg-gray-600 text-white'
                      }
                    `}>
                      {block.status === 'completed' ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        block.number
                      )}
                    </div>
                    <h3 className={`
                      text-lg font-bold mb-2 group-hover:text-[#FF389A] transition-colors
                      ${block.status === 'completed' 
                        ? 'text-[#FF389A]' 
                        : block.status === 'current'
                        ? 'text-white'
                        : 'text-white'
                      }
                    `}>
                      {block.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {block.description}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="bg-[#16173F] border-[#FF389A]/30 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#FF389A]">{block.title}</DialogTitle>
                  <DialogDescription className="text-gray-300">
                    {block.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#16173F] p-4 rounded-lg border border-[#FF389A]/20">
                      <Play className="h-6 w-6 text-[#FF389A] mb-2" />
                      <h5 className="font-semibold text-white mb-1">Video Guide</h5>
                      <p className="text-gray-400 text-sm">Step-by-step tutorial</p>
                    </div>
                    <div className="bg-[#16173F] p-4 rounded-lg border border-[#FF389A]/20">
                      <BookOpen className="h-6 w-6 text-[#FF389A] mb-2" />
                      <h5 className="font-semibold text-white mb-1">Articles</h5>
                      <p className="text-gray-400 text-sm">Detailed instructions</p>
                    </div>
                    <div className="bg-[#16173F] p-4 rounded-lg border border-[#FF389A]/20">
                      <Image className="h-6 w-6 text-[#FF389A] mb-2" />
                      <h5 className="font-semibold text-white mb-1">Visual Aid</h5>
                      <p className="text-gray-400 text-sm">Screenshots & diagrams</p>
                    </div>
                  </div>
                  <Button className="w-full bg-[#FF389A] hover:bg-[#E6329C] text-white">
                    Start This Step
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}