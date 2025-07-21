import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Mail,
  Users,
  Send,
  Settings,
  Target,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react";

export default function MarketingGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: "step1",
      title: "Create Customer Segments",
      description: "Build relevant audiences based on your customer data for targeted campaigns",
      tasks: [
        "Go to Marketing > Audiences > Segments",
        "Click Create New Segment",
        "Create 'Newsletter Subscribers' - Filter by tag: newsletter",
        "Create 'Frequent Visitors' - Filter by visit count or loyalty tier",
        "Create 'WiFi Signups This Month' - Filter by signup date or campaign source",
        "Clearly name each segment and check contact counts"
      ],
      time: "20 mins",
      status: "targeting"
    },
    {
      id: "step2", 
      title: "Build Email Campaigns",
      description: "Set up and customize your email communications with branded content",
      tasks: [
        "Go to Marketing > Campaigns > Create New Campaign",
        "Choose your campaign type (standard or promotional)",
        "Add subject line, preview text, and branded email content",
        "Include call-to-action buttons, links, and images",
        "Choose your target segment and send schedule",
        "Review for typos, mobile responsiveness, and spam triggers"
      ],
      time: "30 mins",
      status: "content"
    },
    {
      id: "step3",
      title: "Send a Test Campaign",
      description: "Always test your campaigns before launching to ensure quality",
      tasks: [
        "Duplicate a campaign and create a small test segment (your email + team)",
        "Send test campaign to your team",
        "Verify it lands in inbox (not spam)",
        "Check branding and formatting look correct",
        "Ensure all links work properly",
        "Confirm reporting shows opens and clicks correctly"
      ],
      time: "15 mins",
      status: "testing"
    },
    {
      id: "step4",
      title: "Set Up Automated Campaign",
      description: "Create automated workflows to maximize customer engagement",
      tasks: [
        "Go to Marketing > Automation > Create Automation",
        "Choose a trigger (joins WiFi list, birthday, hasn't visited)",
        "Build the email content and set appropriate delay",
        "Apply to a specific customer segment",
        "Activate the automation workflow",
        "Test the complete automation sequence"
      ],
      time: "25 mins",
      status: "automation"
    },
    {
      id: "step5",
      title: "Final Marketing Checks",
      description: "Complete pre-launch verification and team preparation",
      tasks: [
        "Verify email domain is authenticated and working",
        "Confirm all campaigns are branded consistently",
        "Ensure tracking is enabled for opens and clicks",
        "Check all links lead to correct destinations",
        "Verify reply-to emails are monitored by your team",
        "Review campaign schedules and automation timing"
      ],
      time: "15 mins",
      status: "launch"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "targeting": return "bg-blue-100 text-blue-800 border-blue-200";
      case "content": return "bg-purple-100 text-purple-800 border-purple-200";
      case "testing": return "bg-orange-100 text-orange-800 border-orange-200";
      case "automation": return "bg-green-100 text-green-800 border-green-200";
      case "launch": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "targeting": return <Target className="h-4 w-4" />;
      case "content": return <Mail className="h-4 w-4" />;
      case "testing": return <Settings className="h-4 w-4" />;
      case "automation": return <Zap className="h-4 w-4" />;
      case "launch": return <Send className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
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
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
          <Mail className="h-4 w-4" />
          Marketing Readiness
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Marketing Go-Live Readiness Guide
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Here's everything you need to action before going live with Stampede Marketing. 
          This checklist ensures your campaigns are targeted, tested, and ready to engage your customers.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
            <Badge className="bg-purple-100 text-purple-800">
              {completedSteps.length} of {steps.length} completed
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            ></div>
          </div>
          <p className="text-gray-600">
            {getCompletionRate() === 100 
              ? "🎉 Congratulations! Your marketing system is ready to drive engagement!" 
              : `Complete ${steps.length - completedSteps.length} more steps to be launch-ready`
            }
          </p>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">The Only Vertically Integrated CRM for Hospitality</h2>
          <p className="text-purple-100 mb-6">
            Operators gain an unfair advantage when it comes to customer retention thanks to meaningful 
            segmentation, interaction-based automation and beautifully designed emails.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-sm text-purple-200">Smart Segmentation</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-8 w-8" />
              </div>
              <div className="text-sm text-purple-200">Automation</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-sm text-purple-200">Growth Analytics</div>
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
                isCompleted ? 'ring-2 ring-purple-500 ring-opacity-50 bg-purple-50' : 'hover:shadow-lg'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-purple-100' : 'bg-pink-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-purple-600" />
                        ) : (
                          <Mail className="h-6 w-6 text-pink-600" />
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
                    <h4 className="font-semibold text-gray-900 mb-3">Tasks to Complete:</h4>
                    <div className="space-y-2">
                      {step.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => markComplete(step.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Mark Complete
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-purple-800">
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

      {/* Success Metrics */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Success Indicators</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Segments Created</h4>
              <p className="text-sm text-gray-600">Build targeted audiences for better engagement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Automation Live</h4>
              <p className="text-sm text-gray-600">Automated campaigns driving consistent engagement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Performance Tracking</h4>
              <p className="text-sm text-gray-600">Monitor opens, clicks, and conversions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Success Message */}
      {getCompletionRate() === 100 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">You're Ready to Launch Marketing!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your email domain is verified, campaigns are branded, segments are set up and clean, 
                and campaigns are tested, scheduled, or automated. Your marketing system is live 
                and ready to drive engagement!
              </p>
              <div className="pt-4">
                <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
                  🎉 Marketing Launch Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Need Help?</h3>
          <p className="text-purple-800 mb-4">
            Check the Marketing section in our Knowledge Base for detailed setup guides and troubleshooting tips.
          </p>
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
            View Knowledge Base
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}