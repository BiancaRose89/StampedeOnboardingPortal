import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Gift,
  CreditCard,
  Smartphone,
  Settings,
  Target,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign
} from "lucide-react";

/**
 * Gift Cards Guide Component
 * Helps users set up digital gift card sales and management system
 * Tracks completion of gift card implementation tasks
 */
export default function GiftCardsGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: "step1",
      title: "Configure Gift Card System",
      description: "Set up digital gift card platform and payment processing",
      tasks: [
        "Connect payment processor for gift card sales (Stripe/Square)",
        "Set up gift card denominations ($25, $50, $100, custom amounts)",
        "Configure gift card validity periods (1-2 years recommended)",
        "Set up automated gift card delivery via email/SMS",
        "Create gift card terms and conditions"
      ],
      time: "30 mins",
      status: "setup"
    },
    {
      id: "step2", 
      title: "Design Gift Card Experience",
      description: "Create beautiful, branded gift cards and purchase flow",
      tasks: [
        "Design gift card templates with your branding",
        "Create seasonal and occasion-specific designs",
        "Set up personalized message options for purchasers",
        "Configure gift card preview before purchase",
        "Add gift card option to your website and booking flow"
      ],
      time: "25 mins",
      status: "design"
    },
    {
      id: "step3",
      title: "Redemption System Setup",
      description: "Ensure smooth gift card redemption at point of sale",
      tasks: [
        "Integrate gift cards with your POS system",
        "Train staff on gift card redemption process",
        "Set up gift card balance checking for customers",
        "Configure partial redemption and remaining balance tracking",
        "Create backup manual redemption process"
      ],
      time: "20 mins",
      status: "redemption"
    },
    {
      id: "step4",
      title: "Marketing & Promotion",
      description: "Drive gift card sales through strategic marketing",
      tasks: [
        "Create gift card promotion campaigns for holidays",
        "Set up gift card upsells in email marketing",
        "Add gift card CTAs to social media profiles",
        "Create gift card promotional materials for in-venue display",
        "Set up gift card affiliate/referral programs"
      ],
      time: "35 mins",
      status: "marketing"
    },
    {
      id: "step5",
      title: "Analytics & Optimization",
      description: "Track performance and optimize gift card program",
      tasks: [
        "Set up gift card sales tracking and reporting",
        "Monitor redemption rates and expiration analytics",
        "Track seasonal sales patterns and optimize pricing",
        "Analyze customer behavior post-gift card redemption",
        "Create automated follow-up campaigns for unredeemed cards"
      ],
      time: "20 mins",
      status: "analytics"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "setup": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300";
      case "design": return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300";
      case "redemption": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300";
      case "marketing": return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300";
      case "analytics": return "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900 dark:text-pink-300";
      default: return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "setup": return <Settings className="h-4 w-4" />;
      case "design": return <Gift className="h-4 w-4" />;
      case "redemption": return <CreditCard className="h-4 w-4" />;
      case "marketing": return <Target className="h-4 w-4" />;
      case "analytics": return <TrendingUp className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const markComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const getCompletionRate = () => {
    return Math.round((completedSteps.length / steps.length) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
          <Gift className="h-4 w-4" />
          Gift Cards System
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Digital Gift Cards Readiness Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Launch a profitable digital gift card program that drives revenue, increases customer retention, 
          and creates new revenue streams during slow periods.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {completedSteps.length} of {steps.length} completed
            </Badge>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            ></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {getCompletionRate() === 100 
              ? "🎁 Congratulations! Your gift card system is ready to drive revenue!" 
              : `Complete ${steps.length - completedSteps.length} more steps to be launch-ready`
            }
          </p>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Turn Every Occasion Into Revenue</h2>
          <p className="text-green-100 mb-6">
            Create a seamless digital gift card experience that captures revenue upfront, 
            attracts new customers, and keeps your business top-of-mind for special occasions.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-8 w-8" />
              </div>
              <div className="text-sm text-green-200">Instant Revenue</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Smartphone className="h-8 w-8" />
              </div>
              <div className="text-sm text-green-200">Digital Delivery</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-sm text-green-200">Customer Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <Card 
              key={step.id} 
              className={`transition-all duration-200 ${
                isCompleted ? 'ring-2 ring-green-500 ring-opacity-50 bg-green-50 dark:bg-green-900/20' : 'hover:shadow-lg'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-green-100 dark:bg-green-900' : 'bg-emerald-100 dark:bg-emerald-900'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        ) : (
                          <Gift className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Step {index + 1}: {step.title}
                        </h3>
                        <Badge className={`text-xs ${getStatusColor(step.status)}`}>
                          {getStatusIcon(step.status)}
                          <span className="ml-1 capitalize">{step.status}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {step.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tasks to Complete:</h4>
                    <div className="space-y-2">
                      {step.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => markComplete(step.id)}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                      >
                        Mark Complete
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Step Completed!</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Potential */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gift Card Revenue Impact</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Immediate Cash Flow</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Receive payment upfront, improve cash flow</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Customer Acquisition</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Gift recipients become new customers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Seasonal Boost</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Peak sales during holidays and events</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Success Message */}
      {getCompletionRate() === 100 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your Gift Card System is Live!</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                You've created a complete digital gift card program that will drive immediate revenue, 
                attract new customers, and provide a seamless experience from purchase to redemption.
              </p>
              <div className="pt-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-lg px-4 py-2">
                  🎁 Gift Cards Launch Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}