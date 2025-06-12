import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { 
  User,
  BarChart3,
  Wifi,
  Calendar,
  MessageSquare,
  Star,
  Gift,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  number: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  duration?: string;
  image: string;
  detailedContent: {
    subtitle?: string;
    stampedeActions: string[];
    userActions: string[];
    additionalInfo?: string[];
  };
}

interface OnboardingJourneyPreviewProps {
  className?: string;
}

export default function OnboardingJourneyPreview({ className }: OnboardingJourneyPreviewProps) {
  const [selectedStep, setSelectedStep] = useState<OnboardingStep | null>(null);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'account-setup',
      number: 1,
      title: 'Account Setup',
      icon: <User className="h-6 w-6" />,
      description: 'We set up your branded platform behind the scenes',
      image: 'https://h.stampede.ai/hs-fs/hubfs/mraketing%20lp%20dark-1.png',
      detailedContent: {
        subtitle: 'We\'ll begin setup behind the scenes to prepare your platform.',
        stampedeActions: [
          'Brand your account using your logos and colours',
          'Add your venue(s) to the system',
          'Send your login credentials'
        ],
        userActions: [
          'Check your inbox for your login email or use your activation link',
          'Log in and review your venue branding'
        ]
      }
    },
    {
      id: 'kickoff-call',
      number: 2,
      title: 'Kick-Off Call',
      icon: <BarChart3 className="h-6 w-6" />,
      description: 'Meet your Customer Success Manager and plan your journey',
      duration: '20 mins',
      image: 'https://h.stampede.ai/hs-fs/hubfs/booking%20lp%20dark-1.png',
      detailedContent: {
        subtitle: 'This is your introduction to your Customer Success Manager. We\'ll walk through your onboarding plan and align on next steps.',
        stampedeActions: [
          'Your core feature setup',
          'Overview of your onboarding journey',
          'Preparation for going live'
        ],
        userActions: [
          'Reply to the scheduling email with your availability',
          'After the call, review your Shared Success Plan checklist'
        ]
      }
    },
    {
      id: 'configuration-call',
      number: 3,
      title: 'Configuration Call',
      icon: <Wifi className="h-6 w-6" />,
      description: 'Tailor your system to your venue\'s specific needs',
      duration: '45 mins',
      image: 'https://h.stampede.ai/hs-fs/hubfs/WiFi%20lp%20dark.png',
      detailedContent: {
        subtitle: 'Now we tailor your system to your venue\'s needs.',
        stampedeActions: [
          'WiFi Setup - Confirm hardware (TP-Link, Ubiquiti, etc.)',
          'Review network layout and performance',
          'Marketing Setup - Verify domain and email sender',
          'Upload brand assets (logos, colours, fonts)',
          'Import your CRM data (Mailchimp or CSV)',
          'Feature Configuration - Loyalty, Reviews, Gifting, Bookings',
          'Segment creation and use cases',
          'Automated campaigns (Birthday, At-Risk, Lost, WiFi)'
        ],
        userActions: [
          'Provide any outstanding data (WiFi contact, CRM file, branding)',
          'Finalise use cases for campaign setup'
        ]
      }
    },
    {
      id: 'feature-training',
      number: 4,
      title: 'Feature Training',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Focused training sessions to master your platform',
      image: 'https://h.stampede.ai/hs-fs/hubfs/admin%20lp%20dark.png',
      detailedContent: {
        subtitle: 'You\'ll receive focused training sessions to become confident using Stampede. Each session includes a checklist and summary notes.',
        stampedeActions: [
          'Marketing & Reviews Training - Learn to create customer segments',
          'Set up and launch email campaigns',
          'Manage reviews and insights',
          'Loyalty & Gifting Training - Configure loyalty rules and redemption',
          'Manage customer gifting journeys',
          'Bookings Training - Set up table types, areas, combos',
          'Embed booking widget on your website',
          'Set up Stripe and Google Reserve'
        ],
        userActions: [
          'Attend scheduled training sessions',
          'Complete training checklists',
          'Practice using platform features'
        ]
      }
    },
    {
      id: 'go-live',
      number: 5,
      title: 'Go-Live & Handover',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Final checks and transition to ongoing support',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Wifi%20training%20dark.png',
      detailedContent: {
        subtitle: 'Once training is complete and everything is in place, we\'ll confirm your readiness.',
        stampedeActions: [
          'All features tested and working',
          'Training resources shared',
          'Google Reserve activated (if needed)',
          'Go-Live Confirmation sent',
          'Transition to Support Team for ongoing help'
        ],
        userActions: [
          'Confirm you\'re confident and fully onboarded',
          'Begin using the platform with customers',
          'Access Knowledge Base for ongoing support'
        ],
        additionalInfo: [
          'Your dedicated Customer Success Manager will hand you over to our Support Team for ongoing assistance.',
          'Keep an eye on your inbox for product updates, insights, and tips to keep your venue thriving.',
          'Check out our Knowledge Base for step-by-step guides, FAQs, and best practices.'
        ]
      }
    }
  ];

  const quickSteps = [
    { id: 'marketing', title: 'Marketing', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'wifi', title: 'Wi-Fi', icon: <Wifi className="h-5 w-5" /> },
    { id: 'booking', title: 'Booking', icon: <Calendar className="h-5 w-5" /> },
    { id: 'reviews', title: 'Reviews', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'loyalty', title: 'Loyalty', icon: <Star className="h-5 w-5" /> },
    { id: 'gift-cards', title: 'Gift Cards', icon: <Gift className="h-5 w-5" /> },
    { id: 'analytics', title: 'Analytics', icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <div className={className}>
      {/* Main Onboarding Journey */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your Onboarding Journey
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Stampede is your all-in-one hospitality partner helping you manage guest WiFi, bookings, marketing, loyalty, reviews and more. This onboarding guide is built to help you launch successfully and with confidence, fully supported at each step.
        </p>
        
        {/* Stampede Animation */}
        <div className="mb-8">
          <img 
            src="https://h.stampede.ai/hubfs/stampede%20phones.gif" 
            alt="Stampede Platform Preview"
            className="mx-auto max-w-md rounded-lg"
          />
        </div>
      </div>

      {/* Detailed Onboarding Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {onboardingSteps.map((step) => (
          <Dialog key={step.id}>
            <DialogTrigger asChild>
              <Card className="bg-black border-[#FF389A]/20 hover:border-[#FF389A]/40 transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF389A] flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                      {step.duration && (
                        <Badge variant="outline" className="border-[#FF389A]/30 text-[#FF389A] mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.duration}
                        </Badge>
                      )}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#FF389A] transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl bg-black border-[#FF389A]/20">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF389A] flex items-center justify-center text-white font-bold">
                    {step.number}
                  </div>
                  Step {step.number}: {step.title}
                  {step.duration && (
                    <Badge variant="outline" className="border-[#FF389A]/30 text-[#FF389A]">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.duration}
                    </Badge>
                  )}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                <div>
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full rounded-lg"
                  />
                </div>
                
                {/* Content */}
                <div className="space-y-6">
                  {step.detailedContent.subtitle && (
                    <p className="text-gray-300">{step.detailedContent.subtitle}</p>
                  )}
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#FF389A]" />
                      What Stampede Does:
                    </h4>
                    <ul className="space-y-2">
                      {step.detailedContent.stampedeActions.map((action, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#FF389A] rounded-full mt-2 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <User className="h-4 w-4 text-[#FF389A]" />
                      What You Need to Do:
                    </h4>
                    <ul className="space-y-2">
                      {step.detailedContent.userActions.map((action, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#FF389A] rounded-full mt-2 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {step.detailedContent.additionalInfo && (
                    <div className="bg-[#FF389A]/10 border border-[#FF389A]/20 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">What Happens Next?</h4>
                      {step.detailedContent.additionalInfo.map((info, index) => (
                        <p key={index} className="text-gray-300 text-sm mb-2 last:mb-0">{info}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Quick Steps Overview */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-4">
          Follow these essential steps to get your platform ready for customers:
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {quickSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FF389A]/20 border border-[#FF389A]/30 flex items-center justify-center text-[#FF389A] text-sm font-bold">
                {index + 3}
              </div>
              <div className="flex items-center gap-2">
                {step.icon}
                <span className="text-white text-sm">{step.title}</span>
              </div>
              {index < quickSteps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-gray-400 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Link */}
      <div className="text-center">
        <p className="text-gray-300 mb-4">
          Need help or want to dive deeper? 
        </p>
        <Button 
          variant="outline" 
          className="border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
          onClick={() => window.open('https://help.stampede.ai/hc/en-gb', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Check out our Knowledge Base
        </Button>
      </div>
    </div>
  );
}