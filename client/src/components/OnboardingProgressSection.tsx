import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Users, Wifi, Target, MessageSquare, Star, Gift, Calendar, ArrowRight, Play, Clock, CheckCircle } from "lucide-react";

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

interface OnboardingModalProps {
  block: OnboardingBlock;
  currentStep: number;
  onStepChange: (step: number) => void;
}

function OnboardingModal({ block, currentStep, onStepChange }: OnboardingModalProps) {
  return (
    <DialogContent className="max-w-4xl h-[80vh] bg-[#0D0D24] border-[#FF389A]/30">
      <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
        <div className="p-3 rounded-xl bg-[#FF389A]/20 border border-[#FF389A]/30">
          {block.icon}
        </div>
        {block.title}
      </DialogTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video bg-[#16173F] rounded-xl border border-[#FF389A]/30 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Play className="h-16 w-16 text-[#FF389A] mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-white">Training Video</h3>
                <p className="text-gray-300">Step-by-step walkthrough</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white">What you'll learn:</h4>
            <ul className="space-y-2 text-gray-300">
              {block.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF389A] mt-2 flex-shrink-0" />
                  <span>{step.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Steps</h4>
            {block.steps.map((step, index) => (
              <Button
                key={index}
                variant={currentStep === index ? "default" : "outline"}
                className={`w-full justify-start text-left h-auto p-4 ${
                  currentStep === index 
                    ? 'bg-[#FF389A] text-white border-[#FF389A]' 
                    : 'bg-[#16173F] text-gray-300 border-gray-600/30 hover:bg-[#FF389A]/10'
                }`}
                onClick={() => onStepChange(index)}
              >
                <div className="space-y-1">
                  <div className="font-bold">{index + 1}. {step.title}</div>
                  <div className="text-xs opacity-80">{step.description}</div>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Resources</h4>
            {block.steps[currentStep]?.articles.map((article, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start bg-[#16173F] text-gray-300 border-gray-600/30 hover:bg-[#FF389A]/10"
              >
                <div className="space-y-1 text-left">
                  <div className="font-bold">{article.title}</div>
                  <div className="text-xs capitalize opacity-60">{article.type}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default function OnboardingProgressSection() {
  const [currentModalStep, setCurrentModalStep] = useState(0);

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
      id: 'bookings',
      title: 'Bookings',
      description: 'Set up booking and appointment management system for your business',
      icon: <Calendar className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '12 minutes',
      difficulty: 'Beginner',
      videoUrl: 'https://example.com/bookings-setup',
      steps: [
        {
          id: 'booking-calendar',
          title: 'Calendar Setup',
          description: 'Configure your booking calendar and availability',
          articles: [
            { title: 'Booking System Guide', url: '#', type: 'guide' }
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
      status: 'not-started',
      estimatedTime: '20 minutes',
      difficulty: 'Intermediate',
      videoUrl: 'https://example.com/marketing-setup',
      steps: [
        {
          id: 'email-campaigns',
          title: 'Email Campaigns',
          description: 'Set up automated email marketing workflows',
          articles: [
            { title: 'Email Marketing Best Practices', url: '#', type: 'guide' }
          ]
        }
      ]
    },
    {
      id: 'loyalty',
      title: 'Loyalty',
      description: 'Create customer loyalty programs that drive repeat visits and increase customer lifetime value',
      icon: <Star className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '15 minutes',
      difficulty: 'Beginner',
      videoUrl: 'https://example.com/loyalty-setup',
      steps: [
        {
          id: 'loyalty-program',
          title: 'Loyalty Program',
          description: 'Design and launch your customer loyalty program',
          articles: [
            { title: 'Loyalty Program Guide', url: '#', type: 'guide' }
          ]
        }
      ]
    },
    {
      id: 'reviews',
      title: 'Reviews',
      description: 'Set up review management and customer feedback systems to build trust and improve service',
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '12 minutes',
      difficulty: 'Beginner',
      videoUrl: 'https://example.com/reviews-setup',
      steps: [
        {
          id: 'review-system',
          title: 'Review System',
          description: 'Configure automated review collection and management',
          articles: [
            { title: 'Review Management Guide', url: '#', type: 'guide' }
          ]
        }
      ]
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards',
      description: 'Launch digital gift card sales to boost revenue and attract new customers',
      icon: <Gift className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '18 minutes',
      difficulty: 'Advanced',
      videoUrl: 'https://example.com/giftcards-setup',
      steps: [
        {
          id: 'gift-card-setup',
          title: 'Gift Card Setup',
          description: 'Configure digital gift card sales and redemption',
          articles: [
            { title: 'Gift Card Implementation Guide', url: '#', type: 'guide' }
          ]
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-[#FF389A]" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Your Onboarding Progress</h2>
            <p className="text-gray-300">Complete these essential setup tasks to get the most out of your platform</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {onboardingBlocks.filter(block => block.status === 'completed').length}/{onboardingBlocks.length}
            </div>
            <div className="text-sm text-gray-300">Tasks Complete</div>
          </div>
        </div>

        {/* Account Setup - Full Width Row */}
        <div className="mb-8">
          {onboardingBlocks.slice(0, 1).map((block) => (
            <Dialog key={block.id} onOpenChange={() => setCurrentModalStep(0)}>
              <DialogTrigger asChild>
                <div className="interactive-card group cursor-pointer">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{block.description}</p>
                  
                  {block.status !== 'not-started' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-white">Progress</span>
                        <span className="text-[#FF389A]">{block.progress}%</span>
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

        {/* Feature Blocks - 2 Rows of 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {onboardingBlocks.slice(1).map((block) => (
            <Dialog key={block.id} onOpenChange={() => setCurrentModalStep(0)}>
              <DialogTrigger asChild>
                <div className="interactive-card group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm">
                        {block.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white group-hover:text-glow-pink transition-all duration-300">
                          {block.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(block.status)}
                          <span className="text-xs text-gray-300 font-medium">{block.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3 leading-relaxed text-sm">{block.description}</p>
                  
                  {block.status !== 'not-started' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-white">Progress</span>
                        <span className="text-[#FF389A]">{block.progress}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={block.progress} className="h-2 bg-[#0D0D24]/80" />
                        <div 
                          className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-[#FF389A] to-[#FF389A] transition-all duration-500 shadow-lg"
                          style={{ width: `${block.progress}%`, boxShadow: '0 0 10px rgba(255, 56, 154, 0.5)' }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#FF389A]/30">
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#FF389A] animate-pulse shadow-lg" style={{boxShadow: '0 0 8px rgba(255, 56, 154, 0.6)'}} />
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
      </div>
    </div>
  );
}