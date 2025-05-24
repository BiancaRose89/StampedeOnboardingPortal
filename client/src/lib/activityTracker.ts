import { apiRequest } from "./queryClient";

/**
 * Activity Tracking Service
 * Monitors user interactions, page visits, and onboarding progress
 * Sends data to backend for analytics and user behavior analysis
 */

export interface ActivityData {
  activityType: 'login' | 'page_visit' | 'guide_view' | 'step_complete' | 'logout' | 'session_start';
  page?: string;
  metadata?: Record<string, any>;
}

class ActivityTracker {
  private sessionId: string | null = null;
  private userId: number | null = null;
  private pageStartTime: number = Date.now();
  private currentPage: string = '';

  /**
   * Initialize tracking for a user session
   */
  async startSession(userId: number) {
    this.userId = userId;
    this.sessionId = this.generateSessionId();
    
    try {
      // Start a new session in the backend
      await apiRequest('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          sessionId: this.sessionId,
          userAgent: navigator.userAgent,
        }),
      });

      // Track session start
      await this.trackActivity({
        activityType: 'session_start',
        metadata: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        },
      });

      console.log('Activity tracking started for user:', userId);
    } catch (error) {
      console.error('Failed to start tracking session:', error);
    }
  }

  /**
   * Track user activity with detailed metadata
   */
  async trackActivity(data: ActivityData) {
    if (!this.userId) {
      console.warn('Activity tracking: No user session active');
      return;
    }

    try {
      await apiRequest('/api/activities', {
        method: 'POST',
        body: JSON.stringify({
          userId: this.userId,
          activityType: data.activityType,
          page: data.page || this.currentPage,
          metadata: {
            ...data.metadata,
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            url: window.location.href,
          },
        }),
      });

      console.log(`Activity tracked: ${data.activityType}`, data);
    } catch (error) {
      console.error('Failed to track activity:', error);
    }
  }

  /**
   * Track page visits with time spent calculation
   */
  async trackPageVisit(pageName: string) {
    // Track time spent on previous page
    if (this.currentPage) {
      const timeSpent = Date.now() - this.pageStartTime;
      await this.trackActivity({
        activityType: 'page_visit',
        page: this.currentPage,
        metadata: {
          timeSpentMs: timeSpent,
          timeSpentSeconds: Math.round(timeSpent / 1000),
          action: 'page_exit',
        },
      });
    }

    // Start tracking new page
    this.currentPage = pageName;
    this.pageStartTime = Date.now();

    await this.trackActivity({
      activityType: 'page_visit',
      page: pageName,
      metadata: {
        action: 'page_enter',
        referrer: document.referrer,
      },
    });
  }

  /**
   * Track guide viewing with engagement metrics
   */
  async trackGuideView(guideType: string, action: 'start' | 'complete' | 'progress') {
    await this.trackActivity({
      activityType: 'guide_view',
      page: `guide_${guideType}`,
      metadata: {
        guideType,
        action,
        engagementLevel: this.calculateEngagementLevel(),
      },
    });
  }

  /**
   * Track onboarding step completion
   */
  async trackStepComplete(stepId: string, stepType: string) {
    await this.trackActivity({
      activityType: 'step_complete',
      metadata: {
        stepId,
        stepType,
        completionTime: new Date().toISOString(),
      },
    });
  }

  /**
   * End user session and track logout
   */
  async endSession() {
    if (this.currentPage) {
      const timeSpent = Date.now() - this.pageStartTime;
      await this.trackActivity({
        activityType: 'page_visit',
        page: this.currentPage,
        metadata: {
          timeSpentMs: timeSpent,
          action: 'session_end',
        },
      });
    }

    await this.trackActivity({
      activityType: 'logout',
      metadata: {
        sessionDuration: this.sessionId ? Date.now() - parseInt(this.sessionId.split('-')[1]) : 0,
      },
    });

    // Update session as ended in backend
    if (this.sessionId) {
      try {
        await apiRequest(`/api/sessions/${this.sessionId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            logoutTime: new Date().toISOString(),
            isActive: false,
          }),
        });
      } catch (error) {
        console.error('Failed to end session:', error);
      }
    }

    this.sessionId = null;
    this.userId = null;
    this.currentPage = '';
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Calculate user engagement level based on time and interactions
   */
  private calculateEngagementLevel(): 'low' | 'medium' | 'high' {
    const timeOnPage = Date.now() - this.pageStartTime;
    
    if (timeOnPage < 30000) return 'low'; // Less than 30 seconds
    if (timeOnPage < 120000) return 'medium'; // Less than 2 minutes
    return 'high'; // More than 2 minutes
  }

  /**
   * Get current session info
   */
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      currentPage: this.currentPage,
      isActive: !!this.sessionId,
    };
  }
}

// Export singleton instance
export const activityTracker = new ActivityTracker();

// Auto-track page visibility changes
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      activityTracker.trackActivity({
        activityType: 'page_visit',
        metadata: { action: 'page_hidden' },
      });
    } else {
      activityTracker.trackActivity({
        activityType: 'page_visit',
        metadata: { action: 'page_visible' },
      });
    }
  });

  // Track page unload
  window.addEventListener('beforeunload', () => {
    activityTracker.endSession();
  });
}