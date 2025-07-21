import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  Clock,
  Play,
  Download,
  Star,
  Users,
  Calendar,
  Target,
  Trophy,
  ChevronRight,
  PlayCircle
} from 'lucide-react';

interface CourseModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'interactive' | 'quiz';
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface WeekContent {
  week: number;
  title: string;
  description: string;
  estimatedTime: string;
  modules: CourseModule[];
  completed: number;
  total: number;
}

interface CourseAreaProps {
  onBack: () => void;
  courseTopic: string;
}

export default function CourseArea({ onBack, courseTopic }: CourseAreaProps) {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample course data for Marketing - in real app this would come from your content management system
  const courseData: WeekContent[] = [
    {
      week: 1,
      title: "Marketing Foundations",
      description: "Build your marketing foundation with customer understanding and brand positioning",
      estimatedTime: "2-3 hours",
      completed: 3,
      total: 5,
      modules: [
        {
          id: 'w1m1',
          title: 'Understanding Your Customer Avatar',
          description: 'Define your ideal customer and create detailed buyer personas',
          type: 'video',
          duration: '15 mins',
          completed: true,
          locked: false
        },
        {
          id: 'w1m2',
          title: 'Brand Positioning Workshop',
          description: 'Position your venue in the competitive landscape',
          type: 'interactive',
          duration: '25 mins',
          completed: true,
          locked: false
        },
        {
          id: 'w1m3',
          title: 'Marketing Goals & KPIs Setup',
          description: 'Set measurable marketing objectives and key performance indicators',
          type: 'article',
          duration: '10 mins',
          completed: true,
          locked: false
        },
        {
          id: 'w1m4',
          title: 'Competitive Analysis Template',
          description: 'Analyze your competitors and identify opportunities',
          type: 'article',
          duration: '20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'w1m5',
          title: 'Week 1 Knowledge Check',
          description: 'Test your understanding of marketing foundations',
          type: 'quiz',
          duration: '5 mins',
          completed: false,
          locked: false
        }
      ]
    },
    {
      week: 2,
      title: "Digital Presence & Content",
      description: "Establish your online presence and create engaging content strategies",
      estimatedTime: "3-4 hours",
      completed: 0,
      total: 6,
      modules: [
        {
          id: 'w2m1',
          title: 'Social Media Strategy Framework',
          description: 'Choose the right platforms and develop a posting strategy',
          type: 'video',
          duration: '20 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w2m2',
          title: 'Content Calendar Creation',
          description: 'Plan and organize your content for maximum impact',
          type: 'interactive',
          duration: '30 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w2m3',
          title: 'Visual Brand Guidelines',
          description: 'Create consistent visual identity across all channels',
          type: 'article',
          duration: '15 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w2m4',
          title: 'Photography & Video Tips',
          description: 'Capture compelling visuals for your marketing',
          type: 'video',
          duration: '18 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w2m5',
          title: 'Google My Business Optimization',
          description: 'Maximize your local search presence',
          type: 'article',
          duration: '12 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w2m6',
          title: 'Week 2 Assessment',
          description: 'Apply your digital marketing knowledge',
          type: 'quiz',
          duration: '8 mins',
          completed: false,
          locked: true
        }
      ]
    },
    {
      week: 3,
      title: "Customer Engagement & Automation",
      description: "Build automated systems to engage and retain customers",
      estimatedTime: "3-5 hours",
      completed: 0,
      total: 7,
      modules: [
        {
          id: 'w3m1',
          title: 'Email Marketing Fundamentals',
          description: 'Design effective email campaigns that convert',
          type: 'video',
          duration: '25 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w3m2',
          title: 'Customer Journey Mapping',
          description: 'Map touchpoints from awareness to loyalty',
          type: 'interactive',
          duration: '35 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w3m3',
          title: 'Automated Campaign Setup',
          description: 'Configure welcome series and nurture sequences',
          type: 'video',
          duration: '22 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w3m4',
          title: 'Segmentation Strategies',
          description: 'Group customers for targeted messaging',
          type: 'article',
          duration: '15 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w3m5',
          title: 'Review & Feedback Systems',
          description: 'Automate review collection and response',
          type: 'video',
          duration: '18 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w3m6',
          title: 'Loyalty Program Design',
          description: 'Create programs that drive repeat business',
          type: 'interactive',
          duration: '28 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w3m7',
          title: 'Week 3 Practical Exercise',
          description: 'Build your first automated campaign',
          type: 'quiz',
          duration: '12 mins',
          completed: false,
          locked: true
        }
      ]
    },
    {
      week: 4,
      title: "Analytics & Optimization",
      description: "Measure performance and optimize your marketing efforts",
      estimatedTime: "2-4 hours",
      completed: 0,
      total: 5,
      modules: [
        {
          id: 'w4m1',
          title: 'Marketing Analytics Dashboard',
          description: 'Set up tracking and reporting systems',
          type: 'video',
          duration: '20 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w4m2',
          title: 'ROI Calculation Methods',
          description: 'Measure and prove marketing return on investment',
          type: 'article',
          duration: '15 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w4m3',
          title: 'A/B Testing Framework',
          description: 'Test and optimize your marketing messages',
          type: 'interactive',
          duration: '30 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w4m4',
          title: 'Scaling Successful Campaigns',
          description: 'Expand what works and eliminate what doesn\'t',
          type: 'video',
          duration: '18 mins',
          completed: false,
          locked: true
        },
        {
          id: 'w4m5',
          title: 'Final Marketing Plan',
          description: 'Create your comprehensive marketing strategy',
          type: 'quiz',
          duration: '25 mins',
          completed: false,
          locked: true
        }
      ]
    }
  ];

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'interactive': return <Target className="h-4 w-4" />;
      case 'quiz': return <Trophy className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getModuleTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'interactive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'quiz': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const totalCompleted = courseData.reduce((acc, week) => acc + week.completed, 0);
  const totalModules = courseData.reduce((acc, week) => acc + week.total, 0);
  const overallProgress = (totalCompleted / totalModules) * 100;

  const currentWeek = courseData.find(week => week.week === selectedWeek);

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedModule(null)}
              className="text-[#FF389A] hover:bg-[#FF389A]/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video/Content Area */}
            <div className="lg:col-span-2">
              <Card className="bg-black border-[#FF389A]/20">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-t-lg flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Button size="lg" className="bg-[#FF389A] hover:bg-[#E6329C]">
                        <Play className="h-6 w-6 mr-2" />
                        Start Learning
                      </Button>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&crop=center" 
                      alt="Course content"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {getModuleIcon(selectedModule.type)}
                      <Badge className={getModuleTypeColor(selectedModule.type)}>
                        {selectedModule.type}
                      </Badge>
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedModule.duration}
                      </span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">{selectedModule.title}</h1>
                    <p className="text-gray-300 mb-6">{selectedModule.description}</p>
                    <div className="text-gray-300">
                      <p>This content would be loaded from your learning management system or content platform. The module provides interactive learning experiences tailored to your business needs.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-black border-[#FF389A]/20">
                <CardHeader>
                  <CardTitle className="text-white">Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Overall Progress</span>
                        <span className="text-white">{totalCompleted}/{totalModules}</span>
                      </div>
                      <Progress value={overallProgress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black border-[#FF389A]/20">
                <CardHeader>
                  <CardTitle className="text-white">Week {selectedWeek} Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentWeek?.modules.map((module) => (
                      <div
                        key={module.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          module.id === selectedModule.id 
                            ? 'border-[#FF389A] bg-[#FF389A]/10' 
                            : 'border-gray-700 hover:border-gray-600'
                        } ${module.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => !module.locked && setSelectedModule(module)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getModuleIcon(module.type)}
                            <span className="text-white text-sm">{module.title}</span>
                          </div>
                          {module.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-[#FF389A]/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#FF389A] hover:bg-[#FF389A]/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Master Platform
            </Button>
          </div>
          
          <div className="mt-6">
            <h1 className="text-4xl font-bold text-white mb-4">
              {courseTopic} Mastery Course
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Complete your 4-week journey to master {courseTopic.toLowerCase()}. Progress at your own pace - whether you complete it in days or weeks, the choice is yours.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black border-[#FF389A]/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-[#FF389A]" />
                  <div>
                    <div className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</div>
                    <div className="text-gray-400">Complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-[#FF389A]/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-[#FF389A]" />
                  <div>
                    <div className="text-2xl font-bold text-white">10-16</div>
                    <div className="text-gray-400">Total Hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-[#FF389A]/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-[#FF389A]" />
                  <div>
                    <div className="text-2xl font-bold text-white">Self</div>
                    <div className="text-gray-400">Paced</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white">
              Weekly Curriculum
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {courseData.map((week) => {
                const weekProgress = (week.completed / week.total) * 100;
                const isAccessible = week.week === 1 || courseData[week.week - 2]?.completed === courseData[week.week - 2]?.total;
                
                return (
                  <Card 
                    key={week.week}
                    className={`bg-black border-[#FF389A]/20 hover:border-[#FF389A]/40 transition-colors cursor-pointer ${
                      !isAccessible ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => isAccessible && setSelectedWeek(week.week)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Week {week.week}</CardTitle>
                        {week.completed === week.total && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-[#FF389A]">{week.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-4">{week.description}</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{week.completed}/{week.total}</span>
                          </div>
                          <Progress value={weekProgress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {week.estimatedTime}
                          </span>
                          <span>{week.total} modules</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Start */}
            <Card className="mt-8 bg-black border-[#FF389A]/20">
              <CardHeader>
                <CardTitle className="text-white">Let's rock this launch! 🙌</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Welcome to the {courseTopic} 4-Week Launch Course! We are so glad that you are here!
                </p>
                <p className="text-gray-300 mb-4">
                  Each week we will be adding more content and giving you a focus - so you know that you are marketing this program to your current customers and helping to reach out to new customers. 
                  <strong className="text-white"> Please note that any downloads will be found at the top of the screen on desktop in each specific post. If you are on mobile, you will see that at the bottom of the page.</strong>
                </p>
                <p className="text-gray-300 mb-6">
                  Look out for an email each week (Sunday evening or Monday morning) - that email will let you know that there are more resources for you and help teach you how to use them!
                </p>
                <Button 
                  className="bg-[#FF389A] hover:bg-[#E6329C]"
                  onClick={() => setActiveTab('curriculum')}
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Week 1
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Week Selection */}
              <div className="lg:col-span-1">
                <Card className="bg-black border-[#FF389A]/20">
                  <CardHeader>
                    <CardTitle className="text-white">Course Outline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {courseData.map((week) => {
                      const isAccessible = week.week === 1 || courseData[week.week - 2]?.completed === courseData[week.week - 2]?.total;
                      return (
                        <Button
                          key={week.week}
                          variant={selectedWeek === week.week ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            selectedWeek === week.week 
                              ? "bg-[#FF389A] hover:bg-[#E6329C] text-white" 
                              : "text-gray-300 hover:bg-[#FF389A]/10"
                          } ${!isAccessible ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => isAccessible && setSelectedWeek(week.week)}
                          disabled={!isAccessible}
                        >
                          <div className="flex items-center gap-2">
                            <span>Week {week.week}</span>
                            {week.completed === week.total && (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </div>
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {currentWeek && (
                  <div className="space-y-6">
                    <Card className="bg-black border-[#FF389A]/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-white text-2xl">
                              Week {currentWeek.week}: {currentWeek.title}
                            </CardTitle>
                            <p className="text-gray-300 mt-2">{currentWeek.description}</p>
                          </div>
                          <Badge variant="outline" className="border-[#FF389A] text-[#FF389A]">
                            {currentWeek.estimatedTime}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-300">Week Progress</span>
                            <span className="text-white">{currentWeek.completed}/{currentWeek.total}</span>
                          </div>
                          <Progress value={(currentWeek.completed / currentWeek.total) * 100} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentWeek.modules.map((module) => (
                        <Card
                          key={module.id}
                          className={`bg-black border-[#FF389A]/20 hover:border-[#FF389A]/40 transition-colors cursor-pointer ${
                            module.locked ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={() => !module.locked && setSelectedModule(module)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {getModuleIcon(module.type)}
                                <Badge className={getModuleTypeColor(module.type)} variant="secondary">
                                  {module.type}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                {module.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                            <h3 className="text-white font-semibold mb-2">{module.title}</h3>
                            <p className="text-gray-300 text-sm mb-3">{module.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                              </span>
                              {module.locked && <span>🔒 Locked</span>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}