import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Calendar,
  Users,
  Phone,
  Settings,
  Target,
  ArrowRight,
  AlertCircle,
  Clock
} from "lucide-react";

export default function BookingsGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: "step1",
      title: "Confirm Bookings Are Coming In",
      description: "Ensure your booking system is receiving and processing reservations",
      tasks: [
        "Ensure at least 10 online bookings have been received",
        "Check that walk-ins are being logged correctly",
        "Verify booking confirmations are being sent automatically"
      ],
      time: "15 mins",
      status: "essential"
    },
    {
      id: "step2", 
      title: "Front of House - Booking Process",
      description: "Train your team on the booking workflow for calls and walk-ins",
      tasks: [
        "Open Bookings Dashboard",
        "Select date, time, guest count, preferences",
        "Enter guest details (name, phone, email)",
        "Add any notes (e.g. birthday, booth request)",
        "Confirm the booking and auto-send confirmation"
      ],
      time: "20 mins",
      status: "critical"
    },
    {
      id: "step3",
      title: "FOH Daily Booking Tasks",
      description: "Practice essential daily operations your team needs to master",
      tasks: [
        "Log 5 walk-in bookings",
        "Handle 4 enquiries (including deposit links)",
        "Edit a booking (time or guest count)",
        "Cancel or no-show a booking",
        "Assign a table manually or via drag-and-drop",
        "Add a note to a live booking",
        "Add a new customer from a booking"
      ],
      time: "30 mins",
      status: "practice"
    },
    {
      id: "step4",
      title: "Handling Enquiries",
      description: "Master the enquiry-to-booking conversion process",
      tasks: [
        "Review details from the enquiry form",
        "Add the booking manually if required",
        'Send deposit link via email/SMS: "To confirm your booking, please follow the link to pay your deposit. See you soon!"',
        "Once paid, the booking is auto-confirmed"
      ],
      time: "15 mins",
      status: "conversion"
    },
    {
      id: "step5",
      title: "Admin/Manager Booking Setup",
      description: "Complete administrative configuration and testing",
      tasks: [
        "Test the full guest journey (create 10 bookings)",
        "Edit table layouts and availability",
        "Add new booking types (e.g. Bottomless Brunch)",
        "Set availability rules (e.g. only on weekends)",
        "Create a 'Special Day' (e.g. Valentine's Day)",
        "Update staff notifications",
        "Review booking reports by day, week, or source"
      ],
      time: "45 mins",
      status: "setup"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "essential": return "bg-red-100 text-red-800 border-red-200";
      case "critical": return "bg-blue-100 text-blue-800 border-blue-200";
      case "practice": return "bg-green-100 text-green-800 border-green-200";
      case "conversion": return "bg-purple-100 text-purple-800 border-purple-200";
      case "setup": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "essential": return <AlertCircle className="h-4 w-4" />;
      case "critical": return <Users className="h-4 w-4" />;
      case "practice": return <Target className="h-4 w-4" />;
      case "conversion": return <Phone className="h-4 w-4" />;
      case "setup": return <Settings className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          <Calendar className="h-4 w-4" />
          Bookings Readiness
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Bookings Go-Live Readiness Guide
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          This guide ensures your team is confident handling walk-ins, enquiries, and online bookings 
          before your official launch. Complete each step to master your booking system.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
            <Badge className="bg-blue-100 text-blue-800">
              {completedSteps.length} of {steps.length} completed
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            ></div>
          </div>
          <p className="text-gray-600">
            {getCompletionRate() === 100 
              ? "🎉 Congratulations! You're ready to launch bookings!" 
              : `Complete ${steps.length - completedSteps.length} more steps to be launch-ready`
            }
          </p>
        </CardContent>
      </Card>

      {/* Hero Image */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Modern Table Management</h2>
          <p className="text-blue-100 mb-6">
            Tap into the power of personalised and intelligent table reservations, 
            creating a seamless customer experience with modern software your team will love.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">10+</div>
              <div className="text-blue-200 text-sm">Test Bookings</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5</div>
              <div className="text-blue-200 text-sm">Training Steps</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-blue-200 text-sm">Team Ready</div>
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
                        isCompleted ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <Calendar className="h-6 w-6 text-blue-600" />
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
                        className="bg-blue-600 hover:bg-blue-700"
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

      {/* Final Success Message */}
      {getCompletionRate() === 100 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">You're Ready to Launch Bookings!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your system is tested, your team is trained, and guests can book with confidence. 
                Your booking system is now live and ready for customers.
              </p>
              <div className="pt-4">
                <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                  🎉 Bookings Launch Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 mb-4">
            Check the Table Bookings section in our Knowledge Base for detailed setup guides and troubleshooting tips.
          </p>
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            View Knowledge Base
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}