import { CheckCircle2, ArrowRight, Clock, Star } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  estimatedTime: string;
}

const flowSteps: FlowStep[] = [
  {
    id: 'welcome',
    title: 'Welcome & Setup',
    description: 'Account creation and initial configuration',
    status: 'completed',
    estimatedTime: '10 min'
  },
  {
    id: 'core-features',
    title: 'Core Features',
    description: 'Configure essential business tools',
    status: 'current',
    estimatedTime: '45 min'
  },
  {
    id: 'customization',
    title: 'Customization',
    description: 'Brand styling and personalization',
    status: 'upcoming',
    estimatedTime: '20 min'
  },
  {
    id: 'testing',
    title: 'Testing & Review',
    description: 'Test functionality and review setup',
    status: 'upcoming',
    estimatedTime: '15 min'
  },
  {
    id: 'launch',
    title: 'Go Live!',
    description: 'Launch your platform to customers',
    status: 'upcoming',
    estimatedTime: '5 min'
  }
];

export default function OnboardingFlowChart() {
  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bgColor: 'bg-[#FF389A]',
          textColor: 'text-white',
          borderColor: 'border-[#FF389A]',
          icon: <CheckCircle2 className="h-6 w-6 text-white" />
        };
      case 'current':
        return {
          bgColor: 'bg-white',
          textColor: 'text-[#0D0D24]',
          borderColor: 'border-[#FF389A]',
          icon: <Clock className="h-6 w-6 text-[#0D0D24]" />
        };
      default:
        return {
          bgColor: 'bg-gray-600',
          textColor: 'text-gray-300',
          borderColor: 'border-gray-600',
          icon: <Star className="h-6 w-6 text-gray-400" />
        };
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Onboarding Overview</h2>
        <p className="text-gray-300">Your step-by-step journey to platform mastery</p>
      </div>

      {/* Desktop Flow Chart */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {flowSteps.map((step, index) => {
            const stepStyle = getStepStatus(step.status);
            const isLast = index === flowSteps.length - 1;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step */}
                <div className="relative group">
                  {/* Step Circle */}
                  <div className={`
                    w-20 h-20 rounded-full border-4 ${stepStyle.borderColor} ${stepStyle.bgColor}
                    flex items-center justify-center transition-all duration-300
                    ${step.status === 'current' ? 'animate-pulse shadow-lg shadow-[#FF389A]/30' : ''}
                    group-hover:scale-110
                  `}>
                    {stepStyle.icon}
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF389A] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>

                  {/* Step Content */}
                  <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center w-32">
                    <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-xs mb-2">{step.description}</p>
                    <div className="text-[#FF389A] text-xs font-medium">{step.estimatedTime}</div>
                  </div>

                  {/* Progress Line */}
                  {!isLast && (
                    <div className="absolute top-1/2 left-20 w-16 h-1 bg-gray-600 transform -translate-y-1/2">
                      <div 
                        className={`h-full bg-[#FF389A] transition-all duration-500 ${
                          step.status === 'completed' ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Arrow */}
                {!isLast && (
                  <div className="mx-4">
                    <ArrowRight className={`h-6 w-6 ${
                      step.status === 'completed' ? 'text-[#FF389A]' : 'text-gray-600'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Flow Chart */}
      <div className="lg:hidden space-y-4">
        {flowSteps.map((step, index) => {
          const stepStyle = getStepStatus(step.status);
          const isLast = index === flowSteps.length - 1;

          return (
            <div key={step.id} className="flex items-start space-x-4">
              {/* Step Circle */}
              <div className="relative">
                <div className={`
                  w-12 h-12 rounded-full border-2 ${stepStyle.borderColor} ${stepStyle.bgColor}
                  flex items-center justify-center
                  ${step.status === 'current' ? 'animate-pulse shadow-lg shadow-[#FF389A]/30' : ''}
                `}>
                  {stepStyle.icon}
                </div>
                
                {/* Step Number */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF389A] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>

                {/* Vertical Line */}
                {!isLast && (
                  <div className="absolute top-12 left-1/2 w-0.5 h-8 bg-gray-600 transform -translate-x-1/2">
                    <div 
                      className={`w-full bg-[#FF389A] transition-all duration-500 ${
                        step.status === 'completed' ? 'h-full' : 'h-0'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-2">
                <h3 className="font-bold text-white text-base mb-1">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                <div className="text-[#FF389A] text-sm font-medium">{step.estimatedTime}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-[#FF389A]/20 to-[#FF389A]/10 rounded-xl p-6 border border-[#FF389A]/30 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-white">Overall Progress</h4>
            <p className="text-gray-300 text-sm">You're making great progress!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#FF389A]">
              {Math.round((flowSteps.filter(step => step.status === 'completed').length / flowSteps.length) * 100)}%
            </div>
            <div className="text-gray-300 text-sm">Complete</div>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-[#FF389A] to-[#FF389A]/80 h-3 rounded-full transition-all duration-500"
            style={{ 
              width: `${(flowSteps.filter(step => step.status === 'completed').length / flowSteps.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}