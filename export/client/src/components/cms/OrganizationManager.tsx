import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, MapPin, Plus, Users, Calendar, BarChart3, Trash2, Edit, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { Organization, Venue, OnboardingFeature } from '@shared/schema';

interface OrganizationWithVenues extends Organization {
  venues?: Venue[];
}

export default function OrganizationManager() {
  const [isAddOrgDialogOpen, setIsAddOrgDialogOpen] = useState(false);
  const [isAddVenueDialogOpen, setIsAddVenueDialogOpen] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [expandedOrgs, setExpandedOrgs] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  // Fetch organizations
  const { data: organizations = [], isLoading: isLoadingOrgs } = useQuery({
    queryKey: ['/api/cms/organizations'],
  });

  // Fetch onboarding features
  const { data: features = [] } = useQuery({
    queryKey: ['/api/cms/features'],
  });

  // Create organization mutation
  const createOrgMutation = useMutation({
    mutationFn: async (orgData: any) => {
      return await apiRequest('/api/cms/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orgData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/organizations'] });
      setIsAddOrgDialogOpen(false);
    },
  });

  // Create venue mutation
  const createVenueMutation = useMutation({
    mutationFn: async (venueData: any) => {
      return await apiRequest('/api/cms/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venueData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/organizations'] });
      queryClient.invalidateQueries({ queryKey: ['/api/cms/venues'] });
      setIsAddVenueDialogOpen(false);
    },
  });

  const toggleOrgExpansion = (orgId: number) => {
    const newExpanded = new Set(expandedOrgs);
    if (newExpanded.has(orgId)) {
      newExpanded.delete(orgId);
    } else {
      newExpanded.add(orgId);
    }
    setExpandedOrgs(newExpanded);
  };

  const filteredOrganizations = organizations.filter((org: Organization) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.organizationId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Organization Management</h2>
          <p className="text-gray-400 mt-1">Manage organizations and their venues with custom onboarding features</p>
        </div>
        <AddOrganizationDialog
          isOpen={isAddOrgDialogOpen}
          onOpenChange={setIsAddOrgDialogOpen}
          onSubmit={createOrgMutation.mutate}
          isSubmitting={createOrgMutation.isPending}
        />
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1A1A2E] border-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Organizations List */}
      <div className="space-y-4">
        {isLoadingOrgs ? (
          <div className="text-center py-8 text-gray-400">Loading organizations...</div>
        ) : filteredOrganizations.length === 0 ? (
          <Card className="bg-[#0D0D24] border-gray-800">
            <CardContent className="p-8 text-center">
              <Building2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Organizations Found</h3>
              <p className="text-gray-400 mb-4">Get started by creating your first organization</p>
              <Button
                onClick={() => setIsAddOrgDialogOpen(true)}
                className="bg-[#FF389A] hover:bg-[#E6337A] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Organization
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredOrganizations.map((org: OrganizationWithVenues) => (
            <OrganizationCard
              key={org.id}
              organization={org}
              isExpanded={expandedOrgs.has(org.id)}
              onToggleExpansion={() => toggleOrgExpansion(org.id)}
              onAddVenue={() => {
                setSelectedOrgId(org.id);
                setIsAddVenueDialogOpen(true);
              }}
              features={features}
            />
          ))
        )}
      </div>

      {/* Add Venue Dialog */}
      <AddVenueDialog
        isOpen={isAddVenueDialogOpen}
        onOpenChange={setIsAddVenueDialogOpen}
        organizationId={selectedOrgId}
        onSubmit={createVenueMutation.mutate}
        isSubmitting={createVenueMutation.isPending}
        features={features}
      />
    </div>
  );
}

interface OrganizationCardProps {
  organization: OrganizationWithVenues;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onAddVenue: () => void;
  features: OnboardingFeature[];
}

