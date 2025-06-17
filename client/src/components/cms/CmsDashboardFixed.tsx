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
  Target
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Performance Metrics */}
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Venues</p>
                          <p className="text-2xl font-bold text-white">
                            {Array.isArray(organizations) ? organizations.length : 0}
                          </p>
                        </div>
                        <Building2 className="h-8 w-8 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Completion Rate</p>
                          <p className="text-2xl font-bold text-white">78%</p>
                          <p className="text-green-400 text-xs flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12% from last month
                          </p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Avg. Setup Time</p>
                          <p className="text-2xl font-bold text-white">4.2h</p>
                          <p className="text-green-400 text-xs flex items-center mt-1">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            -0.8h improved
                          </p>
                        </div>
                        <Clock className="h-8 w-8 text-yellow-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Success Rate</p>
                          <p className="text-2xl font-bold text-white">94%</p>
                          <p className="text-green-400 text-xs flex items-center mt-1">
                            <Target className="h-3 w-3 mr-1" />
                            Above target
                          </p>
                        </div>
                        <Star className="h-8 w-8 text-[#FF389A]" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Onboarding Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-400">
                        Analytics charts will be integrated here
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0D0D24] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Feature Adoption</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-400">
                        Feature adoption metrics will be displayed here
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
                <Card className="bg-[#0D0D24] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Master the Platform</CardTitle>
                    <p className="text-gray-400">Platform training modules and feature guides</p>
                  </CardHeader>
                  <CardContent>
                    {!Array.isArray(features) || features.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        No platform features configured
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((feature: any) => (
                          <Card key={feature.id} className="bg-[#1A1A2E] border-gray-700">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-medium">{feature.name}</h3>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  feature.category === 'core' ? 'bg-blue-900 text-blue-200' :
                                  feature.category === 'advanced' ? 'bg-purple-900 text-purple-200' :
                                  'bg-orange-900 text-orange-200'
                                }`}>
                                  {feature.category}
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm mb-3">{feature.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500 text-xs">
                                  {feature.estimatedTime || '15 min'}
                                </span>
                                <Button variant="outline" size="sm">
                                  View Guide
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
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