import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Wifi,
  Shield,
  Users,
  Settings,
  Target,
  ArrowRight,
  TrendingUp,
  Clock,
  Smartphone
} from "lucide-react";

/**
 * WiFi Setup Guide Component
 * Helps users configure guest WiFi with marketing capture
 * Tracks completion of WiFi setup and integration tasks
 */
export default function WiFiGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: "step1",
      title: "Configure Guest WiFi Network",
      description: "Set up secure, branded guest WiFi with proper access controls",
      tasks: [
        "Create separate guest network (avoid using main business network)",
        "Set up strong but guest-friendly network name (e.g., 'YourRestaurant-Guest')",
        "Configure appropriate bandwidth limits for guests",
        "Set up network isolation to protect business systems",
        "Enable guest network scheduling (auto-enable during business hours)"
      ],
      time: "20 mins",
      status: "network"
    },
    {
      id: "step2", 
      title: "Customer Data Capture Setup",
      description: "Create branded WiFi portal that captures valuable customer information",
      tasks: [
        "Design branded WiFi login page with your logo and colors",
        "Set up customer data collection form (name, email, phone)",
        "Configure social media login options (Google, Facebook, Apple)",
        "Add terms of service and privacy policy agreements",
        "Set up marketing opt-in checkboxes with clear value propositions"
      ],
      time: "30 mins",
      status: "capture"
    },
    {
      id: "step3",
      title: "Marketing Integration",
      description: "Connect WiFi signups to your marketing and customer database",
      tasks: [
        "Integrate WiFi portal with your email marketing platform",
        "Set up automatic welcome email sequences for new WiFi users",
        "Configure customer segmentation based on WiFi signup data",
        "Add WiFi users to your loyalty program automatically",
        "Set up location-based customer tagging for targeted campaigns"
      ],
      time: "25 mins",
      status: "integration"
    },
    {
      id: "step4",
      title: "Access Control & Security",
      description: "Implement secure access controls and usage policies",
      tasks: [
        "Set up time-based access limits (e.g., 2-hour sessions)",
        "Configure content filtering to block inappropriate sites",
        "Set up automatic logout after inactivity periods",
        "Create staff override codes for extended access",
        "Implement device limits per user to prevent abuse"
      ],
      time: "15 mins",
      status: "security"
    },
    {
      id: "step5",
      title: "Analytics & Optimization",
      description: "Monitor WiFi usage and optimize for customer engagement",
      tasks: [
        "Set up WiFi usage analytics and reporting dashboards",
        "Track customer return rates and engagement patterns",
        "Monitor peak usage times and adjust bandwidth accordingly",
        "Analyze signup conversion rates and optimize portal design",
        "Create automated reports for marketing team review"
      ],
      time: "20 mins",
      status: "analytics"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "network": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300";
      case "capture": return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300";
      case "integration": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300";
      case "security": return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300";
      case "analytics": return "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900 dark:text-pink-300";
      default: return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "network": return <Wifi className="h-4 w-4" />;
      case "capture": return <Users className="h-4 w-4" />;
      case "integration": return <Target className="h-4 w-4" />;
      case "security": return <Shield className="h-4 w-4" />;
      case "analytics": return <TrendingUp className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
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
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
          <Wifi className="h-4 w-4" />
          WiFi Marketing Setup
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Smart WiFi Marketing Readiness Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Transform your guest WiFi into a powerful customer acquisition tool. Capture valuable customer data 
          while providing excellent connectivity that enhances the customer experience.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {completedSteps.length} of {steps.length} completed
            </Badge>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            ></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {getCompletionRate() === 100 
              ? "📶 Congratulations! Your smart WiFi marketing system is ready!" 
              : `Complete ${steps.length - completedSteps.length} more steps to be launch-ready`
            }
          </p>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Turn WiFi Access Into Marketing Gold</h2>
          <p className="text-blue-100 mb-6">
            Every customer who connects to your WiFi becomes a marketing opportunity. Build a system that 
            captures leads, grows your database, and creates lasting customer relationships.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-sm text-blue-200">Customer Data</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8" />
              </div>
              <div className="text-sm text-blue-200">Secure Access</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-sm text-blue-200">Marketing Growth</div>
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
                isCompleted ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50 dark:bg-blue-900/20' : 'hover:shadow-lg'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-blue-100 dark:bg-blue-900' : 'bg-cyan-100 dark:bg-cyan-900'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Wifi className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
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
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => markComplete(step.id)}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Mark Complete
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
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

      {/* WiFi Benefits */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">WiFi Marketing Benefits</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Customer Database Growth</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Build email and SMS lists automatically</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Smartphone className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Enhanced Experience</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Provide excellent connectivity for guests</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Marketing Automation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Trigger campaigns based on visit patterns</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Success Message */}
      {getCompletionRate() === 100 && (
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <Wifi className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your Smart WiFi System is Live!</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                You've created a powerful WiFi marketing system that captures customer data, enhances their experience, 
                and automatically grows your marketing database with every connection.
              </p>
              <div className="pt-4">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-lg px-4 py-2">
                  📶 WiFi Marketing Launch Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}