import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Star,
  Gift,
  Smartphone,
  Settings,
  Target,
  ArrowRight,
  TrendingUp,
  Users
} from "lucide-react";

export default function LoyaltyGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: "step1",
      title: "Access Your Loyalty Scheme",
      description: "Navigate and familiarize yourself with your pre-configured loyalty dashboard",
      tasks: [
        "Navigate to Loyalty in your Stampede dashboard",
        "Click on your Loyalty Card to access your pre-configured scheme",
        "Explore the Dashboard and review the pre-built Sign-Up Form",
        "Familiarise yourself with tabs for Automations, Rewards, and Interactions",
        "Understand the setup flow: points → rewards → sign-ups → monitoring"
      ],
      time: "10 mins",
      status: "setup"
    },
    {
      id: "step2", 
      title: "Create Your Rewards",
      description: "Design appealing rewards that provide real value to your customers",
      tasks: [
        "Determine the number of points required for each reward",
        "Ensure rewards are achievable and valuable to customers",
        "Go to Loyalty > Rewards > Create New Reward",
        "Input reward details: name, description, and point cost",
        "Upload relevant images and set availability parameters",
        "Examples: free items, discounts, exclusive access"
      ],
      time: "25 mins",
      status: "rewards"
    },
    {
      id: "step3",
      title: "Configure Loyalty Automations",
      description: "Set up automated point allocation for customer actions",
      tasks: [
        "Navigate to Loyalty > Automations > Create Automation",
        "Set triggers: Wi-Fi logins, bookings, or purchases", 
        "Define the number of points awarded per action",
        "Test automations to ensure points are correctly awarded",
        "Monitor the Interactions tab to verify automation performance"
      ],
      time: "20 mins",
      status: "automation"
    },
    {
      id: "step4",
      title: "Enable Customer Sign-Ups",
      description: "Launch sign-up opportunities across all customer touchpoints",
      tasks: [
        "Share the loyalty sign-up link via email, SMS, and social media",
        "Display QR codes in your venue for easy access",
        "Train staff to inform customers about the loyalty program",
        "Set up digital wallet integration (Apple/Google Wallets)",
        "Test the complete customer sign-up journey"
      ],
      time: "30 mins",
      status: "launch"
    },
    {
      id: "step5",
      title: "Monitor and Optimize Engagement",
      description: "Track performance and refine your loyalty strategy",
      tasks: [
        "Use the Loyalty Dashboard to monitor sign-ups and redemptions",
        "Identify popular rewards and customer engagement trends",
        "Track point accruals and reward redemption patterns",
        "Adjust strategies based on data insights",
        "Consider seasonal promotions or limited-time offers",
        "Plan ongoing engagement campaigns"
      ],
      time: "Ongoing",
      status: "optimize"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "setup": return "bg-blue-100 text-blue-800 border-blue-200";
      case "rewards": return "bg-purple-100 text-purple-800 border-purple-200";
      case "automation": return "bg-green-100 text-green-800 border-green-200";
      case "launch": return "bg-orange-100 text-orange-800 border-orange-200";
      case "optimize": return "bg-pink-100 text-pink-800 border-pink-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "setup": return <Settings className="h-4 w-4" />;
      case "rewards": return <Gift className="h-4 w-4" />;
      case "automation": return <Target className="h-4 w-4" />;
      case "launch": return <Users className="h-4 w-4" />;
      case "optimize": return <TrendingUp className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
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
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <Star className="h-4 w-4" />
          Loyalty Readiness
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Loyalty Go-Live Readiness Guide
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Ensure your Stampede Loyalty program is fully set up and ready to reward your customers. 
          This guide walks you through the essential steps to launch a successful loyalty scheme.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
            <Badge className="bg-green-100 text-green-800">
              {completedSteps.length} of {steps.length} completed
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            ></div>
          </div>
          <p className="text-gray-600">
            {getCompletionRate() === 100 
              ? "🎉 Congratulations! Your loyalty program is ready to launch!" 
              : `Complete ${steps.length - completedSteps.length} more steps to be launch-ready`
            }
          </p>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Effortless, App-Free Customer Loyalty</h2>
          <p className="text-green-100 mb-6">
            A ground-breaking new loyalty points and rewards platform. Stampede makes it easy for 
            hospitality businesses of all sizes to create a loyalty program that does all the heavy lifting.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Smartphone className="h-8 w-8" />
              </div>
              <div className="text-sm text-green-200">Digital Wallet Ready</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Gift className="h-8 w-8" />
              </div>
              <div className="text-sm text-green-200">Automated Rewards</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-sm text-green-200">Smart Analytics</div>
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
                isCompleted ? 'ring-2 ring-green-500 ring-opacity-50 bg-green-50' : 'hover:shadow-lg'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <Star className="h-6 w-6 text-purple-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Step {index + 1}: {step.title}
                        </h3>
                        <Badge className={`text-xs ${getStatusColor(step.status)}`}>
                          {getStatusIcon(step.status)}
                          <span className="ml-1 capitalize">{step.status}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
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
                    <h4 className="font-semibold text-gray-900 mb-3">Tasks to Complete:</h4>
                    <div className="space-y-2">
                      {step.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => markComplete(step.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Complete
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800">
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

      {/* Final Checklist */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Final Checks Before Launch</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">All rewards correctly set up with clear descriptions</span>
              </div>
              <div className="flex items-center gap-2 text-purple-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Automations tested and functioning</span>
              </div>
              <div className="flex items-center gap-2 text-purple-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Sign-up processes seamless across touchpoints</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Staff trained to promote the program</span>
              </div>
              <div className="flex items-center gap-2 text-purple-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Marketing materials prepared for launch</span>
              </div>
              <div className="flex items-center gap-2 text-purple-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Digital wallet integration enabled</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Success Message */}
      {getCompletionRate() === 100 && (
        <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Your Loyalty Program is Ready!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                With your Stampede Loyalty program configured and tested, you're set to enhance customer 
                retention and drive repeat business. Monitor performance regularly and adapt your strategies 
                to maintain engagement and maximize success.
              </p>
              <div className="pt-4">
                <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                  🎉 Loyalty Program Launch Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Need Help?</h3>
          <p className="text-green-800 mb-4">
            Check the Loyalty section in our Knowledge Base for detailed setup guides and troubleshooting tips.
          </p>
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
            View Knowledge Base
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}