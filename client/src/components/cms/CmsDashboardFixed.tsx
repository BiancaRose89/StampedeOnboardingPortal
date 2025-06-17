import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Settings, 
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Star,
  TrendingDown,
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
import VenueManager from './VenueManager';

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

export default function CmsDashboardFixed({ admin, onLogout }: CmsDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeContentTab, setActiveContentTab] = useState('content');
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF389A] to-white bg-clip-text text-transparent">
              Stampede CMS
            </h1>
            <p className="text-gray-400 mt-1">Content Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="font-medium">{admin.name}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Main Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-[#1A1A1A] border-gray-800">
            <TabsTrigger 
              value="admin" 
              className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
            >
              Admin
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
            >
              Content
            </TabsTrigger>
          </TabsList>

          {/* Admin Section */}
          <TabsContent value="admin">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-[#1A1A1A] border-gray-800">
                <TabsTrigger 
                  value="dashboard" 
                  className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="venues" 
                  className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
                >
                  Venues Onboarded
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
                >
                  Users
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Analytics Cards */}
                  <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Total Venues</p>
                          <p className="text-3xl font-bold text-white">247</p>
                          <p className="text-blue-200 text-xs">+12% this month</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Completion Rate</p>
                          <p className="text-3xl font-bold text-white">89.2%</p>
                          <p className="text-green-200 text-xs">+5.4% this week</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">Active Sessions</p>
                          <p className="text-3xl font-bold text-white">34</p>
                          <p className="text-purple-200 text-xs">Live now</p>
                        </div>
                        <Activity className="h-8 w-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-600 to-orange-800 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm">Avg. Time</p>
                          <p className="text-3xl font-bold text-white">2.4h</p>
                          <p className="text-orange-200 text-xs">Per onboarding</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-[#1A1A1A] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { action: "New venue onboarded", venue: "Pizza Palace", time: "2 hours ago" },
                          { action: "Feature configuration updated", venue: "Burger Barn", time: "4 hours ago" },
                          { action: "Training completed", venue: "Sushi Central", time: "6 hours ago" }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <p className="text-white font-medium">{activity.action}</p>
                              <p className="text-gray-400 text-sm">{activity.venue}</p>
                            </div>
                            <span className="text-gray-500 text-xs">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#1A1A1A] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Feature Adoption</span>
                          <span className="text-white font-bold">92%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">User Satisfaction</span>
                          <span className="text-white font-bold">4.8/5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Support Tickets</span>
                          <span className="text-white font-bold">12</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Venues Tab */}
              <TabsContent value="venues">
                <OrganizationManager />
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">System Activity Log</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-400">Activity monitoring will be displayed here.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-400">User management tools will be displayed here.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Content Section */}
          <TabsContent value="content">
            <Tabs value={activeContentTab} onValueChange={setActiveContentTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-[#1A1A1A] border-gray-800">
                <TabsTrigger 
                  value="content" 
                  className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger 
                  value="master-platform" 
                  className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
                >
                  Master Platform
                </TabsTrigger>
                <TabsTrigger 
                  value="onboarding-setup" 
                  className="data-[state=active]:bg-[#FF389A] data-[state=active]:text-white"
                >
                  Onboarding Setup Tasks
                </TabsTrigger>
              </TabsList>

              {/* Content Sub-tab */}
              <TabsContent value="content">
                <div className="space-y-6">
                  <Card className="bg-[#1A1A1A] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-[#FF389A]" />
                        Front-facing Landing Page Content
                      </CardTitle>
                      <p className="text-gray-400">Manage individual content blocks and sections for the public-facing website</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Hero Section */}
                        <Card className="bg-[#0D0D24] border-gray-800 hover:border-[#FF389A] transition-colors cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                                1
                              </div>
                              <Star className="h-6 w-6 text-[#FF389A]" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Hero Section</h3>
                            <p className="text-gray-400 mb-4">Main headline, subheading, and call-to-action button</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-blue-900 text-blue-200">
                                Critical
                              </Badge>
                              <Button variant="outline" size="sm" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
                                <Upload className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Features Overview */}
                        <Card className="bg-[#0D0D24] border-gray-800 hover:border-[#FF389A] transition-colors cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center text-white font-bold">
                                2
                              </div>
                              <BookOpen className="h-6 w-6 text-[#FF389A]" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Features Overview</h3>
                            <p className="text-gray-400 mb-4">Key platform features and benefits grid</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-green-900 text-green-200">
                                Important
                              </Badge>
                              <Button variant="outline" size="sm" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
                                <Upload className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Process Steps */}
                        <Card className="bg-[#0D0D24] border-gray-800 hover:border-[#FF389A] transition-colors cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold">
                                3
                              </div>
                              <Target className="h-6 w-6 text-[#FF389A]" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Process Steps</h3>
                            <p className="text-gray-400 mb-4">Step-by-step onboarding process visualization</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-purple-900 text-purple-200">
                                Medium
                              </Badge>
                              <Button variant="outline" size="sm" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
                                <Upload className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Testimonials */}
                        <Card className="bg-[#0D0D24] border-gray-800 hover:border-[#FF389A] transition-colors cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-800 rounded-full flex items-center justify-center text-white font-bold">
                                4
                              </div>
                              <MessageSquare className="h-6 w-6 text-[#FF389A]" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Testimonials</h3>
                            <p className="text-gray-400 mb-4">Customer success stories and reviews</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-orange-900 text-orange-200">
                                Important
                              </Badge>
                              <Button variant="outline" size="sm" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
                                <Upload className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* FAQ Section */}
                        <Card className="bg-[#0D0D24] border-gray-800 hover:border-[#FF389A] transition-colors cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold">
                                5
                              </div>
                              <AlertCircle className="h-6 w-6 text-[#FF389A]" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">FAQ Section</h3>
                            <p className="text-gray-400 mb-4">Frequently asked questions and answers</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-red-900 text-red-200">
                                Medium
                              </Badge>
                              <Button variant="outline" size="sm" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
                                <Upload className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Footer CTA */}
                        <Card className="bg-[#0D0D24] border-gray-800 hover:border-[#FF389A] transition-colors cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-pink-800 rounded-full flex items-center justify-center text-white font-bold">
                                6
                              </div>
                              <ArrowRight className="h-6 w-6 text-[#FF389A]" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Footer CTA</h3>
                            <p className="text-gray-400 mb-4">Bottom call-to-action and contact information</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-pink-900 text-pink-200">
                                Critical
                              </Badge>
                              <Button variant="outline" size="sm" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
                                <Upload className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Master Platform Sub-tab */}
              <TabsContent value="master-platform">
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Crown className="h-5 w-5 text-[#FF389A]" />
                      Platform Setup & Configuration
                    </CardTitle>
                    <p className="text-gray-400">Complete training modules and learning paths for venue staff</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Step 1: Account Setup */}
                      <Card className="bg-[#0D0D24] border-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-6">
                            {/* Phone Mockup */}
                            <div className="flex-shrink-0">
                              <div className="w-48 h-96 bg-black rounded-3xl border-4 border-gray-800 p-2 relative">
                                <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
                                  {/* Status bar */}
                                  <div className="h-6 bg-gray-800 flex items-center justify-between px-4 text-xs text-white">
                                    <span>9:41</span>
                                    <div className="flex gap-1">
                                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                                      <div className="w-1 h-2 bg-white rounded-sm"></div>
                                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                                    </div>
                                  </div>
                                  {/* Content */}
                                  <div className="p-4 space-y-3">
                                    <div className="h-8 bg-[#FF389A] rounded flex items-center justify-center">
                                      <span className="text-white text-sm font-bold">Stampede</span>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                                      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="h-12 bg-gray-800 rounded"></div>
                                      <div className="h-12 bg-gray-800 rounded"></div>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="h-2 bg-gray-700 rounded"></div>
                                      <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#FF389A] to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                  1
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-white">Account Setup</h3>
                                  <p className="text-gray-400">We'll begin setup behind the scenes to prepare your platform</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                                  <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      Platform configuration and branding
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      Initial user accounts creation
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      Security settings and permissions
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      Integration with existing systems
                                    </li>
                                  </ul>
                                </div>

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
                          </div>
                        </CardContent>
                      </Card>
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