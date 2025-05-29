import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlayCircle, CheckCircle2, Clock, Users, Palette, Shield, Settings, FileText, Video, Wifi, Star, Gift, Calendar, MessageSquare, Target, Zap, Heart, ChevronRight, Play, BookOpen, Image, Info, ArrowRight, X, Lock } from 'lucide-react';
import mobileMockupsPath from "@assets/image_1748461158920.png";
import { useAuth } from '@/components/AuthProvider';

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
  const [showExamplesModal, setShowExamplesModal] = useState(false);
  const { firebaseUser, dbUser } = useAuth();
  
  // Check if user is authenticated and has access
  const isAuthenticated = !!firebaseUser && !!dbUser;
  const isLocked = !isAuthenticated;

  // Locked Overlay Component
  const LockedOverlay = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-[#0D0D24]/75 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 animate-in fade-in duration-500">
        <div className="text-center space-y-4 bg-[#0D0D24]/90 border border-[#FF389A]/30 rounded-2xl p-8 max-w-md mx-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-[#FF389A]/20 border border-[#FF389A]/30">
              <Lock className="h-8 w-8 text-[#FF389A]" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">Ready to Start?</h3>
          <p className="text-gray-300 leading-relaxed">
            Log in to access your personalized onboarding experience and unlock {title.toLowerCase()}.
          </p>
          <Button className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-8 py-3 font-bold w-full">
            Log In to Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

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
      {/* Hero Section with Mobile Mockups */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF389A]/20 via-[#0D0D24] to-[#FF389A]/10 border border-[#FF389A]/30 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge className="bg-[#FF389A]/20 text-[#FF389A] border-[#FF389A]/30 font-semibold">
                Real Customer Success Stories
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                See Your Platform
                <span className="block text-[#FF389A]">Come to Life</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Discover how leading brands like The Farmer's Dog, Lane7, and Best Western 
                create stunning customer experiences with our platform.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Dialog open={showExamplesModal} onOpenChange={setShowExamplesModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg font-bold">
                    View Examples
                    <Play className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0D0D24] border-[#FF389A]/30 text-white max-w-5xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-[#FF389A] text-2xl font-bold">Customer Success Examples</DialogTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowExamplesModal(false)}
                        className="text-white hover:text-[#FF389A]"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-8 mt-6">
                    {/* Customer Examples Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                      {/* The Farmer's Dog - Loyalty Scheme */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">The Farmer's Dog - Loyalty Program</h3>
                        <div className="bg-gradient-to-br from-[#FF389A]/10 to-[#FF389A]/5 rounded-xl p-6 border border-[#FF389A]/20">
                          <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center text-gray-600">
                              <Star className="h-12 w-12 mx-auto mb-2 text-orange-500" />
                              <p className="font-semibold">Loyalty Dashboard Preview</p>
                              <p className="text-sm">Points tracking & rewards</p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Custom loyalty program with point accumulation for repeat purchases and referral bonuses.
                          </p>
                        </div>
                      </div>

                      {/* Lane7 - Booking System */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Lane7 - Booking Confirmation</h3>
                        <div className="bg-gradient-to-br from-[#FF389A]/10 to-[#FF389A]/5 rounded-xl p-6 border border-[#FF389A]/20">
                          <div className="aspect-video bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center text-gray-600">
                              <Calendar className="h-12 w-12 mx-auto mb-2 text-red-500" />
                              <p className="font-semibold">Booking Confirmation</p>
                              <p className="text-sm">Automated confirmations</p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Streamlined bowling lane reservations with instant confirmations and reminder notifications.
                          </p>
                        </div>
                      </div>

                      {/* Best Western - Email Template */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Best Western - Email Campaign</h3>
                        <div className="bg-gradient-to-br from-[#FF389A]/10 to-[#FF389A]/5 rounded-xl p-6 border border-[#FF389A]/20">
                          <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center text-gray-600">
                              <MessageSquare className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                              <p className="font-semibold">Email Template</p>
                              <p className="text-sm">Branded communications</p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Professional email templates for guest communications and promotional campaigns.
                          </p>
                        </div>
                      </div>

                      {/* WiFi Marketing Example */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">WiFi Marketing Portal</h3>
                        <div className="bg-gradient-to-br from-[#FF389A]/10 to-[#FF389A]/5 rounded-xl p-6 border border-[#FF389A]/20">
                          <div className="aspect-video bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center text-gray-600">
                              <Wifi className="h-12 w-12 mx-auto mb-2 text-green-500" />
                              <p className="font-semibold">Guest WiFi Portal</p>
                              <p className="text-sm">Branded landing page</p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Custom splash pages that capture guest information while providing WiFi access.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-6 border-t border-gray-600/30">
                      <p className="text-gray-300 mb-4">
                        Ready to create your own branded customer experiences?
                      </p>
                      <Button className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-8 py-3 font-bold">
                        Start Building
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Mobile Mockups */}
          <div className="relative">
            <div className="flex justify-center items-end space-x-4 lg:space-x-6">
              <img 
                src={mobileMockupsPath} 
                alt="Mobile app mockups showing The Farmer's Dog, Lane7, and Best Western branded implementations"
                className="mobile-mockup max-w-full h-auto object-contain mix-blend-screen filter brightness-110 contrast-110"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(255, 56, 154, 0.3)) brightness(1.1) contrast(1.1)',
                  mixBlendMode: 'screen'
                }}
              />
            </div>
            {/* Enhanced floating elements for visual interest */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-br from-[#FF389A]/20 to-transparent rounded-full blur-lg animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      {/* Your Onboarding Progress Section */}
      {isLocked ? (
        <LockedOverlay title="Your Onboarding Progress">
          <div className="space-y-6 opacity-40 pointer-events-none">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your Onboarding Progress</h2>
                <p className="text-muted-foreground">Complete these essential setup tasks to get the most out of your platform</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">0/6</div>
                <div className="text-sm text-muted-foreground">Tasks Complete</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onboardingBlocks.slice(0, 3).map((block) => (
                <div key={block.id} className="interactive-card group opacity-60">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm">
                        {block.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-white">
                          {block.title}
                        </h3>
                        <Badge className="bg-gray-600/20 text-gray-400 border-gray-600/30 font-semibold">
                          Locked
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LockedOverlay>
      ) : (
        <>
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
        </>
      )}

      {/* Progress Till Go Live Section - Clean Stepper Design */}
      <div className="space-y-8 mt-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-bold text-white">Progress Till Go Live!</h2>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-[#FF389A]">17%</div>
            <div className="text-sm text-gray-300">Complete</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF389A] to-[#E6329C] transition-all duration-1000 relative"
            style={{ width: '17%' }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-bold text-white">Progress Till Go Live!</h2>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#FF389A]">0%</div>
                <div className="text-sm text-gray-300">Complete</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden opacity-50">
              <div className="h-full bg-gradient-to-r from-[#FF389A] to-[#E6329C] w-0"></div>
            </div>
          </div>
        </LockedOverlay>
      ) : (
        <div className="space-y-8 mt-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-bold text-white">Progress Till Go Live!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-gray-400 hover:text-[#FF389A]">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#16173F] border-[#FF389A]/30 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-[#FF389A]">What does "Go Live" mean?</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    Going live means your platform is fully configured, your team is trained, 
                    and you're ready to serve customers with your new system.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-[#FF389A]">17%</div>
            <div className="text-sm text-gray-300">Complete</div>
          </div>
        </div>

        {/* Clean Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF389A] to-[#E6329C] transition-all duration-1000 relative"
            style={{ width: '17%' }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        {/* Clean Vertical Stepper */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              title: "Platform Ready",
              description: "All core features configured and tested",
              status: "pending"
            },
            {
              title: "Team Training",
              description: "Staff onboarded and comfortable with tools",
              status: "current"
            },
            {
              title: "Customer Launch",
              description: "Begin serving customers with new system",
              status: "pending"
            }
          ].map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              {/* Step Indicator */}
              <div className={`
                relative flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center
                transition-all duration-300
                ${step.status === 'completed' 
                  ? 'bg-[#FF389A] border-[#FF389A] shadow-lg shadow-[#FF389A]/40' 
                  : step.status === 'current'
                  ? 'bg-white border-[#FF389A] shadow-lg shadow-white/30'
                  : 'bg-[#0D0D24] border-gray-600'
                }
              `}>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="h-6 w-6 text-white" />
                ) : step.status === 'current' ? (
                  <div 
                    className="w-2 h-2 bg-[#00D98B] rounded-full"
                    aria-label="in progress"
                  />
                ) : (
                  <span className="text-lg font-bold text-gray-400">{index + 1}</span>
                )}
              </div>

              {/* Connecting Line */}
              {index < 2 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-600 translate-y-0">
                  <div 
                    className={`w-full bg-gradient-to-b from-[#FF389A] to-[#E6329C] transition-all duration-500 ${
                      step.status === 'completed' ? 'h-full' : 'h-0'
                    }`}
                  ></div>
                </div>
              )}

              {/* Step Content */}
              <div className="flex-1">
                <Card className={`
                  p-6 transition-all duration-300 border-2
                  ${step.status === 'completed' 
                    ? 'bg-[#FF389A]/10 border-[#FF389A] shadow-lg shadow-[#FF389A]/20' 
                    : step.status === 'current'
                    ? 'bg-white/5 border-white/30 shadow-lg shadow-white/10'
                    : 'bg-[#16173F] border-gray-600/30'
                  }
                `}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`
                        text-xl font-bold mb-2
                        ${step.status === 'completed' 
                          ? 'text-[#FF389A]' 
                          : step.status === 'current'
                          ? 'text-white'
                          : 'text-gray-300'
                        }
                      `}>
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    <Button 
                      className={`
                        ml-4 transition-all duration-300
                        ${step.status === 'current'
                          ? 'bg-[#FF389A] hover:bg-[#E6329C] text-white shadow-lg'
                          : step.status === 'completed'
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }
                      `}
                      disabled={step.status === 'pending'}
                    >
                      {step.status === 'completed' ? 'Completed' : 
                       step.status === 'current' ? 'Continue' : 'Locked'}
                      {step.status === 'current' && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}