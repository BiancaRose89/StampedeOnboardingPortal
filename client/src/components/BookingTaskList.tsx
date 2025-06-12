import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Phone,
  CreditCard,
  Settings,
  BarChart3,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

interface BookingTask {
  id: string;
  title: string;
  description: string;
  category: 'confirmation' | 'foh-process' | 'daily-tasks' | 'enquiries' | 'admin-setup';
  completed: boolean;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
  image?: string;
}

interface BookingTaskListProps {
  venueName: string;
  onBack: () => void;
}

export default function BookingTaskList({ venueName, onBack }: BookingTaskListProps) {
  const [tasks, setTasks] = useState<BookingTask[]>([
    // Step 1: Confirm Bookings Are Coming In
    {
      id: 'confirm-online-bookings',
      title: 'Ensure at least 10 online bookings have been received',
      description: 'Verify that the online booking system is functioning and receiving reservations',
      category: 'confirmation',
      completed: false,
      estimatedTime: '5 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Mask%20group%20(3)-1.png'
    },
    {
      id: 'check-walkins',
      title: 'Check that walk-ins are being logged correctly',
      description: 'Confirm walk-in customers are properly recorded in the system',
      category: 'confirmation',
      completed: false,
      estimatedTime: '3 min',
      priority: 'high'
    },

    // Step 2: Front of House – Booking Process
    {
      id: 'open-booking-dashboard',
      title: 'Open Bookings Dashboard',
      description: 'Access the main booking interface for managing reservations',
      category: 'foh-process',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Screenshot%202025-03-31%20at%2015.02.45.png'
    },
    {
      id: 'select-booking-details',
      title: 'Select date, time, guest count, preferences',
      description: 'Practice selecting booking parameters for new reservations',
      category: 'foh-process',
      completed: false,
      estimatedTime: '2 min',
      priority: 'high'
    },
    {
      id: 'enter-guest-details',
      title: 'Enter guest details (name, phone, email)',
      description: 'Input customer contact information accurately',
      category: 'foh-process',
      completed: false,
      estimatedTime: '2 min',
      priority: 'high'
    },
    {
      id: 'add-booking-notes',
      title: 'Add any notes (e.g. birthday, booth request)',
      description: 'Include special requests or important customer information',
      category: 'foh-process',
      completed: false,
      estimatedTime: '1 min',
      priority: 'medium'
    },
    {
      id: 'confirm-auto-send',
      title: 'Confirm booking and auto-send confirmation',
      description: 'Complete booking and verify confirmation email is sent automatically',
      category: 'foh-process',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high'
    },

    // Step 3: FOH Daily Booking Tasks
    {
      id: 'log-walkin-bookings',
      title: 'Log 5 walk-in bookings',
      description: 'Practice recording walk-in customers in the system',
      category: 'daily-tasks',
      completed: false,
      estimatedTime: '10 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Mask%20group-1.png'
    },
    {
      id: 'handle-enquiries',
      title: 'Handle 4 enquiries (including deposit links)',
      description: 'Process customer inquiries and send deposit payment links',
      category: 'daily-tasks',
      completed: false,
      estimatedTime: '15 min',
      priority: 'high'
    },
    {
      id: 'edit-booking',
      title: 'Edit a booking (time or guest count)',
      description: 'Practice modifying existing reservations',
      category: 'daily-tasks',
      completed: false,
      estimatedTime: '3 min',
      priority: 'medium'
    },
    {
      id: 'cancel-noshow',
      title: 'Cancel or no-show a booking',
      description: 'Learn how to handle cancellations and no-shows',
      category: 'daily-tasks',
      completed: false,
      estimatedTime: '2 min',
      priority: 'medium'
    },
    {
      id: 'assign-table',
      title: 'Assign a table manually or via drag-and-drop',
      description: 'Practice table assignment using the booking interface',
      category: 'daily-tasks',
      completed: false,
      estimatedTime: '3 min',
      priority: 'medium'
    },
    {
      id: 'add-live-note',
      title: 'Add a note to a live booking',
      description: 'Update existing reservations with additional information',
      category: 'daily-tasks',
      completed: false,
      estimatedTime: '2 min',
      priority: 'low'
    },
    {
      id: 'add-new-customer',
      title: 'Add a new customer from a booking',
      description: 'Create new customer profiles from reservation data',
      category: 'daily-tasks',
      completed: false,
      estimatedTime: '3 min',
      priority: 'medium'
    },

    // Step 4: Handling Enquiries
    {
      id: 'review-enquiry-details',
      title: 'Review details from the enquiry form',
      description: 'Check and process information from customer enquiry submissions',
      category: 'enquiries',
      completed: false,
      estimatedTime: '2 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/digital%20menu%20v1.png'
    },
    {
      id: 'manual-booking-add',
      title: 'Add the booking manually if required',
      description: 'Create reservations manually for complex enquiries',
      category: 'enquiries',
      completed: false,
      estimatedTime: '3 min',
      priority: 'medium'
    },
    {
      id: 'send-deposit-link',
      title: 'Send deposit link via email/SMS',
      description: 'Send payment links using suggested message template',
      category: 'enquiries',
      completed: false,
      estimatedTime: '2 min',
      priority: 'high'
    },
    {
      id: 'auto-confirm-payment',
      title: 'Verify auto-confirmation after payment',
      description: 'Ensure bookings are automatically confirmed when deposits are paid',
      category: 'enquiries',
      completed: false,
      estimatedTime: '1 min',
      priority: 'high'
    },

    // Step 5: Admin/Manager Booking Setup
    {
      id: 'test-guest-journey',
      title: 'Test the full guest journey (create 10 bookings)',
      description: 'Complete end-to-end testing of the booking process',
      category: 'admin-setup',
      completed: false,
      estimatedTime: '30 min',
      priority: 'high',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Screenshot%202025-04-04%20at%2014.39.58.png'
    },
    {
      id: 'edit-table-layouts',
      title: 'Edit table layouts and availability',
      description: 'Configure venue layout and table availability settings',
      category: 'admin-setup',
      completed: false,
      estimatedTime: '15 min',
      priority: 'medium'
    },
    {
      id: 'add-booking-types',
      title: 'Add new booking types (e.g. Bottomless Brunch)',
      description: 'Create special booking categories for different services',
      category: 'admin-setup',
      completed: false,
      estimatedTime: '10 min',
      priority: 'medium'
    },
    {
      id: 'set-availability-rules',
      title: 'Set availability rules (e.g. only on weekends)',
      description: 'Configure when different booking types are available',
      category: 'admin-setup',
      completed: false,
      estimatedTime: '8 min',
      priority: 'medium'
    },
    {
      id: 'create-special-day',
      title: 'Create a Special Day (e.g. Valentine\'s Day)',
      description: 'Set up special event bookings with unique rules',
      category: 'admin-setup',
      completed: false,
      estimatedTime: '10 min',
      priority: 'low'
    },
    {
      id: 'update-staff-notifications',
      title: 'Update staff notifications',
      description: 'Configure alerts and notifications for booking events',
      category: 'admin-setup',
      completed: false,
      estimatedTime: '5 min',
      priority: 'medium'
    },
    {
      id: 'review-booking-reports',
      title: 'Review booking reports by day, week, or source',
      description: 'Access and understand booking analytics and reporting',
      category: 'admin-setup',
      completed: false,
      estimatedTime: '10 min',
      priority: 'low'
    }
  ]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'confirmation': return <CheckCircle className="h-4 w-4" />;
      case 'foh-process': return <Users className="h-4 w-4" />;
      case 'daily-tasks': return <Calendar className="h-4 w-4" />;
      case 'enquiries': return <Phone className="h-4 w-4" />;
      case 'admin-setup': return <Settings className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'confirmation': return 'Step 1: Confirm Bookings Are Coming In';
      case 'foh-process': return 'Step 2: Front of House – Booking Process';
      case 'daily-tasks': return 'Step 3: FOH Daily Booking Tasks';
      case 'enquiries': return 'Step 4: Handling Enquiries';
      case 'admin-setup': return 'Step 5: Admin/Manager Booking Setup';
      default: return category;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const categories = ['confirmation', 'foh-process', 'daily-tasks', 'enquiries', 'admin-setup'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#FF389A] hover:bg-[#FF389A]/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {venueName} Tasks
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Bookings Go-Live Readiness</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          This guide ensures your team is confident handling walk-ins, enquiries, and online bookings before your official launch.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-black border-[#FF389A]/20">
        <CardHeader>
          <CardTitle className="text-white">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Tasks Completed</span>
              <span className="text-white">{completedTasks}/{totalTasks}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-gray-400 text-center">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Task Categories */}
      {categories.map((category) => {
        const categoryTasks = tasks.filter(task => task.category === category);
        const categoryCompleted = categoryTasks.filter(task => task.completed).length;
        const categoryProgress = (categoryCompleted / categoryTasks.length) * 100;

        return (
          <Card key={category} className="bg-black border-[#FF389A]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(category)}
                  <CardTitle className="text-white">{getCategoryTitle(category)}</CardTitle>
                </div>
                <Badge variant="outline" className="border-[#FF389A] text-[#FF389A]">
                  {categoryCompleted}/{categoryTasks.length}
                </Badge>
              </div>
              <Progress value={categoryProgress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      task.completed 
                        ? 'border-green-500/30 bg-green-500/10' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-medium ${task.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                              {task.title}
                            </h4>
                            <p className="text-gray-300 text-sm mt-1">{task.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge className={getPriorityColor(task.priority)} variant="secondary">
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.estimatedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Ready to Launch Message */}
      {progressPercentage === 100 && (
        <Card className="bg-gradient-to-r from-green-900/50 to-[#FF389A]/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              You're Ready to Launch Bookings!
            </h3>
            <p className="text-gray-300 mb-4">
              Your system is tested, your team is trained, and guests can book with confidence.
            </p>
            <Button 
              variant="outline" 
              className="border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
              onClick={() => window.open('https://help.stampede.ai/hc/en-gb/categories/25679514018450-Table-Bookings', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Check Knowledge Base for More Help
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}