import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/components/AuthProvider';
import { 
  User, 
  Building2, 
  Edit3, 
  Check, 
  X,
  Plus,
  Trash2,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Bell,
  Target,
  Users as UsersIcon,
  Wifi,
  CalendarDays,
  Star,
  Gift,
  BarChart3,
  Rocket
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogTitle, 
  DialogHeader, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Venue {
  id: string;
  name: string;
  isEditing: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  email?: string;
  tasksOutstanding: number;
}

interface OnboardingTask {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  status: 'not-started' | 'in-progress' | 'completed';
  assignedTo?: string;
  dueDate?: string;
  venueId: string;
}

const TASK_TEMPLATES = [
  { 
    name: 'Account Setup', 
    description: 'Complete basic account configuration and business details',
    estimatedTime: '15 min',
    icon: User
  },
  { 
    name: 'Marketing Setup', 
    description: 'Configure marketing preferences and promotional campaigns',
    estimatedTime: '20 min',
    icon: Target
  },
  { 
    name: 'Wi-Fi Configuration', 
    description: 'Set up customer Wi-Fi access and portal customization',
    estimatedTime: '10 min',
    icon: Wifi
  },
  { 
    name: 'Booking System', 
    description: 'Configure appointment booking and scheduling features',
    estimatedTime: '25 min',
    icon: CalendarDays
  },
  { 
    name: 'Reviews Management', 
    description: 'Set up review collection and response management',
    estimatedTime: '15 min',
    icon: Star
  },
  { 
    name: 'Loyalty Program', 
    description: 'Configure customer loyalty rewards and point system',
    estimatedTime: '20 min',
    icon: Gift
  },
  { 
    name: 'Gift Cards Setup', 
    description: 'Enable digital gift card sales and management',
    estimatedTime: '10 min',
    icon: Gift
  },
  { 
    name: 'Analytics Configuration', 
    description: 'Set up reporting dashboards and key metrics tracking',
    estimatedTime: '15 min',
    icon: BarChart3
  },
  { 
    name: 'Launch Preparation', 
    description: 'Final review and go-live checklist completion',
    estimatedTime: '30 min',
    icon: Rocket
  }
];

export default function MultiVenueOnboarding() {
  const { firebaseUser, dbUser } = useAuth();
  const [userName, setUserName] = useState(dbUser?.name || '');
  const [venueCount, setVenueCount] = useState<number | ''>('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 'tm1', name: 'Bianca', tasksOutstanding: 4 },
    { id: 'tm2', name: 'Asm', tasksOutstanding: 10 }
  ]);
  const [tasks, setTasks] = useState<OnboardingTask[]>([]);
  const [activeVenue, setActiveVenue] = useState<string>('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [showOnboardingOverview, setShowOnboardingOverview] = useState(true);
  const [goLiveDate, setGoLiveDate] = useState('');
  const [newTeamMemberName, setNewTeamMemberName] = useState('');
  const [newTeamMemberEmail, setNewTeamMemberEmail] = useState('');

  // Hide the entire form for logged-out users
  if (!firebaseUser) {
    return null;
  }

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !venueCount || venueCount < 1) return;

    const newVenues: Venue[] = Array.from({ length: Number(venueCount) }, (_, index) => ({
      id: `venue-${index + 1}`,
      name: `Venue ${index + 1}`,
      isEditing: false
    }));

    const newTasks: OnboardingTask[] = [];
    newVenues.forEach(venue => {
      TASK_TEMPLATES.forEach(template => {
        newTasks.push({
          id: `${venue.id}-${template.name.toLowerCase().replace(/\s+/g, '-')}`,
          name: template.name,
          description: template.description,
          estimatedTime: template.estimatedTime,
          status: 'not-started',
          venueId: venue.id
        });
      });
    });

    setVenues(newVenues);
    setTasks(newTasks);
    setActiveVenue(newVenues[0].id);
    setIsSetupComplete(true);
  };

  const handleVenueNameEdit = (venueId: string, newName: string) => {
    if (!newName.trim()) return;
    
    setVenues(venues.map(venue => 
      venue.id === venueId 
        ? { ...venue, name: newName, isEditing: false }
        : venue
    ));
  };

  const handleTaskStatusUpdate = (taskId: string, newStatus: OnboardingTask['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus,
            ...(newStatus === 'completed' ? { assignedTo: undefined } : {})
          }
        : task
    ));
  };

  const handleTaskAssignment = (taskId: string, teamMemberId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, assignedTo: teamMemberId }
        : task
    ));
  };

  const addTeamMember = () => {
    if (!newTeamMemberName.trim()) return;
    
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newTeamMemberName,
      email: newTeamMemberEmail || undefined,
      tasksOutstanding: 0
    };
    
    setTeamMembers([...teamMembers, newMember]);
    setNewTeamMemberName('');
    setNewTeamMemberEmail('');
  };

  const getTotalTasks = () => tasks.length;
  const getCompletedTasks = () => tasks.filter(task => task.status === 'completed').length;
  const getProgressPercentage = () => {
    const total = getTotalTasks();
    if (total === 0) return 0;
    return Math.round((getCompletedTasks() / total) * 100);
  };

  const getVenueTasks = (venueId: string) => tasks.filter(task => task.venueId === venueId);
  const getVenueProgress = (venueId: string) => {
    const venueTasks = getVenueTasks(venueId);
    const completed = venueTasks.filter(task => task.status === 'completed').length;
    return venueTasks.length > 0 ? Math.round((completed / venueTasks.length) * 100) : 0;
  };

  // Update team member task counts
  const updateTeamMemberCounts = () => {
    return teamMembers.map(member => ({
      ...member,
      tasksOutstanding: tasks.filter(task => 
        task.assignedTo === member.id && task.status !== 'completed'
      ).length
    }));
  };

  if (!isSetupComplete) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Welcome, {userName || dbUser?.name || 'User'}!
          </h2>
          <Button 
            variant="outline" 
            className="border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
          >
            Change Setup
          </Button>
        </div>

        <Card className="bg-[#0D0D24] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Your Onboarding Journey</CardTitle>
            <p className="text-gray-400">Let's get started by setting up your venue information</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetupSubmit} className="space-y-6">
              <div>
                <Label htmlFor="userName" className="text-white">Your Name</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-[#1A1A2E] border-gray-700 text-white mt-2"
                  placeholder="Enter your full name"
                />
                <p className="text-sm text-gray-400 mt-1">This will personalize your onboarding experience</p>
              </div>

              <div>
                <Label htmlFor="venueCount" className="text-white">Number of Venues</Label>
                <Input
                  id="venueCount"
                  type="number"
                  min="1"
                  max="20"
                  value={venueCount}
                  onChange={(e) => setVenueCount(e.target.value ? Number(e.target.value) : '')}
                  className="bg-[#1A1A2E] border-gray-700 text-white mt-2"
                  placeholder="How many venues are you onboarding?"
                />
                <p className="text-sm text-gray-400 mt-1">Each venue will have its own personalized onboarding checklist</p>
              </div>

              <Button 
                type="submit" 
                disabled={!userName.trim() || !venueCount || venueCount < 1}
                className="w-full bg-[#FF389A] hover:bg-[#E6329C] text-white font-bold py-3"
              >
                Start Onboarding Journey
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">
          Welcome, {userName}!
        </h2>
        <Button 
          variant="outline" 
          className="border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
          onClick={() => setIsSetupComplete(false)}
        >
          Change Setup
        </Button>
      </div>

      {/* Progress Summary */}
      <Card className="bg-[#0D0D24] border-gray-800">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-gray-300">
              Complete the onboarding for each of your {venues.length} venues.
            </p>
            <div className="text-2xl font-bold text-white">
              {getCompletedTasks()}/{getTotalTasks()} Total Tasks Complete
            </div>
            <Progress value={getProgressPercentage()} className="h-3" />
            <p className="text-sm text-gray-400">
              {getProgressPercentage()}% Complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Team Member Assignment */}
      <Card className="bg-[#0D0D24] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            Team Member Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {updateTeamMemberCounts().map(member => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-[#1A1A2E] rounded-lg">
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  {member.email && <p className="text-sm text-gray-400">{member.email}</p>}
                </div>
                <Badge variant={member.tasksOutstanding > 0 ? "destructive" : "secondary"}>
                  {member.tasksOutstanding} tasks outstanding
                </Badge>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400 mb-3">Add Team Member</p>
            <div className="flex gap-2">
              <Input
                value={newTeamMemberName}
                onChange={(e) => setNewTeamMemberName(e.target.value)}
                placeholder="Name"
                className="bg-[#1A1A2E] border-gray-700 text-white"
              />
              <Input
                value={newTeamMemberEmail}
                onChange={(e) => setNewTeamMemberEmail(e.target.value)}
                placeholder="Email (optional)"
                className="bg-[#1A1A2E] border-gray-700 text-white"
              />
              <Button onClick={addTeamMember} className="bg-[#FF389A] hover:bg-[#E6329C]">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Overview Toggle */}
      {showOnboardingOverview ? (
        <Card className="bg-[#0D0D24] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Your Onboarding Journey</CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowOnboardingOverview(false)}
                className="text-gray-400 hover:text-white"
              >
                <ChevronUp className="h-4 w-4" />
                Hide Overview
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-300">
                Complete these essential setup tasks for all your venues.
              </p>
              <div className="text-xl font-semibold text-white">
                Duration: {Math.ceil(getTotalTasks() * 0.3)} minutes
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tasks Outstanding */}
          <Card className="bg-[#0D0D24] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Tasks Outstanding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#FF389A]">
                {getTotalTasks() - getCompletedTasks()}
              </div>
              <p className="text-gray-400">tasks remaining across all venues</p>
            </CardContent>
          </Card>

          {/* Go-Live Date */}
          <Card className="bg-[#0D0D24] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Go-Live Date
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                type="date"
                value={goLiveDate}
                onChange={(e) => setGoLiveDate(e.target.value)}
                className="bg-[#1A1A2E] border-gray-700 text-white"
              />
              {goLiveDate && (
                <p className="text-sm text-gray-400">
                  Target launch: {new Date(goLiveDate).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Show Overview Button */}
      {!showOnboardingOverview && (
        <Button
          variant="outline"
          onClick={() => setShowOnboardingOverview(true)}
          className="w-full border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
        >
          <ChevronDown className="h-4 w-4 mr-2" />
          Show Onboarding Overview
        </Button>
      )}

      {/* Venue Progress Tabs */}
      <Tabs value={activeVenue} onValueChange={setActiveVenue} className="w-full">
        <TabsList className="grid w-full bg-[#1A1A2E] border border-gray-700" style={{ gridTemplateColumns: `repeat(${venues.length}, minmax(0, 1fr))` }}>
          {venues.map((venue) => (
            <TabsTrigger
              key={venue.id}
              value={venue.id}
              className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {venue.name}
                <Badge variant="secondary" className="ml-2 bg-gray-700 text-white">
                  {getVenueProgress(venue.id)}%
                </Badge>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {venues.map((venue) => (
          <TabsContent key={venue.id} value={venue.id} className="mt-6">
            <Card className="bg-[#0D0D24] border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-[#FF389A]" />
                    {venue.isEditing ? (
                      <Input
                        defaultValue={venue.name}
                        onBlur={(e) => handleVenueNameEdit(venue.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleVenueNameEdit(venue.id, e.currentTarget.value);
                          }
                        }}
                        className="bg-[#1A1A2E] border-gray-700 text-white w-48"
                        autoFocus
                      />
                    ) : (
                      <CardTitle className="text-white">{venue.name} Onboarding Progress</CardTitle>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setVenues(venues.map(v => 
                        v.id === venue.id ? { ...v, isEditing: !v.isEditing } : v
                      ))}
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Progress</div>
                    <div className="text-lg font-bold text-white">{getVenueProgress(venue.id)}%</div>
                  </div>
                </div>
                <p className="text-gray-400">Complete these essential setup tasks for {venue.name}</p>
                <Progress value={getVenueProgress(venue.id)} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getVenueTasks(venue.id).map((task) => {
                    const TaskIcon = TASK_TEMPLATES.find(t => t.name === task.name)?.icon || User;
                    const assignedMember = teamMembers.find(m => m.id === task.assignedTo);
                    
                    return (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between p-4 bg-[#1A1A2E] rounded-lg hover:bg-[#1F1F33] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <TaskIcon className="h-5 w-5 text-[#FF389A]" />
                          <div>
                            <h4 className="font-medium text-white">{task.name}</h4>
                            <p className="text-sm text-gray-400">{task.description}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {task.estimatedTime}
                              </span>
                              {assignedMember && (
                                <span className="text-xs text-blue-400">
                                  Assigned to {assignedMember.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Select
                            value={task.assignedTo || "unassigned"}
                            onValueChange={(value) => handleTaskAssignment(task.id, value === "unassigned" ? "" : value)}
                          >
                            <SelectTrigger className="w-32 bg-[#0D0D24] border-gray-700 text-white">
                              <SelectValue placeholder="Assign" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0D0D24] border-gray-700">
                              <SelectItem value="unassigned">Unassigned</SelectItem>
                              {teamMembers.map(member => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select
                            value={task.status}
                            onValueChange={(value) => handleTaskStatusUpdate(task.id, value as OnboardingTask['status'])}
                          >
                            <SelectTrigger className="w-36 bg-[#0D0D24] border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0D0D24] border-gray-700">
                              <SelectItem value="not-started">Not Started</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Badge 
                            variant={
                              task.status === 'completed' ? 'default' : 
                              task.status === 'in-progress' ? 'secondary' : 
                              'outline'
                            }
                          >
                            {task.status === 'completed' && <Check className="h-3 w-3 mr-1" />}
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}