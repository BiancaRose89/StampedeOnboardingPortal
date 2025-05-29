import { Users, Wifi, Target, Star, MessageSquare, Gift, Calendar, Rocket, ArrowRight } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  estimatedTime: string;
  stepNumber: number;
}

export default function OnboardingFlowChart() {
  const flowSteps: FlowStep[] = [
    {
      id: 'account-setup',
      title: 'Account Setup',
      icon: <Users className="h-6 w-6 text-white" />,
      description: 'Complete your basic account configuration',
      estimatedTime: '10 min',
      stepNumber: 1
    },
    {
      id: 'bookings',
      title: 'Bookings',
      icon: <Calendar className="h-6 w-6 text-white" />,
      description: 'Set up booking and appointment management',
      estimatedTime: '12 min',
      stepNumber: 2
    },
    {
      id: 'wifi-setup',
      title: 'WiFi',
      icon: <Wifi className="h-6 w-6 text-white" />,
      description: 'Configure guest WiFi with marketing capture',
      estimatedTime: '15 min',
      stepNumber: 3
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: <Target className="h-6 w-6 text-white" />,
      description: 'Build powerful marketing campaigns',
      estimatedTime: '20 min',
      stepNumber: 4
    },
    {
      id: 'loyalty',
      title: 'Loyalty',
      icon: <Star className="h-6 w-6 text-white" />,
      description: 'Create customer loyalty programs',
      estimatedTime: '15 min',
      stepNumber: 5
    },
    {
      id: 'reviews',
      title: 'Reviews',
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      description: 'Set up review management systems',
      estimatedTime: '12 min',
      stepNumber: 6
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards',
      icon: <Gift className="h-6 w-6 text-white" />,
      description: 'Launch digital gift card sales',
      estimatedTime: '18 min',
      stepNumber: 7
    },
    {
      id: 'launch',
      title: 'Launch',
      icon: <Rocket className="h-6 w-6 text-white" />,
      description: 'Go live with your fully configured platform',
      estimatedTime: '5 min',
      stepNumber: 8
    }
  ];

  return (
    <div className="space-y-8 mb-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Your Onboarding Journey</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Follow these 8 essential steps to get your platform ready for customers
        </p>
      </div>

      {/* Desktop Flow Chart */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Icon */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#FF389A]/20">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF389A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {step.stepNumber}
                  </div>
                </div>
                <div className="text-center max-w-[120px]">
                  <h3 className="font-bold text-white text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{step.estimatedTime}</p>
                </div>
              </div>

              {/* Arrow (except for last item) */}
              {index < flowSteps.length - 1 && (
                <div className="flex-1 flex items-center justify-center mx-4">
                  <ArrowRight className="h-5 w-5 text-[#FF389A]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Flow Chart */}
      <div className="lg:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center space-y-3 relative">
              {/* Step Icon */}
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#FF389A]/20">
                  {step.icon}
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF389A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {step.stepNumber}
                </div>
              </div>
              
              {/* Step Info */}
              <div className="text-center">
                <h3 className="font-bold text-white text-sm">{step.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{step.estimatedTime}</p>
              </div>

              {/* Connection line for mobile */}
              {index < flowSteps.length - 1 && index % 2 === 0 && index < flowSteps.length - 2 && (
                <div className="absolute top-7 left-full w-6 h-0.5 bg-[#FF389A]/50 hidden md:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}