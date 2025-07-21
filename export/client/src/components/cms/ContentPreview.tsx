import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Star,
  Target,
  BarChart3,
  Users,
  Settings,
  Wifi,
  Gift,
  CheckCircle,
  Plus,
  Monitor,
  Smartphone
} from 'lucide-react';

interface ContentItem {
  id: number;
  key: string;
  title: string;
  content: any;
  isPublished: boolean;
  publishedAt: string | null;
  contentTypeId: number;
}

interface ContentType {
  id: number;
  name: string;
  displayName: string;
  description: string;
}

interface ContentPreviewProps {
  item: ContentItem | null;
  contentType: ContentType | null;
}

const iconMap = {
  Calendar: Calendar,
  Star: Star,
  Target: Target,
  BarChart3: BarChart3,
  Users: Users,
  Settings: Settings,
  Wifi: Wifi,
  Gift: Gift,
  CheckCircle: CheckCircle,
  CreditCard: Plus,
  Book: Plus,
  Rocket: Plus
};

export default function ContentPreview({ item, contentType }: ContentPreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!item || !contentType) {
    return (
      <Card className="bg-[#0D0D24] border-gray-800 h-full">
        <CardHeader>
          <CardTitle className="text-white">Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-gray-400">Select content to preview</p>
        </CardContent>
      </Card>
    );
  }

  const renderTrainingModulePreview = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 p-4 bg-[#1A1A2E] rounded-lg border border-gray-700">
        <div className="w-12 h-12 bg-[#FF389A]/20 rounded-full flex items-center justify-center">
          {(() => {
            const IconComponent = iconMap[item.content.icon as keyof typeof iconMap] || Calendar;
            return <IconComponent className="h-6 w-6 text-[#FF389A]" />;
          })()}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-lg">{item.content.title}</h3>
          <p className="text-gray-400 text-sm">{item.content.description}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-xs text-gray-500">⏱ {item.content.estimatedTime}</span>
            <Badge variant={item.content.completed ? "default" : "secondary"} className="text-xs">
              {item.content.completed ? "Completed" : "Pending"}
            </Badge>
          </div>
        </div>
        <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
          {item.content.completed && <CheckCircle className="h-4 w-4 text-green-400 fill-current" />}
        </div>
      </div>
    </div>
  );

  const renderPlatformFeaturePreview = () => (
    <div className="space-y-4">
      <Card className="bg-[#1A1A2E] border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              {(() => {
                const IconComponent = iconMap[item.content.icon as keyof typeof iconMap] || Settings;
                return <IconComponent className="h-6 w-6 text-blue-400" />;
              })()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-lg mb-2">{item.content.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{item.content.description}</p>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-xs">{item.content.category}</Badge>
                <Badge variant="outline" className="text-xs">{item.content.difficulty}</Badge>
                <span className="text-xs text-gray-500">{item.content.estimatedTime}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLiveExamplePreview = () => (
    <div className="space-y-4">
      <Card className="bg-[#1A1A2E] border-gray-700 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <p className="text-white text-sm">Interactive Demo</p>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-white mb-2">{item.content.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{item.content.description}</p>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">{item.content.category}</Badge>
            {item.content.tags?.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVenueOnboardingPreview = () => {
    const progressPercentage = Math.round((item.content.completedTasks / item.content.totalTasks) * 100) || 0;
    const daysToGoLive = Math.ceil((new Date(item.content.goLiveDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    
    return (
      <div className="space-y-6 p-6 bg-black min-h-screen">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">{item.content.pageTitle}</h1>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">
              {item.content.completedTasks}/{item.content.totalTasks} Total Tasks Complete
            </div>
            <div className="text-4xl font-bold text-[#FF389A]">{progressPercentage}% Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div 
            className="bg-[#FF389A] h-3 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Team Member Assignment Section */}
        <Card className="bg-[#1A1A2E] border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Team Member Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm">
              Tasks are assigned to team members for completion tracking and accountability.
            </p>
          </CardContent>
        </Card>

        {/* Tasks Outstanding */}
        <div className="flex items-center justify-between">
          <p className="text-gray-400">{item.content.tasksOutstandingText}</p>
          <div className="text-[#FF389A] font-bold">
            {daysToGoLive > 0 ? `${daysToGoLive} days to go-live` : 'Go-Live Date Reached!'}
          </div>
        </div>

        {/* Go-Live Date Section */}
        <Card className="bg-[#FF389A]/10 border-[#FF389A]/30">
          <CardContent className="p-4 text-center">
            <h3 className="text-[#FF389A] font-bold text-lg">{item.content.goLiveDateText}</h3>
            <div className="text-white text-2xl font-bold mt-2">
              {new Date(item.content.goLiveDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </CardContent>
        </Card>

        {/* Venue Progress Title */}
        <h2 className="text-2xl font-bold text-white text-center">{item.content.venueProgressTitle}</h2>

        {/* Task Grid */}
        <div className="grid gap-4">
          {item.content.tasks?.map((task: any, index: number) => {
            const IconComponent = iconMap[task.icon as keyof typeof iconMap] || Settings;
            const statusColor = task.status === 'completed' ? 'text-green-400' : 
                               task.status === 'in-progress' ? 'text-yellow-400' : 'text-gray-400';
            const bgColor = task.status === 'completed' ? 'bg-green-500/20' : 
                           task.status === 'in-progress' ? 'bg-yellow-500/20' : 'bg-gray-500/20';
            
            return (
              <Card key={index} className="bg-[#1A1A2E] border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-6 w-6 ${statusColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{task.name}</h3>
                        <Badge 
                          variant={task.status === 'completed' ? 'default' : task.status === 'in-progress' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {task.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Time: </span>
                          <span className="text-white">{task.timeEstimate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Assigned: </span>
                          <span className="text-white">{task.assignedTo}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Category: </span>
                          <span className="text-white">{task.category}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Priority: </span>
                          <span className={`font-medium ${
                            task.priority === 'Critical' ? 'text-red-400' :
                            task.priority === 'High' ? 'text-orange-400' :
                            task.priority === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                          }`}>{task.priority}</span>
                        </div>
                      </div>
                      {task.notes && (
                        <div className="mt-2 p-2 bg-[#0D0D24] rounded text-xs">
                          <span className="text-gray-500">Notes: </span>
                          <span className="text-gray-300">{task.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    switch (contentType.name) {
      case 'training_modules':
        return renderTrainingModulePreview();
      case 'platform_features':
        return renderPlatformFeaturePreview();
      case 'live_examples':
        return renderLiveExamplePreview();
      case 'venue_onboarding':
        return renderVenueOnboardingPreview();
      default:
        return (
          <div className="p-6 text-center">
            <p className="text-gray-400">Preview not available for this content type</p>
          </div>
        );
    }
  };

  return (
    <Card className="bg-[#0D0D24] border-gray-800 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Live Preview</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === 'desktop' ? 'default' : 'outline'}
              onClick={() => setViewMode('desktop')}
              className="h-8"
            >
              <Monitor className="h-3 w-3 mr-1" />
              Desktop
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'mobile' ? 'default' : 'outline'}
              onClick={() => setViewMode('mobile')}
              className="h-8"
            >
              <Smartphone className="h-3 w-3 mr-1" />
              Mobile
            </Button>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          Real-time preview of {contentType.displayName}
        </p>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <div className={`mx-auto transition-all duration-300 ${
          viewMode === 'mobile' ? 'max-w-sm' : 'w-full'
        }`}>
          <div className={`${viewMode === 'mobile' ? 'scale-75 origin-top' : ''}`}>
            {renderPreview()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}