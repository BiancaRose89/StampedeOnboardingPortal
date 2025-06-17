import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Settings,
  BarChart3,
  Building2,
  Activity,
  Users,
  Zap,
  CheckCircle,
  MapPin,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  Target,
  BookOpen,
  PlayCircle,
  Crown,
  Map,
  AlertCircle,
  Calendar,
  Upload,
  Trash2,
  Plus,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import OrganizationManager from './OrganizationManager';

interface CmsAdmin {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
}

interface CmsDashboardProps {
  admin: CmsAdmin;
  onLogout: () => void;
}

export default function CmsDashboard({ admin, onLogout }: CmsDashboardProps) {
  const { toast } = useToast();

  const { data: contentItems = [] } = useQuery({
    queryKey: ['/api/cms/content'],
    retry: false,
  });

  const { data: activities = [] } = useQuery({
    queryKey: ['/api/cms/activity/my'],
    retry: false,
  });

  const { data: organizations = [] } = useQuery({
    queryKey: ['/api/cms/organizations'],
    retry: false,
  });

  const { data: features = [] } = useQuery({
    queryKey: ['/api/cms/features'],
    retry: false,
  });

  // Create onboarding tasks for the Onboarding Setup Tasks tab
  const onboardingTasks = [
    {
      id: 1,
      name: 'Account Setup',
      description: 'Complete basic account configuration and business details',
      estimatedTime: '15 min',
      icon: '👤',
      assignee: 'Unassigned',
      status: 'Not Started',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Marketing Setup',
      description: 'Configure marketing preferences and promotional campaigns',
      estimatedTime: '20 min',
      icon: '📧',
      assignee: 'Unassigned',
      status: 'Not Started',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Wi-Fi Configuration',
      description: 'Set up customer Wi-Fi access and portal customization',
      estimatedTime: '10 min',
      icon: '📶',
      assignee: 'Unassigned',
      status: 'Not Started',
      priority: 'medium'
    },
    {
      id: 4,
      name: 'Booking System',
      description: 'Configure appointment booking and scheduling features',
      estimatedTime: '25 min',
      icon: '📅',
      assignee: 'Unassigned',
      status: 'Not Started',
      priority: 'high'
    },
    {
      id: 5,
      name: 'Reviews Management',
      description: 'Set up review collection and response management',
      estimatedTime: '15 min',
      icon: '⭐',
      assignee: 'Unassigned',
      status: 'Not Started',
      priority: 'medium'
    },
    {
      id: 6,
      name: 'Loyalty Program',
      description: 'Configure customer loyalty rewards and point system',
      estimatedTime: '20 min',
      icon: '🎁',
      assignee: 'Unassigned',
      status: 'Not Started',
      priority: 'medium'
    },
    {
      id: 7,
      name: 'Gift Cards Setup',
      description: 'Enable digital gift card sales and management',
      estimatedTime: '10 min',
      icon: '🎁',
      assignee: 'Unassigned',
      status: 'Not Started',
      priority: 'low'
    },
    {
      id: 8,
      name: 'Launch Preparation',
      description: 'Final review and go-live checklist completion',
      estimatedTime: '30 min',
      icon: '🚀',
      assignee: 'Unassigned',
      status: 'Not Started',
      priority: 'high'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'not-started': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#0D0D24]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Stampede CMS</h1>
              <p className="text-gray-400">Content Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{admin.name}</p>
                <p className="text-gray-400 text-sm capitalize">{admin.role}</p>
              </div>
              <Button 
                onClick={onLogout}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="admin" className="space-y-6">
          <TabsList className="bg-[#1A1A2E] border-gray-700">
            <TabsTrigger value="admin" className="data-[state=active]:bg-[#FF389A]">
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-[#FF389A]">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
          </TabsList>

          {/* Admin Tab with Sub-navigation */}
          <TabsContent value="admin" className="space-y-6">
            <Tabs defaultValue="dashboard" className="space-y-4">
              <TabsList className="bg-[#0D0D24] border-gray-800">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#FF389A]">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="venues-onboarded" className="data-[state=active]:bg-[#FF389A]">
                  <Building2 className="h-4 w-4 mr-2" />
                  Venues Onboarded
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-[#FF389A]">
                  <Activity className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
                {(admin.role === 'super_admin' || admin.role === 'admin') && (
                  <TabsTrigger value="users" className="data-[state=active]:bg-[#FF389A]">
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Dashboard Sub-tab */}
              <TabsContent value="dashboard">
                {/* Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Total Organizations</p>
                          <p className="text-3xl font-bold text-white">28</p>
                          <p className="text-blue-200 text-xs flex items-center mt-2">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +3 this month
                          </p>
                        </div>
                        <Building2 className="h-12 w-12 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Completion Rate</p>
                          <p className="text-3xl font-bold text-white">84%</p>
                          <p className="text-green-200 text-xs flex items-center mt-2">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +7% vs last month
                          </p>
                        </div>
                        <CheckCircle className="h-12 w-12 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">Avg. Setup Time</p>
                          <p className="text-3xl font-bold text-white">3.2h</p>
                          <p className="text-purple-200 text-xs flex items-center mt-2">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            -1.8h improved
                          </p>
                        </div>
                        <Clock className="h-12 w-12 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-pink-600 to-pink-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-pink-100 text-sm">Success Rate</p>
                          <p className="text-3xl font-bold text-white">96%</p>
                          <p className="text-pink-200 text-xs flex items-center mt-2">
                            <Target className="h-3 w-3 mr-1" />
                            Exceeds target
                          </p>
                        </div>
                        <Star className="h-12 w-12 text-pink-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Stage Analysis */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-[#FF389A]" />
                        Onboarding Stage Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { stage: 'Account Setup', completion: 95, color: 'bg-green-500' },
                        { stage: 'Feature Configuration', completion: 78, color: 'bg-blue-500' },
                        { stage: 'Staff Training', completion: 65, color: 'bg-yellow-500' },
                        { stage: 'Go-Live Preparation', completion: 42, color: 'bg-red-500' },
                        { stage: 'Post-Launch Support', completion: 88, color: 'bg-purple-500' }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">{item.stage}</span>
                            <span className="text-white font-medium">{item.completion}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.completion}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Feature Adoption */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-[#FF389A]" />
                        Feature Adoption Rates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { feature: 'Booking System', adoption: 92, trend: '+5%' },
                        { feature: 'Loyalty Program', adoption: 78, trend: '+12%' },
                        { feature: 'Marketing Automation', adoption: 65, trend: '+8%' },
                        { feature: 'WiFi Marketing', adoption: 54, trend: '+15%' },
                        { feature: 'Review Management', adoption: 71, trend: '+3%' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-[#1A1A2E] rounded-lg">
                          <div>
                            <p className="text-white font-medium">{item.feature}</p>
                            <p className="text-gray-400 text-sm">{item.adoption}% adoption</p>
                          </div>
                          <div className="text-right">
                            <span className="text-green-400 text-sm">{item.trend}</span>
                            <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                              <div 
                                className="h-1 rounded-full bg-[#FF389A]"
                                style={{ width: `${item.adoption}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Target className="h-5 w-5 mr-2 text-[#FF389A]" />
                        Performance Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-lg border border-green-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-300 font-medium">Fastest Setup</span>
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <p className="text-white text-xl font-bold">2.1 hours</p>
                        <p className="text-green-200 text-sm">Rosewood Cafe</p>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-lg border border-blue-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-300 font-medium">Most Features</span>
                          <Star className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="text-white text-xl font-bold">8/8 Features</p>
                        <p className="text-blue-200 text-sm">Downtown Bistro</p>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-lg border border-purple-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-purple-300 font-medium">Peak Activity</span>
                          <Activity className="h-5 w-5 text-purple-400" />
                        </div>
                        <p className="text-white text-xl font-bold">2-4 PM</p>
                        <p className="text-purple-200 text-sm">Daily average</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Completion Heatmap */}
                <Card className="bg-[#0D0D24] border-gray-800 mb-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-[#FF389A]" />
                      Weekly Completion Heatmap
                    </CardTitle>
                    <p className="text-gray-400">Peak onboarding activity times</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="text-center">
                          <p className="text-gray-400 text-sm mb-2">{day}</p>
                          <div className="space-y-1">
                            {Array.from({ length: 12 }, (_, hour) => {
                              const intensity = Math.random();
                              const bgColor = 
                                intensity > 0.8 ? 'bg-[#FF389A]' :
                                intensity > 0.6 ? 'bg-[#FF389A]/80' :
                                intensity > 0.4 ? 'bg-[#FF389A]/60' :
                                intensity > 0.2 ? 'bg-[#FF389A]/40' : 'bg-gray-800';
                              return (
                                <div 
                                  key={hour}
                                  className={`w-6 h-6 rounded ${bgColor} mx-auto`}
                                  title={`${9 + hour}:00 - ${Math.round(intensity * 100)}% activity`}
                                ></div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                      <span>Less activity</span>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded bg-gray-800"></div>
                        <div className="w-3 h-3 rounded bg-[#FF389A]/40"></div>
                        <div className="w-3 h-3 rounded bg-[#FF389A]/60"></div>
                        <div className="w-3 h-3 rounded bg-[#FF389A]/80"></div>
                        <div className="w-3 h-3 rounded bg-[#FF389A]"></div>
                      </div>
                      <span>More activity</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Organization Comparison */}
                <Card className="bg-[#0D0D24] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-[#FF389A]" />
                      Organization Performance Comparison
                    </CardTitle>
                    <p className="text-gray-400">Top performing organizations this month</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Metro Restaurant Group', venues: 8, completion: 94, avgTime: '2.8h', score: 'A+' },
                        { name: 'Coastal Hospitality', venues: 12, completion: 89, avgTime: '3.2h', score: 'A' },
                        { name: 'Urban Eats Collective', venues: 6, completion: 91, avgTime: '3.0h', score: 'A' },
                        { name: 'Family Diner Chain', venues: 15, completion: 76, avgTime: '4.1h', score: 'B+' },
                        { name: 'Boutique Cafe Network', venues: 4, completion: 88, avgTime: '3.5h', score: 'A-' }
                      ].map((org, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-[#1A1A2E] rounded-lg hover:bg-[#252545] transition-colors">
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{org.name}</h4>
                            <p className="text-gray-400 text-sm">{org.venues} venues</p>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <p className="text-white font-medium">{org.completion}%</p>
                              <p className="text-gray-400 text-xs">Completion</p>
                            </div>
                            <div className="text-center">
                              <p className="text-white font-medium">{org.avgTime}</p>
                              <p className="text-gray-400 text-xs">Avg Time</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              org.score.includes('A') ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                            }`}>
                              {org.score}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Venues Onboarded Sub-tab */}
              <TabsContent value="venues-onboarded">
                <OrganizationManager />
              </TabsContent>

              {/* Activity Sub-tab */}
              <TabsContent value="activity">
                <Card className="bg-[#0D0D24] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Activity Log</CardTitle>
                    <p className="text-gray-400">Recent admin activities and system events</p>
                  </CardHeader>
                  <CardContent>
                    {!Array.isArray(activities) || activities.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        No recent activity
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {activities.map((activity: any) => (
                          <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A2E]">
                            <div>
                              <p className="text-white">{activity.action}</p>
                              <p className="text-gray-400 text-sm">{activity.resourceType}</p>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {new Date(activity.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Sub-tab */}
              {(admin.role === 'super_admin' || admin.role === 'admin') && (
                <TabsContent value="users">
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">User Management</CardTitle>
                      <p className="text-gray-400">Manage admin users and permissions</p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-400">
                        User management features coming soon
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </TabsContent>

          {/* Content Tab with Sub-navigation */}
          <TabsContent value="content" className="space-y-6">
            <Tabs defaultValue="content-management" className="space-y-4">
              <TabsList className="bg-[#0D0D24] border-gray-800">
                <TabsTrigger value="content-management" className="data-[state=active]:bg-[#FF389A]">
                  <FileText className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="master-platform" className="data-[state=active]:bg-[#FF389A]">
                  <Zap className="h-4 w-4 mr-2" />
                  Master Platform
                </TabsTrigger>
                <TabsTrigger value="onboarding-setup" className="data-[state=active]:bg-[#FF389A]">
                  <Target className="h-4 w-4 mr-2" />
                  Onboarding Setup Tasks
                </TabsTrigger>
              </TabsList>

              {/* Content Management Sub-tab */}
              <TabsContent value="content-management">
                <div className="space-y-6">
                  {/* Platform Setup & Configuration Block */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          1
                        </div>
                        Platform Setup & Configuration
                      </CardTitle>
                      <p className="text-gray-400">Edit the main platform setup section content and imagery</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Main Title</label>
                            <input 
                              type="text" 
                              defaultValue="Platform Setup & Configuration"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Subtitle</label>
                            <input 
                              type="text" 
                              defaultValue="We build your branded platform while you prepare for launch"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Description</label>
                            <textarea 
                              defaultValue="Your Customer Success Manager configures everything behind the scenes - no technical work required from you."
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white h-20"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Phone Mockup Image</label>
                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                              <div className="text-gray-400">
                                <Upload className="h-8 w-8 mx-auto mb-2" />
                                <p>Upload new phone mockup image</p>
                                <p className="text-sm">Current: mangia! booking interface</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* What We Handle Section */}
                      <div className="border-t border-gray-700 pt-4">
                        <h4 className="text-white font-medium mb-3">What We Handle Section</h4>
                        <div className="space-y-2">
                          {[
                            "Build your fully branded platform with custom colors and logo",
                            "Configure all purchased features and integrations",
                            "Set up user accounts and permissions for your team",
                            "Prepare your dashboard with relevant widgets and analytics",
                            "Test all systems to ensure everything works perfectly"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input 
                                type="text" 
                                defaultValue={item}
                                className="flex-1 bg-[#1A1A2E] border border-gray-700 rounded px-3 py-1 text-white text-sm"
                              />
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="mt-2">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Item
                          </Button>
                        </div>
                      </div>

                      {/* What You'll Do Section */}
                      <div className="border-t border-gray-700 pt-4">
                        <h4 className="text-white font-medium mb-3">What You'll Do Section</h4>
                        <div className="space-y-2">
                          {[
                            "Provide branding assets (logo, color preferences, imagery)",
                            "Share venue details and operational preferences",
                            "Prepare team member information for account access",
                            "Gather any existing customer data for import"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input 
                                type="text" 
                                defaultValue={item}
                                className="flex-1 bg-[#1A1A2E] border border-gray-700 rounded px-3 py-1 text-white text-sm"
                              />
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="mt-2">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Item
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline">Preview</Button>
                        <Button className="bg-[#FF389A] hover:bg-[#FF389A]/80">Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Welcome & Platform Orientation Block */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          2
                        </div>
                        Welcome & Platform Orientation
                      </CardTitle>
                      <p className="text-gray-400">Edit the platform orientation section with team meeting visuals</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Main Title</label>
                            <input 
                              type="text" 
                              defaultValue="Welcome & Platform Orientation"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Time Badge</label>
                            <input 
                              type="text" 
                              defaultValue="30 mins"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Subtitle</label>
                            <input 
                              type="text" 
                              defaultValue="Meet your team and get your first look at your branded platform"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Description</label>
                            <textarea 
                              defaultValue="Quick platform tour and strategic scheduling of your modular feature training sessions."
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white h-20"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Background Visual</label>
                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                              <div className="text-gray-400">
                                <Upload className="h-8 w-8 mx-auto mb-2" />
                                <p>Upload team meeting background</p>
                                <p className="text-sm">Current: Circular team avatars with visit counts</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline">Preview</Button>
                        <Button className="bg-[#FF389A] hover:bg-[#FF389A]/80">Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Feature Training Sessions Block */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          3
                        </div>
                        Feature Training Sessions
                      </CardTitle>
                      <p className="text-gray-400">Edit the feature training section with analytics dashboards</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Main Title</label>
                            <input 
                              type="text" 
                              defaultValue="Feature Training Sessions"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Time Badge</label>
                            <input 
                              type="text" 
                              defaultValue="1 hour per feature"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Subtitle</label>
                            <input 
                              type="text" 
                              defaultValue="Master each feature you've purchased with dedicated 1-hour training sessions"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Description</label>
                            <textarea 
                              defaultValue="Master each feature you've purchased with dedicated 1-hour training sessions focused on your specific needs."
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white h-20"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Analytics Dashboard Images</label>
                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                              <div className="text-gray-400">
                                <Upload className="h-8 w-8 mx-auto mb-2" />
                                <p>Upload dashboard screenshots</p>
                                <p className="text-sm">Current: Pink analytics charts and venue dashboard</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline">Preview</Button>
                        <Button className="bg-[#FF389A] hover:bg-[#FF389A]/80">Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Testing & Go-Live Preparation Block */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          4
                        </div>
                        Testing & Go-Live Preparation
                      </CardTitle>
                      <p className="text-gray-400">Edit the testing phase section with mobile mockups</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Main Title</label>
                            <input 
                              type="text" 
                              defaultValue="Testing & Go-Live Preparation"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Time Badge</label>
                            <input 
                              type="text" 
                              defaultValue="30 mins"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Subtitle</label>
                            <input 
                              type="text" 
                              defaultValue="Test your platform and prepare for a smooth launch"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Description</label>
                            <textarea 
                              defaultValue="Final testing and preparation to ensure everything works perfectly before you go live."
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white h-20"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Mobile App Mockups</label>
                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                              <div className="text-gray-400">
                                <Upload className="h-8 w-8 mx-auto mb-2" />
                                <p>Upload mobile mockup images</p>
                                <p className="text-sm">Current: Three phone mockups with food/beverage apps</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline">Preview</Button>
                        <Button className="bg-[#FF389A] hover:bg-[#FF389A]/80">Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Go-Live & Ongoing Success Block */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          5
                        </div>
                        Go-Live & Ongoing Success
                      </CardTitle>
                      <p className="text-gray-400">Edit the launch and ongoing support section</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Main Title</label>
                            <input 
                              type="text" 
                              defaultValue="Go-Live & Ongoing Success"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Time Badge</label>
                            <input 
                              type="text" 
                              defaultValue="Launch day"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Subtitle</label>
                            <input 
                              type="text" 
                              defaultValue="Launch your platform and transition to ongoing support"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Description</label>
                            <textarea 
                              defaultValue="Launch day support and seamless transition to your ongoing Customer Success Manager relationship."
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white h-20"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Success Dashboard Images</label>
                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                              <div className="text-gray-400">
                                <Upload className="h-8 w-8 mx-auto mb-2" />
                                <p>Upload success dashboard screenshots</p>
                                <p className="text-sm">Current: Analytics dashboard with performance metrics</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline">Preview</Button>
                        <Button className="bg-[#FF389A] hover:bg-[#FF389A]/80">Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Testimonials Section */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <MessageSquare className="h-5 w-5 mr-3 text-[#FF389A]" />
                        Client Success Highlights (Testimonials)
                      </CardTitle>
                      <p className="text-gray-400">Manage customer testimonials and success stories</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <label className="text-white text-sm font-medium block mb-2">Section Title</label>
                          <input 
                            type="text" 
                            defaultValue="Client Success Highlights"
                            className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium block mb-2">Section Subtitle</label>
                          <input 
                            type="text" 
                            defaultValue="Real Results, Real Voices"
                            className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                          />
                        </div>
                      </div>

                      {/* Current Testimonial */}
                      <div className="border border-gray-700 rounded-lg p-4 bg-[#1A1A2E]">
                        <h4 className="text-white font-medium mb-3">Current Testimonial</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Quote</label>
                            <textarea 
                              defaultValue="You're awesome and have done such a great job with our onboarding. The support throughout the process has been exceptional and the results speak for themselves."
                              className="w-full bg-[#0D0D24] border border-gray-600 rounded-lg px-3 py-2 text-white h-24"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-white text-sm font-medium block mb-2">Client Name</label>
                              <input 
                                type="text" 
                                defaultValue="Vino Vita"
                                className="w-full bg-[#0D0D24] border border-gray-600 rounded-lg px-3 py-2 text-white"
                              />
                            </div>
                            <div>
                              <label className="text-white text-sm font-medium block mb-2">Onboarded By</label>
                              <input 
                                type="text" 
                                defaultValue="Bianca (CSM)"
                                className="w-full bg-[#0D0D24] border border-gray-600 rounded-lg px-3 py-2 text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Success Details</label>
                            <input 
                              type="text" 
                              defaultValue="Launched comprehensive digital ecosystem including guest WiFi, marketing automation, and review management"
                              className="w-full bg-[#0D0D24] border border-gray-600 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Testimonial
                        </Button>
                        <div className="flex space-x-2">
                          <Button variant="outline">Preview</Button>
                          <Button className="bg-[#FF389A] hover:bg-[#FF389A]/80">Save Changes</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Footer CTA Section */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <ArrowRight className="h-5 w-5 mr-3 text-[#FF389A]" />
                        Footer Call-to-Action
                      </CardTitle>
                      <p className="text-gray-400">Edit the bottom CTA section with pricing and contact options</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left side - Pricing CTA */}
                        <div className="space-y-4">
                          <h4 className="text-white font-medium">Pricing Section</h4>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Price Badge</label>
                            <input 
                              type="text" 
                              defaultValue="From £89 per venue monthly"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Main Heading</label>
                            <textarea 
                              defaultValue="Let's do this, choose your path"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white h-16"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Pricing Description</label>
                            <textarea 
                              defaultValue="We're constantly reviewing our pricing to remain competitive and fair for business of all sizes. Prices start from £89 per month, per venue. This allows you to design and send unlimited emails to your customers."
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white h-24"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Demo Section Title</label>
                            <input 
                              type="text" 
                              defaultValue="Book a live demo"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Demo Description</label>
                            <textarea 
                              defaultValue="Book a screen-share demo at a time to suit you with one of our specialists to learn more about Stampede and see how it works in real-time."
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white h-20"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Demo Button Text</label>
                            <input 
                              type="text" 
                              defaultValue="Show me"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                        </div>

                        {/* Right side - Contact Form */}
                        <div className="space-y-4">
                          <h4 className="text-white font-medium">Contact Form Section</h4>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Form Title</label>
                            <input 
                              type="text" 
                              defaultValue="REQUEST A QUOTE"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Email Field Label</label>
                            <input 
                              type="text" 
                              defaultValue="Business Email"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Email Placeholder</label>
                            <input 
                              type="text" 
                              defaultValue="you@company.com"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Submit Button Text</label>
                            <input 
                              type="text" 
                              defaultValue="Get Started"
                              className="w-full bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium block mb-2">Form Background Color</label>
                            <div className="flex space-x-2">
                              <input 
                                type="color" 
                                defaultValue="#FF389A"
                                className="w-12 h-10 bg-[#1A1A2E] border border-gray-700 rounded"
                              />
                              <input 
                                type="text" 
                                defaultValue="#FF389A"
                                className="flex-1 bg-[#1A1A2E] border border-gray-700 rounded-lg px-3 py-2 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline">Preview</Button>
                        <Button className="bg-[#FF389A] hover:bg-[#FF389A]/80">Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Master Platform Sub-tab */}
              <TabsContent value="master-platform">
                {/* Platform Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-indigo-100 text-sm">Training Modules</p>
                          <p className="text-3xl font-bold text-white">24</p>
                          <p className="text-indigo-200 text-xs">Interactive guides</p>
                        </div>
                        <BookOpen className="h-12 w-12 text-indigo-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-600 to-emerald-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-100 text-sm">Completion Rate</p>
                          <p className="text-3xl font-bold text-white">91%</p>
                          <p className="text-emerald-200 text-xs">Above average</p>
                        </div>
                        <Users className="h-12 w-12 text-emerald-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-600 to-amber-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-amber-100 text-sm">Avg. Time</p>
                          <p className="text-3xl font-bold text-white">18min</p>
                          <p className="text-amber-200 text-xs">Per module</p>
                        </div>
                        <Clock className="h-12 w-12 text-amber-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-rose-600 to-rose-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-rose-100 text-sm">Satisfaction</p>
                          <p className="text-3xl font-bold text-white">4.8/5</p>
                          <p className="text-rose-200 text-xs">User rating</p>
                        </div>
                        <Star className="h-12 w-12 text-rose-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Feature Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Core Features */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-blue-400" />
                        Core Platform Features
                      </CardTitle>
                      <p className="text-gray-400">Essential functionality for all venues</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: 'Account Setup', progress: 100, users: 847, icon: '🏢' },
                        { name: 'Booking System', progress: 95, users: 823, icon: '📅' },
                        { name: 'Payment Processing', progress: 92, users: 798, icon: '💳' },
                        { name: 'Staff Management', progress: 88, users: 756, icon: '👥' },
                        { name: 'Basic Reports', progress: 85, users: 731, icon: '📊' }
                      ].map((feature, index) => (
                        <div key={index} className="p-4 bg-[#1A1A2E] rounded-lg hover:bg-[#252545] transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-xl mr-3">{feature.icon}</span>
                              <div>
                                <h4 className="text-white font-medium">{feature.name}</h4>
                                <p className="text-gray-400 text-sm">{feature.users} users completed</p>
                              </div>
                            </div>
                            <span className="text-blue-400 font-medium">{feature.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${feature.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Advanced Features */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Star className="h-5 w-5 mr-2 text-purple-400" />
                        Advanced Features
                      </CardTitle>
                      <p className="text-gray-400">Enhanced capabilities for growth</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: 'Loyalty Program', progress: 78, users: 672, icon: '🎯' },
                        { name: 'Marketing Automation', progress: 65, users: 561, icon: '🚀' },
                        { name: 'Advanced Analytics', progress: 71, users: 612, icon: '📈' },
                        { name: 'Multi-Location Mgmt', progress: 54, users: 465, icon: '🏬' },
                        { name: 'API Integration', progress: 42, users: 362, icon: '🔗' }
                      ].map((feature, index) => (
                        <div key={index} className="p-4 bg-[#1A1A2E] rounded-lg hover:bg-[#252545] transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-xl mr-3">{feature.icon}</span>
                              <div>
                                <h4 className="text-white font-medium">{feature.name}</h4>
                                <p className="text-gray-400 text-sm">{feature.users} users completed</p>
                              </div>
                            </div>
                            <span className="text-purple-400 font-medium">{feature.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-purple-500"
                              style={{ width: `${feature.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Premium Features */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                        Premium Features
                      </CardTitle>
                      <p className="text-gray-400">Enterprise-level functionality</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: 'WiFi Marketing', progress: 68, users: 587, icon: '📶' },
                        { name: 'Review Management', progress: 71, users: 612, icon: '⭐' },
                        { name: 'Custom Branding', progress: 45, users: 388, icon: '🎨' },
                        { name: 'White Label', progress: 32, users: 276, icon: '🏷️' },
                        { name: 'Enterprise Support', progress: 89, users: 768, icon: '🆘' }
                      ].map((feature, index) => (
                        <div key={index} className="p-4 bg-[#1A1A2E] rounded-lg hover:bg-[#252545] transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-xl mr-3">{feature.icon}</span>
                              <div>
                                <h4 className="text-white font-medium">{feature.name}</h4>
                                <p className="text-gray-400 text-sm">{feature.users} users completed</p>
                              </div>
                            </div>
                            <span className="text-yellow-400 font-medium">{feature.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-yellow-500"
                              style={{ width: `${feature.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Training Modules Grid */}
                <Card className="bg-[#0D0D24] border-gray-800 mb-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-[#FF389A]" />
                      Interactive Training Modules
                    </CardTitle>
                    <p className="text-gray-400">Comprehensive platform mastery guides</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {[
                        { title: 'Platform Overview', duration: '15 min', completed: 847, difficulty: 'Beginner', category: 'Core' },
                        { title: 'Account Configuration', duration: '22 min', completed: 823, difficulty: 'Beginner', category: 'Core' },
                        { title: 'Booking System Setup', duration: '35 min', completed: 798, difficulty: 'Intermediate', category: 'Core' },
                        { title: 'Payment Gateway Integration', duration: '28 min', completed: 756, difficulty: 'Intermediate', category: 'Core' },
                        { title: 'Staff & Permissions', duration: '18 min', completed: 731, difficulty: 'Beginner', category: 'Core' },
                        { title: 'Loyalty Program Design', duration: '45 min', completed: 672, difficulty: 'Advanced', category: 'Advanced' },
                        { title: 'Marketing Campaigns', duration: '38 min', completed: 561, difficulty: 'Advanced', category: 'Advanced' },
                        { title: 'Analytics Dashboard', duration: '25 min', completed: 612, difficulty: 'Intermediate', category: 'Advanced' },
                        { title: 'WiFi Marketing Setup', duration: '32 min', completed: 587, difficulty: 'Advanced', category: 'Premium' },
                        { title: 'Review Collection', duration: '20 min', completed: 612, difficulty: 'Intermediate', category: 'Premium' },
                        { title: 'Custom Branding', duration: '40 min', completed: 388, difficulty: 'Advanced', category: 'Premium' },
                        { title: 'API Documentation', duration: '60 min', completed: 276, difficulty: 'Expert', category: 'Premium' }
                      ].map((module, index) => (
                        <Card key={index} className="bg-[#1A1A2E] border-gray-700 hover:border-[#FF389A] transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                module.category === 'Core' ? 'bg-blue-900 text-blue-200' :
                                module.category === 'Advanced' ? 'bg-purple-900 text-purple-200' :
                                'bg-yellow-900 text-yellow-200'
                              }`}>
                                {module.category}
                              </span>
                              <PlayCircle className="h-5 w-5 text-[#FF389A]" />
                            </div>
                            
                            <h4 className="text-white font-medium mb-2">{module.title}</h4>
                            
                            <div className="space-y-2 text-sm text-gray-400">
                              <div className="flex items-center justify-between">
                                <span>Duration:</span>
                                <span className="text-white">{module.duration}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Completed:</span>
                                <span className="text-green-400">{module.completed} users</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Difficulty:</span>
                                <span className={`${
                                  module.difficulty === 'Beginner' ? 'text-green-400' :
                                  module.difficulty === 'Intermediate' ? 'text-yellow-400' :
                                  module.difficulty === 'Advanced' ? 'text-orange-400' : 'text-red-400'
                                }`}>
                                  {module.difficulty}
                                </span>
                              </div>
                            </div>
                            
                            <Button className="w-full mt-4 bg-[#FF389A] hover:bg-[#FF389A]/80" size="sm">
                              Start Module
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Paths */}
                <Card className="bg-[#0D0D24] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Map className="h-5 w-5 mr-2 text-[#FF389A]" />
                      Recommended Learning Paths
                    </CardTitle>
                    <p className="text-gray-400">Curated sequences for different roles and goals</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'Restaurant Owner',
                          description: 'Complete platform setup and management',
                          modules: 8,
                          duration: '4.5 hours',
                          users: 234,
                          path: ['Platform Overview', 'Account Setup', 'Booking System', 'Payment Processing', 'Staff Management', 'Analytics', 'Marketing', 'Go-Live']
                        },
                        {
                          title: 'Marketing Manager',
                          description: 'Master customer engagement features',
                          modules: 6,
                          duration: '3.2 hours',
                          users: 187,
                          path: ['Platform Overview', 'Loyalty Program', 'Marketing Automation', 'WiFi Marketing', 'Review Management', 'Analytics']
                        },
                        {
                          title: 'Technical Administrator',
                          description: 'Advanced configuration and integrations',
                          modules: 10,
                          duration: '6.8 hours',
                          users: 92,
                          path: ['Platform Overview', 'Advanced Settings', 'API Integration', 'Custom Branding', 'Multi-Location', 'Security', 'Backup', 'Troubleshooting', 'Performance', 'Enterprise']
                        }
                      ].map((path, index) => (
                        <Card key={index} className="bg-[#1A1A2E] border-gray-700">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-white font-bold text-lg">{path.title}</h4>
                              <Users className="h-6 w-6 text-[#FF389A]" />
                            </div>
                            
                            <p className="text-gray-400 mb-4">{path.description}</p>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Modules:</span>
                                <span className="text-white">{path.modules}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Duration:</span>
                                <span className="text-white">{path.duration}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Completed by:</span>
                                <span className="text-green-400">{path.users} users</span>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <p className="text-gray-400 text-sm mb-2">Learning Path:</p>
                              <div className="space-y-1">
                                {path.path.slice(0, 4).map((step, stepIndex) => (
                                  <div key={stepIndex} className="flex items-center text-sm">
                                    <div className="w-2 h-2 rounded-full bg-[#FF389A] mr-2"></div>
                                    <span className="text-gray-300">{step}</span>
                                  </div>
                                ))}
                                {path.path.length > 4 && (
                                  <div className="flex items-center text-sm">
                                    <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                                    <span className="text-gray-500">+{path.path.length - 4} more...</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <Button className="w-full bg-[#FF389A] hover:bg-[#FF389A]/80">
                              Start Learning Path
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left side - Phone mockup */}
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="w-64 h-96 bg-black rounded-3xl p-2 shadow-2xl">
                            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden relative">
                              {/* Phone notch */}
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl"></div>
                              
                              {/* Status bar */}
                              <div className="flex justify-between items-center p-4 pt-8 text-white text-sm">
                                <span>9:41</span>
                                <div className="flex space-x-1">
                                  <div className="w-1 h-1 bg-white rounded-full"></div>
                                  <div className="w-1 h-1 bg-white rounded-full"></div>
                                  <div className="w-1 h-1 bg-white rounded-full"></div>
                                </div>
                                <span>100%</span>
                              </div>

                              {/* Main content */}
                              <div className="p-4 space-y-4">
                                {/* Calendar header */}
                                <div className="flex justify-between items-center text-white text-sm">
                                  <span>← Back</span>
                                  <span>• Today</span>
                                  <span>Month</span>
                                </div>

                                {/* Calendar grid */}
                                <div className="grid grid-cols-7 gap-1 text-xs text-gray-400 mb-2">
                                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                    <div key={i} className="text-center">{day}</div>
                                  ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-xs">
                                  {Array.from({length: 35}, (_, i) => (
                                    <div key={i} className="text-center text-gray-500 p-1">
                                      {i > 5 && i < 32 ? i - 5 : ''}
                                    </div>
                                  ))}
                                </div>

                                {/* Pizza image */}
                                <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden">
                                  <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-yellow-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">mangia!</span>
                                  </div>
                                </div>

                                {/* Booking details */}
                                <div className="text-white space-y-2">
                                  <div>
                                    <span className="text-gray-400 text-sm">What?</span>
                                    <div className="text-white">Booking type</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-400 text-sm">How many people?</span>
                                    <div className="text-white flex items-center">
                                      <span className="mr-2">Party size</span>
                                      <div className="flex items-center bg-gray-700 rounded-full px-3 py-1">
                                        <span className="mx-2">−</span>
                                        <span className="mx-2">4</span>
                                        <span className="mx-2">+</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-gray-400 text-sm">When?</span>
                                    <div className="text-white">October 25, 2024</div>
                                  </div>
                                </div>

                                {/* Time selector */}
                                <div className="bg-gray-800 rounded-lg p-2">
                                  <span className="text-white text-sm">14:15-15:45</span>
                                </div>
                              </div>

                              {/* Right side booking slots */}
                              <div className="absolute right-0 top-16 w-20 space-y-1 p-2">
                                <div className="bg-green-500 text-white text-xs p-1 rounded text-center">Check Sheet</div>
                                <div className="bg-orange-500 text-white text-xs p-1 rounded text-center">Open Source</div>
                                <div className="bg-green-500 text-white text-xs p-1 rounded text-center">Walk In</div>
                                <div className="bg-green-500 text-white text-xs p-1 rounded text-center">Walk In</div>
                                <div className="bg-purple-500 text-white text-xs p-1 rounded text-center">Walk In</div>
                                <div className="bg-purple-500 text-white text-xs p-1 rounded text-center">Walk In</div>
                                <div className="bg-green-500 text-white text-xs p-1 rounded text-center">Walk In</div>
                                <div className="bg-orange-500 text-white text-xs p-1 rounded text-center">Lunch</div>
                                <div className="bg-purple-500 text-white text-xs p-1 rounded text-center">Walk In</div>
                                <div className="bg-orange-500 text-white text-xs p-1 rounded text-center">Afternoon Service</div>
                                <div className="bg-purple-500 text-white text-xs p-1 rounded text-center">Artisan Beverage</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right side - What We Handle & What You'll Do */}
                      <div className="space-y-6">
                        {/* What We Handle */}
                        <div>
                          <h3 className="text-red-400 font-semibold mb-4 flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            What We Handle:
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Build your fully branded platform with custom colors and logo</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Configure all purchased features and integrations</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Set up user accounts and permissions for your team</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Prepare your dashboard with relevant widgets and analytics</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Test all systems to ensure everything works perfectly</span>
                            </div>
                          </div>
                        </div>

                        {/* What You'll Do */}
                        <div>
                          <h3 className="text-red-400 font-semibold mb-4 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            What You'll Do:
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Provide branding assets (logo, color preferences, imagery)</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Share venue details and operational preferences</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Prepare team member information for account access</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-white">Gather any existing customer data for import</span>
                            </div>
                          </div>
                        </div>

                        {/* Key Information */}
                        <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg p-4 border border-red-800/30">
                          <h3 className="text-white font-semibold mb-3">Key Information:</h3>
                          <div className="space-y-2 text-gray-300">
                            <p>Completed within 24-48 hours of receiving your assets</p>
                            <p>You'll receive progress updates via email</p>
                            <p>Platform ready for training by step 2</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </TabsContent>

              {/* Onboarding Setup Tasks Sub-tab */}
              <TabsContent value="onboarding-setup">
                <VenueManager />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default CmsDashboardFixed;
                        </div>
                        
                        <h3 className="text-white font-bold text-lg mb-2">{module.title}</h3>
                        <p className="text-gray-400 mb-4">{module.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">Timeline: {module.timeframe}</span>
                          <Button variant="outline" size="sm" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Onboarding Setup Tasks Sub-tab */}
              <TabsContent value="onboarding-setup">
                {/* Setup Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Setup Modules</p>
                          <p className="text-3xl font-bold text-white">18</p>
                          <p className="text-blue-200 text-xs">Available modules</p>
                        </div>
                        <Settings className="h-12 w-12 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Active Setups</p>
                          <p className="text-3xl font-bold text-white">142</p>
                          <p className="text-green-200 text-xs">In progress</p>
                        </div>
                        <Activity className="h-12 w-12 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-600 to-orange-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm">Avg. Setup Time</p>
                          <p className="text-3xl font-bold text-white">6.4h</p>
                          <p className="text-orange-200 text-xs">Per venue</p>
                        </div>
                        <Clock className="h-12 w-12 text-orange-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">Success Rate</p>
                          <p className="text-3xl font-bold text-white">92%</p>
                          <p className="text-purple-200 text-xs">Go-live success</p>
                        </div>
                        <CheckCircle className="h-12 w-12 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Module Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Core Setup Modules */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-blue-400" />
                        Core Setup Modules
                      </CardTitle>
                      <p className="text-gray-400">Essential onboarding tasks for all venues</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: 'Account Setup', active: 847, completion: 98, duration: '45 min', icon: '🏢', enabled: true },
                        { name: 'Basic Configuration', active: 823, completion: 95, duration: '30 min', icon: '⚙️', enabled: true },
                        { name: 'Staff Onboarding', active: 798, completion: 89, duration: '60 min', icon: '👥', enabled: true },
                        { name: 'Payment Processing', active: 756, completion: 92, duration: '40 min', icon: '💳', enabled: true },
                        { name: 'Go-Live Checklist', active: 731, completion: 87, duration: '25 min', icon: '✅', enabled: true }
                      ].map((module, index) => (
                        <div key={index} className="p-4 bg-[#1A1A2E] rounded-lg hover:bg-[#252545] transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-xl mr-3">{module.icon}</span>
                              <div>
                                <h4 className="text-white font-medium">{module.name}</h4>
                                <p className="text-gray-400 text-sm">{module.active} venues • {module.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-blue-400 font-medium">{module.completion}%</span>
                              <div className={`w-4 h-4 rounded-full ${module.enabled ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${module.completion}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-xs">Module Status</span>
                            <Button variant="outline" size="sm" className="h-6 text-xs">
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Advanced Setup Modules */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Star className="h-5 w-5 mr-2 text-purple-400" />
                        Advanced Setup Modules
                      </CardTitle>
                      <p className="text-gray-400">Enhanced onboarding for growth-focused venues</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: 'Booking System Setup', active: 672, completion: 84, duration: '90 min', icon: '📅', enabled: true },
                        { name: 'Loyalty Program Config', active: 561, completion: 78, duration: '75 min', icon: '🎯', enabled: true },
                        { name: 'Marketing Automation', active: 612, completion: 71, duration: '120 min', icon: '🚀', enabled: false },
                        { name: 'Analytics Dashboard', active: 465, completion: 68, duration: '60 min', icon: '📊', enabled: true },
                        { name: 'Integration Setup', active: 362, completion: 59, duration: '105 min', icon: '🔗', enabled: false }
                      ].map((module, index) => (
                        <div key={index} className="p-4 bg-[#1A1A2E] rounded-lg hover:bg-[#252545] transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-xl mr-3">{module.icon}</span>
                              <div>
                                <h4 className="text-white font-medium">{module.name}</h4>
                                <p className="text-gray-400 text-sm">{module.active} venues • {module.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-purple-400 font-medium">{module.completion}%</span>
                              <div className={`w-4 h-4 rounded-full ${module.enabled ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div 
                              className="h-2 rounded-full bg-purple-500"
                              style={{ width: `${module.completion}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-xs">{module.enabled ? 'Enabled' : 'Disabled'}</span>
                            <Button variant="outline" size="sm" className="h-6 text-xs">
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Premium Setup Modules */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                        Premium Setup Modules
                      </CardTitle>
                      <p className="text-gray-400">Enterprise-level onboarding capabilities</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: 'WiFi Marketing Setup', active: 587, completion: 76, duration: '85 min', icon: '📶', enabled: true },
                        { name: 'Review Management', active: 612, completion: 82, duration: '50 min', icon: '⭐', enabled: true },
                        { name: 'Custom Branding', active: 388, completion: 65, duration: '150 min', icon: '🎨', enabled: false },
                        { name: 'Multi-Location Mgmt', active: 276, completion: 58, duration: '180 min', icon: '🏬', enabled: false },
                        { name: 'Enterprise Support', active: 768, completion: 94, duration: '45 min', icon: '🆘', enabled: true }
                      ].map((module, index) => (
                        <div key={index} className="p-4 bg-[#1A1A2E] rounded-lg hover:bg-[#252545] transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-xl mr-3">{module.icon}</span>
                              <div>
                                <h4 className="text-white font-medium">{module.name}</h4>
                                <p className="text-gray-400 text-sm">{module.active} venues • {module.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-yellow-400 font-medium">{module.completion}%</span>
                              <div className={`w-4 h-4 rounded-full ${module.enabled ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div 
                              className="h-2 rounded-full bg-yellow-500"
                              style={{ width: `${module.completion}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-xs">{module.enabled ? 'Enabled' : 'Disabled'}</span>
                            <Button variant="outline" size="sm" className="h-6 text-xs">
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Setup Tasks Management Grid */}
                <Card className="bg-[#0D0D24] border-gray-800 mb-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-[#FF389A]" />
                      Client Setup Task Modules
                    </CardTitle>
                    <p className="text-gray-400">Switch modules on/off for different client onboarding experiences</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {[
                        { title: 'Account Setup', duration: '45 min', venues: 847, status: 'enabled', difficulty: 'Beginner', category: 'Core', tasks: 8 },
                        { title: 'Basic Configuration', duration: '30 min', venues: 823, status: 'enabled', difficulty: 'Beginner', category: 'Core', tasks: 5 },
                        { title: 'Staff Training Portal', duration: '60 min', venues: 798, status: 'enabled', difficulty: 'Intermediate', category: 'Core', tasks: 12 },
                        { title: 'Payment Gateway Setup', duration: '40 min', venues: 756, status: 'enabled', difficulty: 'Intermediate', category: 'Core', tasks: 6 },
                        { title: 'Go-Live Preparation', duration: '25 min', venues: 731, status: 'enabled', difficulty: 'Beginner', category: 'Core', tasks: 4 },
                        { title: 'Booking System Config', duration: '90 min', venues: 672, status: 'enabled', difficulty: 'Advanced', category: 'Advanced', tasks: 15 },
                        { title: 'Loyalty Program Setup', duration: '75 min', venues: 561, status: 'enabled', difficulty: 'Advanced', category: 'Advanced', tasks: 11 },
                        { title: 'Marketing Automation', duration: '120 min', venues: 612, status: 'disabled', difficulty: 'Advanced', category: 'Advanced', tasks: 18 },
                        { title: 'WiFi Marketing Setup', duration: '85 min', venues: 587, status: 'enabled', difficulty: 'Advanced', category: 'Premium', tasks: 13 },
                        { title: 'Review Management', duration: '50 min', venues: 612, status: 'enabled', difficulty: 'Intermediate', category: 'Premium', tasks: 9 },
                        { title: 'Custom Branding', duration: '150 min', venues: 388, status: 'disabled', difficulty: 'Expert', category: 'Premium', tasks: 22 },
                        { title: 'Multi-Location Setup', duration: '180 min', venues: 276, status: 'disabled', difficulty: 'Expert', category: 'Premium', tasks: 28 }
                      ].map((module, index) => (
                        <Card key={index} className={`border transition-colors cursor-pointer ${
                          module.status === 'enabled' 
                            ? 'bg-[#1A1A2E] border-[#FF389A] hover:border-[#FF389A]/80' 
                            : 'bg-[#0D0D14] border-gray-800 hover:border-gray-700'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                module.category === 'Core' ? 'bg-blue-900 text-blue-200' :
                                module.category === 'Advanced' ? 'bg-purple-900 text-purple-200' :
                                'bg-yellow-900 text-yellow-200'
                              }`}>
                                {module.category}
                              </span>
                              <div className={`w-3 h-3 rounded-full ${
                                module.status === 'enabled' ? 'bg-green-500' : 'bg-gray-600'
                              }`}></div>
                            </div>
                            
                            <h4 className={`font-medium mb-2 ${
                              module.status === 'enabled' ? 'text-white' : 'text-gray-500'
                            }`}>
                              {module.title}
                            </h4>
                            
                            <div className={`space-y-2 text-sm ${
                              module.status === 'enabled' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              <div className="flex items-center justify-between">
                                <span>Duration:</span>
                                <span className={module.status === 'enabled' ? 'text-white' : 'text-gray-500'}>
                                  {module.duration}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Active:</span>
                                <span className={module.status === 'enabled' ? 'text-green-400' : 'text-gray-500'}>
                                  {module.venues} venues
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Tasks:</span>
                                <span className={module.status === 'enabled' ? 'text-white' : 'text-gray-500'}>
                                  {module.tasks}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Difficulty:</span>
                                <span className={`${
                                  module.difficulty === 'Beginner' ? 'text-green-400' :
                                  module.difficulty === 'Intermediate' ? 'text-yellow-400' :
                                  module.difficulty === 'Advanced' ? 'text-orange-400' : 'text-red-400'
                                }`}>
                                  {module.difficulty}
                                </span>
                              </div>
                            </div>
                            
                            <Button 
                              className={`w-full mt-4 ${
                                module.status === 'enabled' 
                                  ? 'bg-[#FF389A] hover:bg-[#FF389A]/80' 
                                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                              }`} 
                              size="sm"
                            >
                              {module.status === 'enabled' ? 'Configure Module' : 'Enable Module'}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Setup Templates */}
                <Card className="bg-[#0D0D24] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-[#FF389A]" />
                      Setup Templates
                    </CardTitle>
                    <p className="text-gray-400">Pre-configured module combinations for different venue types</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'Quick Start Package',
                          description: 'Essential modules for rapid venue onboarding',
                          modules: 6,
                          duration: '3.5 hours',
                          venues: 456,
                          included: ['Account Setup', 'Basic Configuration', 'Staff Training', 'Payment Setup', 'Go-Live Checklist', 'Support Access']
                        },
                        {
                          title: 'Full-Service Package',
                          description: 'Comprehensive setup with booking and loyalty features',
                          modules: 10,
                          duration: '8.2 hours',
                          venues: 298,
                          included: ['All Quick Start', 'Booking System', 'Loyalty Program', 'Analytics Dashboard', 'Review Management']
                        },
                        {
                          title: 'Enterprise Package',
                          description: 'Complete platform setup with advanced integrations',
                          modules: 15,
                          duration: '14.8 hours',
                          venues: 87,
                          included: ['All Full-Service', 'Marketing Automation', 'WiFi Marketing', 'Custom Branding', 'Multi-Location', 'Enterprise Support']
                        }
                      ].map((template, index) => (
                        <Card key={index} className="bg-[#1A1A2E] border-gray-700">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-white font-bold text-lg">{template.title}</h4>
                              <Settings className="h-6 w-6 text-[#FF389A]" />
                            </div>
                            
                            <p className="text-gray-400 mb-4">{template.description}</p>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Modules:</span>
                                <span className="text-white">{template.modules}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Duration:</span>
                                <span className="text-white">{template.duration}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Active Venues:</span>
                                <span className="text-green-400">{template.venues}</span>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <p className="text-gray-400 text-sm mb-2">Included Modules:</p>
                              <div className="space-y-1">
                                {template.included.slice(0, 4).map((module, moduleIndex) => (
                                  <div key={moduleIndex} className="flex items-center text-sm">
                                    <div className="w-2 h-2 rounded-full bg-[#FF389A] mr-2"></div>
                                    <span className="text-gray-300">{module}</span>
                                  </div>
                                ))}
                                {template.included.length > 4 && (
                                  <div className="flex items-center text-sm">
                                    <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                                    <span className="text-gray-500">+{template.included.length - 4} more modules</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <Button className="w-full bg-[#FF389A] hover:bg-[#FF389A]/80">
                              Apply Template
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}