function OrganizationCard({ organization, isExpanded, onToggleExpansion, onAddVenue, features }: OrganizationCardProps) {
  const { data: venues = [] } = useQuery({
    queryKey: ['/api/cms/venues', organization.id],
    queryFn: () => apiRequest(`/api/cms/organizations/${organization.id}/venues`),
  });

  const liveVenues = venues.filter((venue: Venue) => venue.status === 'live').length;
  const progressStats = venues.reduce((acc: any, venue: Venue) => {
    acc.totalTasks += venue.totalTasks || 0;
    acc.completedTasks += venue.completedTasks || 0;
    return acc;
  }, { totalTasks: 0, completedTasks: 0 });

  const overallProgress = progressStats.totalTasks > 0 
    ? Math.round((progressStats.completedTasks / progressStats.totalTasks) * 100) 
    : 0;

  return (
    <Card className="bg-[#0D0D24] border-gray-800">
      <Collapsible open={isExpanded} onOpenChange={onToggleExpansion}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-[#1A1A2E] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-white">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 mr-2" />
                  ) : (
                    <ChevronRight className="h-5 w-5 mr-2" />
                  )}
                  <Building2 className="h-6 w-6 mr-3 text-[#FF389A]" />
                  <div>
                    <CardTitle className="text-white">{organization.name}</CardTitle>
                    {organization.organizationId && (
                      <p className="text-sm text-gray-400">ID: {organization.organizationId}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    {liveVenues} of {venues.length} venues live
                  </div>
                  <div className="text-sm text-gray-400">
                    {overallProgress}% overall progress
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    organization.status === 'active'
                      ? 'border-green-500 text-green-400 bg-green-500/10'
                      : 'border-yellow-500 text-yellow-400 bg-yellow-500/10'
                  }
                >
                  {organization.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white">Venues ({venues.length})</h4>
                <Button
                  onClick={onAddVenue}
                  size="sm"
                  className="bg-[#FF389A] hover:bg-[#E6337A] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Venue
                </Button>
              </div>

              {venues.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <p>No venues added yet</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {venues.map((venue: Venue) => (
                    <VenueCard key={venue.id} venue={venue} features={features} />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

interface VenueCardProps {
  venue: Venue;
  features: OnboardingFeature[];
}

function VenueCard({ venue, features }: VenueCardProps) {
  const selectedFeatures = Array.isArray(venue.selectedFeatures) 
    ? venue.selectedFeatures 
    : [];

  const venueFeatures = features.filter(feature => 
    selectedFeatures.includes(feature.featureKey)
  );

  const progress = venue.totalTasks > 0 
    ? Math.round((venue.completedTasks / venue.totalTasks) * 100) 
    : 0;

  return (
    <Card className="bg-[#1A1A2E] border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="font-medium text-white">{venue.name}</h5>
          <Badge
            variant="outline"
            className={
              venue.status === 'live'
                ? 'border-green-500 text-green-400 bg-green-500/10'
                : venue.status === 'in-progress'
                ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10'
                : 'border-gray-500 text-gray-400 bg-gray-500/10'
            }
          >
            {venue.status}
          </Badge>
        </div>

        {venue.venueId && (
          <p className="text-xs text-gray-400 mb-2">ID: {venue.venueId}</p>
        )}

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-[#FF389A] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{venue.completedTasks || 0} of {venue.totalTasks || 0} tasks</span>
            {venue.goLiveDate && (
              <span>Go-live: {new Date(venue.goLiveDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-gray-400">Features ({venueFeatures.length})</div>
          <div className="flex flex-wrap gap-1">
            {venueFeatures.slice(0, 3).map((feature) => (
              <Badge
                key={feature.id}
                variant="secondary"
                className="text-xs bg-[#FF389A]/20 text-[#FF389A] border-[#FF389A]/30"
              >
                {feature.name}
              </Badge>
            ))}
            {venueFeatures.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                +{venueFeatures.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface AddOrganizationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

function AddOrganizationDialog({ isOpen, onOpenChange, onSubmit, isSubmitting }: AddOrganizationDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    organizationId: '',
    packageType: 'standard',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      organizationId: '',
      packageType: 'standard',
    });
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF389A] hover:bg-[#E6337A] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D0D24] border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Organization Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1A1A2E] border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="organizationId">Organization ID</Label>
            <Input
              id="organizationId"
              value={formData.organizationId}
              onChange={(e) => setFormData({ ...formData, organizationId: e.target.value })}
              className="bg-[#1A1A2E] border-gray-700 text-white"
              placeholder="e.g., ORG-001"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#1A1A2E] border-gray-700 text-white"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="bg-[#1A1A2E] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="packageType">Package Type</Label>
            <Select
              value={formData.packageType}
              onValueChange={(value) => setFormData({ ...formData, packageType: value })}
            >
              <SelectTrigger className="bg-[#1A1A2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A2E] border-gray-700">
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name}
              className="bg-[#FF389A] hover:bg-[#E6337A] text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create Organization'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface AddVenueDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: number | null;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  features: OnboardingFeature[];
}

function AddVenueDialog({ isOpen, onOpenChange, organizationId, onSubmit, isSubmitting, features }: AddVenueDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    venueId: '',
    description: '',
    address: '',
    goLiveDate: '',
    selectedFeatures: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId) return;

    const totalTasks = formData.selectedFeatures.reduce((sum, featureKey) => {
      const feature = features.find(f => f.featureKey === featureKey);
      return sum + (feature?.taskCount || 0);
    }, 0);

    onSubmit({
      ...formData,
      organizationId,
      totalTasks,
      completedTasks: 0,
      progressPercentage: 0,
      goLiveDate: formData.goLiveDate ? new Date(formData.goLiveDate) : null,
    });
  };

  const toggleFeature = (featureKey: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureKey)
        ? prev.selectedFeatures.filter(key => key !== featureKey)
        : [...prev.selectedFeatures, featureKey]
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      venueId: '',
      description: '',
      address: '',
      goLiveDate: '',
      selectedFeatures: [],
    });
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) acc[feature.category] = [];
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, OnboardingFeature[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0D0D24] border-gray-800 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Venue</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Venue Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#1A1A2E] border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="venueId">Venue ID</Label>
              <Input
                id="venueId"
                value={formData.venueId}
                onChange={(e) => setFormData({ ...formData, venueId: e.target.value })}
                className="bg-[#1A1A2E] border-gray-700 text-white"
                placeholder="e.g., VEN-001"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#1A1A2E] border-gray-700 text-white"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="goLiveDate">Go-Live Date</Label>
            <Input
              id="goLiveDate"
              type="date"
              value={formData.goLiveDate}
              onChange={(e) => setFormData({ ...formData, goLiveDate: e.target.value })}
              className="bg-[#1A1A2E] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label>Select Onboarding Features</Label>
            <div className="space-y-4 mt-2">
              {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-300 capitalize mb-2">
                    {category} Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {categoryFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center space-x-3 p-3 bg-[#1A1A2E] rounded-lg border border-gray-700"
                      >
                        <Checkbox
                          id={`feature-${feature.id}`}
                          checked={formData.selectedFeatures.includes(feature.featureKey)}
                          onCheckedChange={() => toggleFeature(feature.featureKey)}
                          className="border-gray-600"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={`feature-${feature.id}`}
                            className="text-sm font-medium text-white cursor-pointer"
                          >
                            {feature.name}
                          </Label>
                          <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>{feature.taskCount} tasks</span>
                            <span>{feature.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || formData.selectedFeatures.length === 0}
              className="bg-[#FF389A] hover:bg-[#E6337A] text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create Venue'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}