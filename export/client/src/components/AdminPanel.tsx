import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Save, RefreshCw, Settings, Users, BarChart3 } from "lucide-react";
import type { GuideConfig, User } from "@shared/schema";

export default function AdminPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: guides = [], isLoading: guidesLoading } = useQuery<GuideConfig[]>({
    queryKey: ["/api/guides"],
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const updateGuideMutation = useMutation({
    mutationFn: async (guide: Partial<GuideConfig> & { id: number }) => {
      return await apiRequest("PATCH", `/api/guides/${guide.id}`, guide);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/guides"] });
      toast({
        title: "Success",
        description: "Guide configuration updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update guide configuration",
        variant: "destructive",
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (user: Partial<User> & { id: number }) => {
      return await apiRequest("PATCH", `/api/users/${user.id}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    },
  });

  const handleGuideUpdate = (guide: GuideConfig) => {
    updateGuideMutation.mutate(guide);
  };

  const handleUserToggle = (user: User) => {
    updateUserMutation.mutate({
      id: user.id,
      isActive: !user.isActive,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage onboarding portal configuration</p>
          </div>
          <Button 
            onClick={() => {
              queryClient.invalidateQueries();
              toast({ title: "Refreshed", description: "Data refreshed successfully" });
            }}
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="guides" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Guide Configuration
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Guide URLs</CardTitle>
                <p className="text-sm text-gray-600">
                  Configure the embedded guide URLs and settings
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {guidesLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading guide configurations...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {guides.map((guide) => (
                      <GuideConfigForm
                        key={guide.id}
                        guide={guide}
                        onUpdate={handleGuideUpdate}
                        isUpdating={updateGuideMutation.isPending}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-sm text-gray-600">
                  Manage user access and roles
                </p>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading users...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{user.name || user.email}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`user-${user.id}`} className="text-sm">
                              Active
                            </Label>
                            <Switch
                              id={`user-${user.id}`}
                              checked={user.isActive}
                              onCheckedChange={() => handleUserToggle(user)}
                              disabled={updateUserMutation.isPending}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {users.length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {users.filter(u => u.isActive).length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Admin Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    {users.filter(u => u.role === "admin").length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface GuideConfigFormProps {
  guide: GuideConfig;
  onUpdate: (guide: GuideConfig) => void;
  isUpdating: boolean;
}

function GuideConfigForm({ guide, onUpdate, isUpdating }: GuideConfigFormProps) {
  const [formData, setFormData] = useState(guide);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const isChanged = JSON.stringify(formData) !== JSON.stringify(guide);

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold capitalize">{guide.guideType} Guide</h3>
        <div className="flex items-center gap-2">
          <Switch
            checked={formData.isActive}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, isActive: checked }))
            }
          />
          <Label className="text-sm">Active</Label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`title-${guide.id}`}>Title</Label>
          <Input
            id={`title-${guide.id}`}
            value={formData.title}
            onChange={(e) => 
              setFormData(prev => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`url-${guide.id}`}>URL</Label>
          <Input
            id={`url-${guide.id}`}
            value={formData.url}
            onChange={(e) => 
              setFormData(prev => ({ ...prev, url: e.target.value }))
            }
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`description-${guide.id}`}>Description</Label>
        <Textarea
          id={`description-${guide.id}`}
          value={formData.description || ""}
          onChange={(e) => 
            setFormData(prev => ({ ...prev, description: e.target.value }))
          }
          rows={2}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!isChanged || isUpdating}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
