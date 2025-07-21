import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, Settings, Rocket, Calendar, Star, Mail } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { apiRequest } from "@/lib/queryClient";
import type { OnboardingProgress } from "@shared/schema";
import LoyaltyCarousel from "@/components/LoyaltyCarousel";

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "setup" | "configuration" | "training" | "launch";
}

const PROGRESS_STEPS: ProgressStep[] = [
  {
    id: "account_setup",
    title: "Account Setup",
    description: "Initial account configuration completed",
    icon: <Check className="h-5 w-5" />,
    category: "setup"
  },
  {
    id: "viewed_bookings_guide",
    title: "Bookings Training",
    description: "Completed table booking system guide",
    icon: <Calendar className="h-5 w-5" />,
    category: "training"
  },
  {
    id: "viewed_loyalty_guide",
    title: "Loyalty Training",
    description: "Completed loyalty program setup guide",
    icon: <Star className="h-5 w-5" />,
    category: "training"
  },
  {
    id: "viewed_marketing_guide",
    title: "Marketing Training",
    description: "Completed marketing automation guide",
    icon: <Mail className="h-5 w-5" />,
    category: "training"
  },
  {
    id: "feature_configuration",
    title: "Feature Configuration",
    description: "Core features configured and tested",
    icon: <Settings className="h-5 w-5" />,
    category: "configuration"
  },
  {
    id: "go_live",
    title: "Go Live",
    description: "Platform launched and operational",
    icon: <Rocket className="h-5 w-5" />,
    category: "launch"
  }
];

interface ProgressTrackerProps {
  onStepComplete?: (stepId: string) => void;
}

export default function ProgressTracker({ onStepComplete }: ProgressTrackerProps) {
  const { dbUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: progress = [], isLoading } = useQuery<OnboardingProgress[]>({
    queryKey: ["/api/progress"],
    enabled: !!dbUser,
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ step, completed }: { step: string; completed: boolean }) => {
      return await apiRequest("POST", "/api/progress", { step, completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });

  const trackProgress = (stepId: string) => {
    if (!dbUser) return;
    
    const existing = progress.find(p => p.step === stepId);
    if (!existing || !existing.completed) {
      updateProgressMutation.mutate({ step: stepId, completed: true });
      onStepComplete?.(stepId);
    }
  };

  // Auto-track account setup for logged-in users
  useEffect(() => {
    if (dbUser && !isLoading) {
      trackProgress("account_setup");
    }
  }, [dbUser, isLoading]);

  const getStepStatus = (stepId: string) => {
    const stepProgress = progress.find(p => p.step === stepId);
    return stepProgress?.completed || false;
  };

  const completedSteps = PROGRESS_STEPS.filter(step => getStepStatus(step.id));
  const progressPercentage = Math.round((completedSteps.length / PROGRESS_STEPS.length) * 100);

  const getStepIcon = (step: ProgressStep, isCompleted: boolean) => {
    if (isCompleted) {
      return <Check className="h-5 w-5 text-green-600" />;
    }
    return <div className="text-gray-400">{step.icon}</div>;
  };

  const getStepCardStyle = (step: ProgressStep, isCompleted: boolean) => {
    if (isCompleted) {
      return "bg-green-50 border-green-200 shadow-sm";
    }
    
    const currentStep = !completedSteps.length || 
      completedSteps[completedSteps.length - 1]?.id === PROGRESS_STEPS[PROGRESS_STEPS.findIndex(s => s.id === step.id) - 1]?.id;
    
    if (currentStep && !isCompleted) {
      return "bg-blue-50 border-blue-200 shadow-md border-2";
    }
    
    return "bg-white border-gray-200 shadow-sm";
  };

  const getCategoryBadge = (category: string) => {
    const styles = {
      setup: "bg-blue-100 text-blue-800",
      configuration: "bg-orange-100 text-orange-800",
      training: "bg-green-100 text-green-800",
      launch: "bg-purple-100 text-purple-800"
    };
    
    return (
      <Badge className={`text-xs ${styles[category as keyof typeof styles]}`} variant="secondary">
        {category}
      </Badge>
    );
  };

  // Expose trackProgress function for parent components
  useEffect(() => {
    (window as any).trackOnboardingProgress = trackProgress;
    return () => {
      delete (window as any).trackOnboardingProgress;
    };
  }, [trackProgress]);

  if (!dbUser) {
    return (
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Track Your Progress</h2>
          <p className="text-gray-600">Sign in to track your onboarding journey</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Onboarding Progress</h2>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
        <p className="text-gray-600">
          {progressPercentage === 100 
            ? "🎉 Congratulations! You've completed your onboarding journey!" 
            : `${completedSteps.length} of ${PROGRESS_STEPS.length} steps completed - Keep going, you're doing great!`
          }
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROGRESS_STEPS.map((step) => {
          const isCompleted = getStepStatus(step.id);
          
          return (
            <Card key={step.id} className={getStepCardStyle(step, isCompleted)}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-white">
                  {getStepIcon(step, isCompleted)}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  <div className="flex justify-center">
                    {getCategoryBadge(step.category)}
                  </div>
                  {isCompleted && (
                    <div className="text-xs text-green-600 font-medium">
                      ✓ Completed
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Loyalty Carousel Section */}
      <LoyaltyCarousel />
    </section>
  );
}
