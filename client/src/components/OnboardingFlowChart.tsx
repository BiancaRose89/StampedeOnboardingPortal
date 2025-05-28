import { Check, Clock, Star } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  estimatedTime: string;
  stepNumber: number;
}

const flowSteps: FlowStep[] = [
  {
    id: 'welcome',
    title: 'Account creation and initial configuration',
    description: 'Account creation and initial configuration',
    status: 'completed',
    estimatedTime: '10 min',
    stepNumber: 1
  },
  {
    id: 'core-features',
    title: 'Configure essential business tools',
    description: 'Configure essential business tools',
    status: 'current',
    estimatedTime: '45 min',
    stepNumber: 2
  },
  {
    id: 'customization',
    title: 'Brand styling and personalization',
    description: 'Brand styling and personalization',
    status: 'upcoming',
    estimatedTime: '20 min',
    stepNumber: 3
  },
  {
    id: 'testing',
    title: 'Test functionality and review setup',
    description: 'Test functionality and review setup',
    status: 'upcoming',
    estimatedTime: '15 min',
    stepNumber: 4
  },
  {
    id: 'launch',
    title: 'Launch your platform to customers',
    description: 'Launch your platform to customers',
    status: 'upcoming',
    estimatedTime: '5 min',
    stepNumber: 5
  }
];

export default function OnboardingFlowChart() {
  const completedSteps = flowSteps.filter(step => step.status === 'completed').length;
  const currentStepIndex = flowSteps.findIndex(step => step.status === 'current');
  const progressPercentage = Math.round((completedSteps / flowSteps.length) * 100);

  return (
    <div className="space-y-8">
      {/* Timeline Design matching your image */}
      <div className="max-w-5xl mx-auto">
        {/* Desktop Timeline */}
        <div className="hidden lg:flex items-center justify-between relative">
          {/* Background connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-600 transform -translate-y-1/2 z-0"></div>
          
          {flowSteps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isLast = index === flowSteps.length - 1;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                {/* Step Circle */}
                <div className={`
                  w-16 h-16 rounded-full border-4 flex items-center justify-center
                  transition-all duration-300 shadow-lg
                  ${isCompleted 
                    ? 'bg-[#FF389A] border-[#FF389A] shadow-[#FF389A]/40' 
                    : isCurrent 
                    ? 'bg-white border-[#FF389A] shadow-white/40' 
                    : 'bg-gray-600 border-gray-600 shadow-gray-600/20'
                  }
                `}>
                  {isCompleted ? (
                    <Check className="h-6 w-6 text-white" />
                  ) : isCurrent ? (
                    <Clock className="h-6 w-6 text-[#0D0D24]" />
                  ) : (
                    <Star className="h-6 w-6 text-gray-400" />
                  )}
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF389A] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {step.stepNumber}
                </div>

                {/* Step Content */}
                <div className="mt-6 text-center max-w-40">
                  <div className="text-white font-medium text-sm mb-1">
                    {step.title}
                  </div>
                  <div className="text-[#FF389A] text-xs font-medium">
                    {step.estimatedTime}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Progress Line Overlay */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[#FF389A] transform -translate-y-1/2 transition-all duration-1000 z-5"
            style={{ 
              width: `${(completedSteps / (flowSteps.length - 1)) * 100}%` 
            }}
          ></div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {flowSteps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isLast = index === flowSteps.length - 1;

            return (
              <div key={step.id} className="flex items-center space-x-4">
                <div className="relative">
                  {/* Step Circle */}
                  <div className={`
                    w-12 h-12 rounded-full border-3 flex items-center justify-center
                    transition-all duration-300
                    ${isCompleted 
                      ? 'bg-[#FF389A] border-[#FF389A]' 
                      : isCurrent 
                      ? 'bg-white border-[#FF389A]' 
                      : 'bg-gray-600 border-gray-600'
                    }
                  `}>
                    {isCompleted ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : isCurrent ? (
                      <Clock className="h-5 w-5 text-[#0D0D24]" />
                    ) : (
                      <Star className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF389A] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {step.stepNumber}
                  </div>

                  {/* Vertical connecting line */}
                  {!isLast && (
                    <div className="absolute top-12 left-1/2 w-0.5 h-8 bg-gray-600 transform -translate-x-1/2">
                      <div 
                        className={`w-full bg-[#FF389A] transition-all duration-500 ${
                          isCompleted ? 'h-full' : 'h-0'
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="text-white font-medium text-base mb-1">
                    {step.title}
                  </div>
                  <div className="text-[#FF389A] text-sm font-medium">
                    {step.estimatedTime}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary Box */}
        <div className="mt-12 bg-gradient-to-r from-[#FF389A]/10 to-transparent rounded-2xl p-8 border border-[#FF389A]/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">
                {currentStepIndex >= 0 ? flowSteps[currentStepIndex]?.title || 'Configure essential business tools' : 'Ready to Launch!'}
              </h4>
              <p className="text-gray-300">
                {progressPercentage < 100 ? 'Complete these essential setup tasks to get the most out of your platform' : 'All tasks completed - ready to go live!'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-[#FF389A] mb-1">
                {progressPercentage}%
              </div>
              <div className="text-gray-300 text-sm">Complete</div>
            </div>
          </div>
          
          {/* Progress Bar matching your design */}
          <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#FF389A] to-[#FF389A]/80 h-4 rounded-full transition-all duration-1000 relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}