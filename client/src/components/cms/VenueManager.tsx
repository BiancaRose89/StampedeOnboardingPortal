import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Building2, Users, Calendar, Settings, MapPin, Package } from "lucide-react";

interface OnboardingFeature {
  id: number;
  featureKey: string;
  name: string;
  description: string;
  category: 'core' | 'advanced' | 'premium';
  estimatedTime: string;
  taskCount: number;
  sortOrder: number;
}

interface Venue {
  id: number;
  name: string;
  venueId: string;
  goLiveDate: string;
  selectedFeatures: string[];
  teamMembers: Array<{name: string; email: string; role: string}>;
  packageType: string;
  status: string;
  progressData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface VenueFormData {
  name: string;
  venueId: string;
  goLiveDate: string;
  selectedFeatures: string[];
  teamMembers: Array<{name: string; email: string; role: string}>;
  packageType: string;
  userId: number;
}

interface VenueCardProps {
  venue: Venue;
  features: OnboardingFeature[];
}

function VenueCard({ venue, features }: VenueCardProps) {
  const selectedFeaturesList = features.filter(f => venue.selectedFeatures.includes(f.featureKey));
  const totalTasks = selectedFeaturesList.reduce((sum, f) => sum + f.taskCount, 0);
  const completedTasks = Math.floor(totalTasks * 0.65); // Mock completion percentage

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400';
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  return (
    <Card className="bg-[#0D0D24] border-gray-800 hover:border-[#FF389A] transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-white text-lg">{venue.name}</CardTitle>
            <p className="text-gray-400 text-sm mt-1">ID: {venue.venueId}</p>
          </div>
          <Badge variant="outline" className={getStatusColor(venue.status)}>
            {venue.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Go-Live:</span>
            <p className="text-white">{new Date(venue.goLiveDate).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-gray-400">Package:</span>
            <p className="text-white capitalize">{venue.packageType}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-white">{completedTasks}/{totalTasks} tasks</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-[#FF389A] h-2 rounded-full transition-all"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{Math.round((completedTasks / totalTasks) * 100)}% complete</p>
        </div>

        <div className="space-y-2">
          <span className="text-gray-400 text-sm">Selected Features ({selectedFeaturesList.length})</span>
          <div className="flex flex-wrap gap-1">
            {selectedFeaturesList.slice(0, 3).map((feature) => (
              <Badge key={feature.featureKey} variant="secondary" className="text-xs">
                {feature.name}
              </Badge>
            ))}
            {selectedFeaturesList.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{selectedFeaturesList.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
            <Users className="h-3 w-3 mr-1" />
            View Team
          </Button>
          <Button variant="outline" size="sm" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
            <Settings className="h-3 w-3 mr-1" />
            Manage Features
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface VenueFormDialogProps {
  venue?: Venue;
  features: OnboardingFeature[];
  onSubmit: (data: VenueFormData) => void;
  isLoading: boolean;
}

function VenueFormDialog({ venue, features, onSubmit, isLoading }: VenueFormDialogProps) {
  const [formData, setFormData] = useState<VenueFormData>({
    name: venue?.name || '',
    venueId: venue?.venueId || '',
    goLiveDate: venue?.goLiveDate ? venue.goLiveDate.split('T')[0] : '',
    selectedFeatures: venue?.selectedFeatures || [],
    teamMembers: venue?.teamMembers || [],
    packageType: venue?.packageType || 'standard',
    userId: 1, // Current user ID - would come from auth context
  });

  const handleFeatureToggle = (featureKey: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureKey)
        ? prev.selectedFeatures.filter(f => f !== featureKey)
        : [...prev.selectedFeatures, featureKey]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      case 'advanced': return 'bg-purple-500/20 text-purple-300 border-purple-400';
      case 'premium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) acc[feature.category] = [];
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, OnboardingFeature[]>);

  return (
    <DialogContent className="bg-[#0D0D24] border-gray-600 max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-white">
          {venue ? 'Edit Venue Features' : 'Add New Venue'}
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Venue Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-[#1A1A2E] border-gray-600 text-white"
              placeholder="Enter venue name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="venueId" className="text-gray-300">Venue ID</Label>
            <Input
              id="venueId"
              value={formData.venueId}
              onChange={(e) => setFormData(prev => ({ ...prev, venueId: e.target.value }))}
              className="bg-[#1A1A2E] border-gray-600 text-white"
              placeholder="venue_001"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="goLiveDate" className="text-gray-300">Go-Live Date</Label>
            <Input
              id="goLiveDate"
              type="date"
              value={formData.goLiveDate}
              onChange={(e) => setFormData(prev => ({ ...prev, goLiveDate: e.target.value }))}
              className="bg-[#1A1A2E] border-gray-600 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="packageType" className="text-gray-300">Package Type</Label>
            <Select 
              value={formData.packageType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, packageType: value }))}
            >
              <SelectTrigger className="bg-[#1A1A2E] border-gray-600 text-white">
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A2E] border-gray-600">
                <SelectItem value="basic">Basic Package</SelectItem>
                <SelectItem value="standard">Standard Package</SelectItem>
                <SelectItem value="premium">Premium Package</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Feature Selection */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Select Onboarding Features</h3>
            <p className="text-sm text-gray-400 mb-4">
              Choose which features this venue will include in their onboarding process
            </p>
          </div>

          {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-md font-medium text-gray-300 capitalize flex items-center gap-2">
                <Badge variant="outline" className={getCategoryColor(category)}>
                  {category}
                </Badge>
                Features
              </h4>
              
              <div className="grid gap-3">
                {categoryFeatures.map((feature) => (
                  <div 
                    key={feature.featureKey}
                    className="flex items-start space-x-3 p-3 bg-[#1A1A2E] rounded-lg border border-gray-600"
                  >
                    <Checkbox
                      id={feature.featureKey}
                      checked={formData.selectedFeatures.includes(feature.featureKey)}
                      onCheckedChange={() => handleFeatureToggle(feature.featureKey)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label 
                          htmlFor={feature.featureKey} 
                          className="text-white font-medium cursor-pointer"
                        >
                          {feature.name}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {feature.taskCount} tasks
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {feature.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#1A1A2E] rounded-lg p-4 border border-gray-600">
          <h4 className="text-white font-medium mb-2">Selection Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Selected Features:</span>
              <span className="text-white ml-2">{formData.selectedFeatures.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Total Tasks:</span>
              <span className="text-white ml-2">
                {features
                  .filter(f => formData.selectedFeatures.includes(f.featureKey))
                  .reduce((sum, f) => sum + f.taskCount, 0)}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Est. Time:</span>
              <span className="text-white ml-2">
                {formData.selectedFeatures.length > 0 ? 'Varies by selection' : '0 hours'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-600">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setFormData(prev => ({ ...prev, selectedFeatures: [] }))}
          >
            Clear All
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || !formData.name || formData.selectedFeatures.length === 0}
            className="bg-[#FF389A] hover:bg-[#E6329C]"
          >
            {isLoading ? 'Saving...' : venue ? 'Update Venue' : 'Create Venue'}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}

export default function VenueManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch onboarding features
  const { data: features = [] } = useQuery({
    queryKey: ['/api/cms/onboarding-features'],
    queryFn: () => fetch('/api/cms/onboarding-features').then(res => res.json()),
  }) as { data: OnboardingFeature[] };

  // Fetch venues
  const { data: venues = [] } = useQuery({
    queryKey: ['/api/cms/venues'],
    queryFn: () => fetch('/api/cms/venues').then(res => res.json()),
  }) as { data: Venue[] };

  // Create venue mutation
  const createVenueMutation = useMutation({
    mutationFn: (data: VenueFormData) => 
      fetch('/api/cms/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/venues'] });
      toast({
        title: "Success",
        description: "Venue created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create venue",
        variant: "destructive",
      });
    },
  });

  const handleCreateVenue = (data: VenueFormData) => {
    createVenueMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Venue Onboarding Management</h2>
          <p className="text-gray-400">Manage venue onboarding tasks and feature assignments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#FF389A] hover:bg-[#E6329C]">
              <Plus className="h-4 w-4 mr-2" />
              Add Venue
            </Button>
          </DialogTrigger>
          <VenueFormDialog
            features={features}
            onSubmit={handleCreateVenue}
            isLoading={createVenueMutation.isPending}
          />
        </Dialog>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <VenueCard 
            key={venue.id} 
            venue={venue} 
            features={features}
          />
        ))}
      </div>

      {venues.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No venues yet</h3>
          <p className="text-gray-500 mb-6">Create your first venue to start managing onboarding tasks</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#FF389A] hover:bg-[#E6329C]">
                <Plus className="h-4 w-4 mr-2" />
                Add First Venue
              </Button>
            </DialogTrigger>
            <VenueFormDialog
              features={features}
              onSubmit={handleCreateVenue}
              isLoading={createVenueMutation.isPending}
            />
          </Dialog>
        </div>
      )}
    </div>
  );
}