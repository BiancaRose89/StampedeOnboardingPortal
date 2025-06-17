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
  Calendar
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
                <Card className="bg-[#0D0D24] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Content Management</CardTitle>
                    <p className="text-gray-400">Manage website content and messaging</p>
                  </CardHeader>
                  <CardContent>
                    {!Array.isArray(contentItems) || contentItems.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        No content items found
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {contentItems.map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A2E]">
                            <div>
                              <p className="text-white font-medium">{item.title || item.key}</p>
                              <p className="text-gray-400 text-sm">
                                {item.isPublished ? 'Published' : 'Draft'}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
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

              {/* Onboarding Setup Tasks Sub-tab */}
              <TabsContent value="onboarding-setup">
                <Card className="bg-[#0D0D24] border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center">
                        <span className="text-[#FF389A] mr-3">📝</span>
                        Venue 1 Onboarding Progress
                      </CardTitle>
                      <p className="text-gray-400 mt-1">Complete these essential setup tasks for Venue 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Progress</p>
                      <p className="text-2xl font-bold text-white">0%</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {onboardingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A2E] border border-gray-800">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">{task.icon}</div>
                            <div className="flex-1">
                              <h3 className="text-white font-medium">{task.name}</h3>
                              <p className="text-gray-400 text-sm">{task.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-gray-500 text-xs flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {task.estimatedTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <select className="bg-[#0D0D24] border border-gray-700 rounded px-3 py-1 text-white text-sm">
                                <option value="unassigned">Unassigned</option>
                                <option value="admin">Admin</option>
                                <option value="venue-manager">Venue Manager</option>
                              </select>
                              <p className="text-gray-500 text-xs mt-1">Assigned to</p>
                            </div>
                            <div className="text-center">
                              <select className="bg-[#0D0D24] border border-gray-700 rounded px-3 py-1 text-white text-sm">
                                <option value="not-started">Not Started</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>
                              <p className="text-gray-500 text-xs mt-1">Status</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm ${getStatusColor(task.status.toLowerCase())}`}>
                                not started
                              </span>
                            </div>
                          </div>
                        </div>
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