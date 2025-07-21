import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/AuthProvider';
import { 
  User, 
  Building2, 
  Edit3, 
  Check, 
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { 
  Users, 
  Wifi, 
  Target, 
  MessageSquare, 
  Star, 
  Gift, 
  Calendar, 
  ArrowRight, 
  Play, 
  Clock, 
  CheckCircle 
} from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  isEditing: boolean;
}

export default function VenueOnboardingManager() {
  const { firebaseUser } = useAuth();
  const [userName, setUserName] = useState('');
  const [venueCount, setVenueCount] = useState<number | ''>('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [activeVenue, setActiveVenue] = useState<string>('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);

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

    setVenues(newVenues);
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

  const startEditing = (venueId: string) => {
    setVenues(venues.map(venue => 
      venue.id === venueId 
        ? { ...venue, isEditing: true }
        : { ...venue, isEditing: false }
    ));
  };

  const cancelEditing = (venueId: string) => {
    setVenues(venues.map(venue => 
      venue.id === venueId 
        ? { ...venue, isEditing: false }
        : venue
    ));
  };

  const addVenue = () => {
    const newVenue: Venue = {
      id: `venue-${venues.length + 1}`,
      name: `Venue ${venues.length + 1}`,
      isEditing: false
    };
    setVenues([...venues, newVenue]);
    setActiveVenue(newVenue.id);
  };

  const removeVenue = (venueId: string) => {
    if (venues.length <= 1) return;
    
    const filteredVenues = venues.filter(venue => venue.id !== venueId);
    setVenues(filteredVenues);
    
    if (activeVenue === venueId) {
      setActiveVenue(filteredVenues[0]?.id || '');
    }
  };

  const resetSetup = () => {
    setUserName('');
    setVenueCount('');
    setVenues([]);
    setActiveVenue('');
    setIsSetupComplete(false);
  };

  if (!isSetupComplete) {
    return (
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Onboarding Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's get started by setting up your venue information
            </p>
          </div>

          <Card className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSetupSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="userName" className="text-white text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-[#FF389A]" />
                    Your Name
                  </Label>
                  <Input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-[#0D0D24]/50 border-[#FF389A]/30 text-white placeholder-gray-400 text-lg h-12"
                    required
                    aria-describedby="userName-description"
                  />
                  <p id="userName-description" className="text-sm text-gray-400">
                    This will personalize your onboarding experience
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venueCount" className="text-white text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[#FF389A]" />
                    Number of Venues
                  </Label>
                  <Input
                    id="venueCount"
                    type="number"
                    min="1"
                    max="10"
                    value={venueCount}
                    onChange={(e) => setVenueCount(e.target.value ? Number(e.target.value) : '')}
                    placeholder="How many venues are you onboarding?"
                    className="bg-[#0D0D24]/50 border-[#FF389A]/30 text-white placeholder-gray-400 text-lg h-12"
                    required
                    aria-describedby="venueCount-description"
                  />
                  <p id="venueCount-description" className="text-sm text-gray-400">
                    Each venue will have its own personalized onboarding checklist
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#FF389A] hover:bg-[#E6329C] text-white text-lg h-12 mt-8"
                  disabled={!userName.trim() || !venueCount}
                >
                  Start Onboarding Journey
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with user info and reset option */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Welcome, {userName}!
            </h2>
            <Button
              onClick={resetSetup}
              variant="outline"
              size="sm"
              className="border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
            >
              Change Setup
            </Button>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Complete the onboarding for each of your {venues.length} venue{venues.length !== 1 ? 's' : ''}
          </p>
          <div className="inline-flex items-center gap-3 bg-[#0D0D24] px-6 py-3 rounded-full border border-[#FF389A]/30">
            <span className="text-2xl font-bold text-[#FF389A]">0/{venues.length * 7}</span>
            <span className="text-gray-300">Total Tasks Complete</span>
          </div>
        </div>

        {/* Venue Tabs */}
        <div className="w-full">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#0D0D24]/50 border border-[#FF389A]/30 rounded-xl p-2 flex gap-1">
                {venues.map((venue) => (
                  <button
                    key={venue.id}
                    onClick={() => setActiveVenue(venue.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      activeVenue === venue.id
                        ? 'bg-[#FF389A] text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                    aria-label={`Switch to ${venue.name} onboarding`}
                    role="tab"
                    aria-selected={activeVenue === venue.id}
                  >
                    <Building2 className="h-4 w-4" />
                    {venue.isEditing ? (
                      <VenueNameEditor
                        venue={venue}
                        onSave={(newName) => handleVenueNameEdit(venue.id, newName)}
                        onCancel={() => cancelEditing(venue.id)}
                      />
                    ) : (
                      <>
                        <span>{venue.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(venue.id);
                          }}
                          className="h-6 w-6 p-0 hover:bg-white/10"
                          aria-label={`Edit ${venue.name} name`}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        {venues.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeVenue(venue.id);
                            }}
                            className="h-6 w-6 p-0 hover:bg-red-500/20 text-red-400"
                            aria-label={`Remove ${venue.name}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>
              
              {venues.length < 10 && (
                <Button
                  onClick={addVenue}
                  size="sm"
                  className="bg-[#FF389A]/20 border border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/30"
                  aria-label="Add new venue"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Venue Content */}
          <div role="tabpanel" aria-labelledby={`tab-${activeVenue}`}>
            {venues.map((venue) => (
              <div
                key={venue.id}
                className={venue.id === activeVenue ? 'block' : 'hidden'}
              >
                <div className="mb-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {venue.name} Onboarding Progress
                    </h3>
                    <p className="text-gray-300">
                      Complete these essential setup tasks for {venue.name}
                    </p>
                  </div>
                </div>
                
                {/* Onboarding sections for this specific venue */}
                <VenueSpecificOnboarding venueName={venue.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface VenueNameEditorProps {
  venue: Venue;
  onSave: (newName: string) => void;
  onCancel: () => void;
}

function VenueNameEditor({ venue, onSave, onCancel }: VenueNameEditorProps) {
  const [editingName, setEditingName] = useState(venue.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingName.trim()) {
      onSave(editingName.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <Input
        value={editingName}
        onChange={(e) => setEditingName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-6 w-24 text-xs bg-white/10 border-white/20 text-white"
        autoFocus
        aria-label="Edit venue name"
      />
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0 hover:bg-green-500/20 text-green-400"
        aria-label="Save venue name"
      >
        <Check className="h-3 w-3" />
      </Button>
      <Button
        type="button"
        onClick={onCancel}
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0 hover:bg-red-500/20 text-red-400"
        aria-label="Cancel editing"
      >
        <X className="h-3 w-3" />
      </Button>
    </form>
  );
}

interface VenueSpecificOnboardingProps {
  venueName: string;
}

function VenueSpecificOnboarding({ venueName }: VenueSpecificOnboardingProps) {
  const [currentModalStep, setCurrentModalStep] = useState(0);

  const onboardingBlocks = [
    {
      id: 'account-setup',
      title: 'Account Setup',
      description: `Complete your basic account configuration and business profile setup for ${venueName}`,
      icon: <Users className="h-10 w-10 text-white" />,
      progress: 85,
      status: 'in-progress' as const,
      estimatedTime: '10 minutes'
    },
    {
      id: 'bookings',
      title: 'Bookings',
      description: `Set up online booking system for appointments and reservations at ${venueName}`,
      icon: <Calendar className="h-10 w-10 text-white" />,
      progress: 0,
      status: 'not-started' as const,
      estimatedTime: '15 minutes'
    },
    {
      id: 'wifi',
      title: 'WiFi',
      description: `Configure guest WiFi portal for customer data capture at ${venueName}`,
      icon: <Wifi className="h-10 w-10 text-white" />,
      progress: 40,
      status: 'in-progress' as const,
      estimatedTime: '20 minutes'
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: `Launch automated marketing campaigns and customer communications for ${venueName}`,
      icon: <Target className="h-10 w-10 text-white" />,
      progress: 0,
      status: 'not-started' as const,
      estimatedTime: '25 minutes'
    },
    {
      id: 'loyalty',
      title: 'Loyalty',
      description: `Implement loyalty programs to increase customer retention at ${venueName}`,
      icon: <Star className="h-10 w-10 text-white" />,
      progress: 0,
      status: 'not-started' as const,
      estimatedTime: '15 minutes'
    },
    {
      id: 'reviews',
      title: 'Reviews',
      description: `Manage customer reviews and feedback collection for ${venueName}`,
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      progress: 0,
      status: 'not-started' as const,
      estimatedTime: '10 minutes'
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards',
      description: `Set up digital gift card sales and management system for ${venueName}`,
      icon: <Gift className="h-10 w-10 text-white" />,
      progress: 0,
      status: 'not-started' as const,
      estimatedTime: '12 minutes'
    }
  ];

  const completedTasks = onboardingBlocks.filter(block => block.status === 'completed').length;
  const totalTasks = onboardingBlocks.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-[#FF389A]';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-6 w-6 text-[#FF389A]" />;
      default:
        return <ArrowRight className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Summary */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-[#0D0D24] px-6 py-3 rounded-full border border-[#FF389A]/30">
          <span className="text-2xl font-bold text-[#FF389A]">{completedTasks}/{totalTasks}</span>
          <span className="text-gray-300">Tasks Complete</span>
        </div>
      </div>

      {/* Account Setup - Full Width Row */}
      <div className="mb-8">
        {onboardingBlocks.filter(block => block.id === 'account-setup').map((block) => (
          <Card key={block.id} className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 group-hover:scale-110 transition-transform duration-300">
                    {block.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">{block.title}</h3>
                    <p className="text-gray-300 text-xl mb-4">{block.description}</p>
                    <div className="flex items-center gap-4 text-lg text-gray-400">
                      <span className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {block.estimatedTime}
                      </span>
                      <span className="capitalize">{block.status.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-lg text-gray-400 mb-2">Progress</div>
                    <div className={`text-3xl font-bold ${getStatusColor(block.status)}`}>{block.progress}%</div>
                    <Progress 
                      value={block.progress} 
                      className="h-4 w-40 mt-3"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                      } as React.CSSProperties}
                    />
                  </div>
                  {getStatusIcon(block.status)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Other Onboarding Blocks - Larger Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {onboardingBlocks.filter(block => block.id !== 'account-setup').map((block) => (
          <Card key={block.id} className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 group-hover:scale-110 transition-transform duration-300">
                  {block.icon}
                </div>
                {getStatusIcon(block.status)}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{block.title}</h3>
              <p className="text-gray-300 text-lg mb-6">{block.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-400">Progress</span>
                  <span className={getStatusColor(block.status)}>{block.progress}%</span>
                </div>
                <Progress 
                  value={block.progress} 
                  className="h-3"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                  } as React.CSSProperties}
                />
                
                <div className="flex items-center justify-between text-base text-gray-400">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {block.estimatedTime}
                  </span>
                  <span className="capitalize">{block.status.replace('-', ' ')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}