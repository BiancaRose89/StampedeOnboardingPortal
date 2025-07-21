import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Star,
  MessageSquare,
  ThumbsUp,
  Settings,
  Target,
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";

/**
 * Reviews Guide Component
 * Helps users set up and manage customer review systems
 * Tracks completion of review management tasks
 */
export default function ReviewsGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: "step1",
      title: "Set Up Review Collection",
      description: "Configure automated review requests and collection points",
      tasks: [
        "Connect your Google Business Profile for review management",
        "Set up automated email review requests post-visit",
        "Create QR codes for tables linking to review platforms",
        "Configure review request timing (24-48 hours after visit)",
        "Set up SMS review requests for mobile customers"
      ],
      time: "25 mins",
      status: "setup"
    },
    {
      id: "step2", 
      title: "Design Review Templates",
      description: "Create compelling review request messages that get responses",
      tasks: [
        "Write personalized review request email templates",
        "Create SMS review request messages under 160 characters",
        "Design review landing pages with your branding",
        "Set up thank you messages for customers who leave reviews",
        "Create follow-up sequences for non-responders"
      ],
      time: "30 mins",
      status: "content"
    },
    {
      id: "step3",
      title: "Monitor Review Platforms",
      description: "Track reviews across multiple platforms and respond appropriately",
      tasks: [
        "Set up monitoring for Google, Yelp, TripAdvisor, and Facebook",
        "Configure review alerts for immediate notification",
        "Create response templates for positive reviews",
        "Develop resolution scripts for negative feedback",
        "Set up weekly review performance reports"
      ],
      time: "20 mins",
      status: "monitoring"
    },
    {
      id: "step4",
      title: "Response Management",
      description: "Establish protocols for responding to all types of reviews",
      tasks: [
        "Train staff on professional review response guidelines",
        "Create escalation procedures for negative reviews",
        "Set response time targets (within 24 hours)",
        "Develop templates for common review scenarios",
        "Implement review response approval workflows"
      ],
      time: "35 mins",
      status: "management"
    },
    {
      id: "step5",
      title: "Leverage Positive Reviews",
      description: "Use great reviews to drive more business and build reputation",
      tasks: [
        "Set up automatic sharing of 5-star reviews on social media",
        "Create review highlight reels for website and marketing",
        "Add review widgets to your website and booking pages",
        "Use positive reviews in email marketing campaigns",
        "Display customer testimonials prominently in-venue"
      ],
      time: "25 mins",
      status: "leverage"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "setup": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300";
      case "content": return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300";
      case "monitoring": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300";
      case "management": return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300";
      case "leverage": return "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900 dark:text-pink-300";
      default: return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "setup": return <Settings className="h-4 w-4" />;
      case "content": return <MessageSquare className="h-4 w-4" />;
      case "monitoring": return <Target className="h-4 w-4" />;
      case "management": return <ThumbsUp className="h-4 w-4" />;
      case "leverage": return <TrendingUp className="h-4 w-4" />;
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
        <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium">
          <Star className="h-4 w-4" />
          Reviews Management
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Customer Reviews Readiness Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Build a stellar online reputation with systematic review collection, monitoring, and response management. 
          Turn happy customers into powerful advocates for your business.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
              {completedSteps.length} of {steps.length} completed
            </Badge>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-yellow-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            ></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {getCompletionRate() === 100 
              ? "🌟 Congratulations! Your review management system is ready!" 
              : `Complete ${steps.length - completedSteps.length} more steps to be launch-ready`
            }
          </p>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Turn Every Customer Into Your Marketing Team</h2>
          <p className="text-yellow-100 mb-6">
            Build an automated system that consistently collects, monitors, and leverages customer reviews 
            to drive more business and build unshakeable trust with potential customers.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8" />
              </div>
              <div className="text-sm text-yellow-200">5-Star Reviews</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="h-8 w-8" />
              </div>
              <div className="text-sm text-yellow-200">Smart Responses</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-sm text-yellow-200">Reputation Growth</div>
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
                isCompleted ? 'ring-2 ring-yellow-500 ring-opacity-50 bg-yellow-50 dark:bg-yellow-900/20' : 'hover:shadow-lg'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-orange-100 dark:bg-orange-900'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <Star className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
                          <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => markComplete(step.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                      >
                        Mark Complete
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
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

      {/* Final Success Message */}
      {getCompletionRate() === 100 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your Review System is Ready!</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                You've built a comprehensive review management system that will consistently gather positive feedback, 
                address concerns professionally, and leverage social proof to drive more business.
              </p>
              <div className="pt-4">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-lg px-4 py-2">
                  🌟 Review Management Launch Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}