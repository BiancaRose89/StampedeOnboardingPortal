import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  Calendar,
  Settings,
  BookOpen,
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
}

interface OnboardingJourneyPreviewProps {
  className?: string;
}

export default function OnboardingJourneyPreview({ className }: OnboardingJourneyPreviewProps) {
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'account-setup',
      number: 1,
      title: 'Account Setup',
      icon: <User className="h-6 w-6" />,
      description: 'We set up your branded platform behind the scenes'
    },
    {
      id: 'kickoff-call',
      number: 2,
      title: 'Kick-Off Call',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Meet your Customer Success Manager and plan your journey',
      duration: '20 mins'
    },
    {
      id: 'configuration-call',
      number: 3,
      title: 'Configuration Call',
      icon: <Settings className="h-6 w-6" />,
      description: 'Tailor your system to your venue\'s specific needs',
      duration: '45 mins'
    },
    {
      id: 'feature-training',
      number: 4,
      title: 'Feature Training',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Focused training sessions to master your platform'
    },
    {
      id: 'go-live-handover',
      number: 5,
      title: 'Go-Live & Handover',
      icon: <CheckCircle className="h-6 w-6" />,
      description: 'Launch your system and complete the handover process'
    }
  ];

  return (
    <div className={className}>
      {/* Main Onboarding Journey */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your Onboarding Journey
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Your all-in-one hospitality partner helping you manage guest WiFi, bookings, marketing, loyalty, reviews and more. This onboarding guide is built to help you launch successfully and with confidence, fully supported at each step.
        </p>
        
        {/* Platform Animation */}
        <div className="mb-8">
          <img 
            src="https://h.stampede.ai/hubfs/stampede%20phones.gif" 
            alt="Platform Preview"
            className="mx-auto max-w-md rounded-lg"
          />
        </div>
      </div>

      {/* Visual Roadmap - Vertical Flow */}
      <div className="max-w-4xl mx-auto mb-12">
        {onboardingSteps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Step Card */}
            <div className="flex items-center gap-6 p-6 bg-black/40 border border-[#FF389A]/30 rounded-xl mb-6 hover:border-[#FF389A]/60 transition-all duration-300">
              {/* Step Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#FF389A] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
              </div>
              
              {/* Step Content */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-[#FF389A]">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-white text-xl">
                    {step.title}
                  </h3>
                  {step.duration && (
                    <Badge variant="outline" className="border-[#FF389A]/40 text-[#FF389A] text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.duration}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
            
            {/* Connecting Arrow */}
            {index < onboardingSteps.length - 1 && (
              <div className="flex justify-center mb-6">
                <ArrowRight className="h-8 w-8 text-[#FF389A] rotate-90" />
              </div>
            )}
          </div>
        ))}
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