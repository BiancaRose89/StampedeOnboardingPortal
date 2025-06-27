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

export function VenueManager() {
  const [isAddVenueOpen, setIsAddVenueOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: venues = [], isLoading: venuesLoading } = useQuery({
    queryKey: ['/api/cms/venues'],
  });

  const { data: features = [] } = useQuery({
    queryKey: ['/api/cms/features'],
  });

  const createVenueMutation = useMutation({
    mutationFn: async (venueData: VenueFormData) => {
      return apiRequest('/api/cms/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venueData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/venues'] });
      setIsAddVenueOpen(false);
      toast({ title: "Venue created", description: "New venue added successfully with selected features" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create venue", variant: "destructive" });
    },
  });

  const updateVenueMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Venue> }) => {
      return apiRequest(`/api/cms/venues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/venues'] });
      setEditingVenue(null);
      toast({ title: "Venue updated", description: "Feature selection and details updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update venue", variant: "destructive" });
    },
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      case 'advanced': return 'bg-purple-500/20 text-purple-300 border-purple-400';
      case 'premium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'setup': return 'bg-orange-500/20 text-orange-300 border-orange-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-400';
      case 'live': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Venue Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Venue Management</h2>
          <p className="text-gray-400">Manage venues and customize onboarding features</p>
        </div>
        
        <Dialog open={isAddVenueOpen} onOpenChange={setIsAddVenueOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF389A] hover:bg-[#E6329C]">
              <Plus className="h-4 w-4 mr-2" />
              Add Venue
            </Button>
          </DialogTrigger>
          <VenueFormDialog 
            features={features}
            onSubmit={(data) => createVenueMutation.mutate(data)}
            isLoading={createVenueMutation.isPending}
          />
        </Dialog>
      </div>

      {/* Venues List */}
      {venuesLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#1A1A2E] border-gray-600 animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : venues.length === 0 ? (
        <Card className="bg-[#1A1A2E] border-gray-600">
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No venues yet</h3>
            <p className="text-gray-400 mb-4">Create your first venue to start managing onboarding flows</p>
            <Button 
              onClick={() => setIsAddVenueOpen(true)}
              className="bg-[#FF389A] hover:bg-[#E6329C]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Venue
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {venues.map((venue: Venue) => (
            <VenueCard 
              key={venue.id}
              venue={venue}
              features={features}
              onEdit={setEditingVenue}
              getCategoryColor={getCategoryColor}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      )}

      {/* Edit Venue Dialog */}
      {editingVenue && (
        <Dialog open={!!editingVenue} onOpenChange={() => setEditingVenue(null)}>
          <VenueFormDialog 
            venue={editingVenue}
            features={features}
            onSubmit={(data) => updateVenueMutation.mutate({ id: editingVenue.id, updates: data })}
            isLoading={updateVenueMutation.isPending}
          />
        </Dialog>
      )}
    </div>
  );
}

interface VenueCardProps {
  venue: Venue;
  features: OnboardingFeature[];
  onEdit: (venue: Venue) => void;
  getCategoryColor: (category: string) => string;
  getStatusColor: (status: string) => string;
}

function VenueCard({ venue, features, onEdit, getCategoryColor, getStatusColor }: VenueCardProps) {
  const selectedFeatures = features.filter(f => venue.selectedFeatures.includes(f.featureKey));
  const totalTasks = selectedFeatures.reduce((sum, f) => sum + f.taskCount, 0);
  const daysToGoLive = Math.ceil((new Date(venue.goLiveDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="bg-[#1A1A2E] border-gray-600 hover:border-[#FF389A]/50 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#FF389A]" />
              {venue.name}
            </CardTitle>
            <p className="text-gray-400 text-sm mt-1">ID: {venue.venueId}</p>
          </div>
          <Badge variant="outline" className={getStatusColor(venue.status)}>
            {venue.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0D0D24] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Package className="h-4 w-4 text-[#FF389A]" />
              <span className="text-xs text-gray-400">Package</span>
            </div>
            <div className="text-sm font-semibold text-white capitalize">{venue.packageType}</div>
          </div>
          
          <div className="bg-[#0D0D24] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-[#FF389A]" />
              <span className="text-xs text-gray-400">Go-Live</span>
            </div>
            <div className="text-sm font-semibold text-white">
              {daysToGoLive > 0 ? `${daysToGoLive} days` : 'Overdue'}
            </div>
          </div>
          
          <div className="bg-[#0D0D24] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Settings className="h-4 w-4 text-[#FF389A]" />
              <span className="text-xs text-gray-400">Tasks</span>
            </div>
            <div className="text-sm font-semibold text-white">{totalTasks} total</div>
          </div>
        </div>

        {/* Selected Features */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Selected Features ({selectedFeatures.length})</h4>
          <div className="flex flex-wrap gap-2">
            {selectedFeatures.map((feature) => (
              <Badge 
                key={feature.featureKey} 
                variant="outline" 
                className={`${getCategoryColor(feature.category)} text-xs`}
              >
                {feature.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Team Members */}
        {venue.teamMembers && venue.teamMembers.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Team Members</h4>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">{venue.teamMembers.length} members</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-600">
          <span className="text-xs text-gray-400">
            Created {new Date(venue.createdAt).toLocaleDateString()}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(venue)}
            className="text-[#FF389A] border-[#FF389A]/30 hover:bg-[#FF389A]/10"
          >
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