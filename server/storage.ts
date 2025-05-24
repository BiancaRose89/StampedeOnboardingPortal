import { 
  users, 
  onboardingProgress, 
  guideConfigs,
  userActivities,
  userSessions,
  type User, 
  type InsertUser, 
  type OnboardingProgress, 
  type InsertProgress,
  type GuideConfig,
  type InsertGuideConfig,
  type UserActivity,
  type InsertActivity,
  type UserSession,
  type InsertSession
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Progress methods
  getAllProgress(): Promise<OnboardingProgress[]>;
  getProgressByUser(userId: number): Promise<OnboardingProgress[]>;
  getProgressByUserAndStep(userId: number, step: string): Promise<OnboardingProgress | undefined>;
  createProgress(progress: InsertProgress): Promise<OnboardingProgress>;
  updateProgress(id: number, updates: Partial<OnboardingProgress>): Promise<OnboardingProgress | undefined>;

  // Guide configuration methods
  getAllGuides(): Promise<GuideConfig[]>;
  getGuideByType(guideType: string): Promise<GuideConfig | undefined>;
  createGuide(guide: InsertGuideConfig): Promise<GuideConfig>;
  updateGuide(id: number, updates: Partial<GuideConfig>): Promise<GuideConfig | undefined>;

  // Activity tracking methods
  createActivity(activity: InsertActivity): Promise<UserActivity>;
  getActivitiesByUser(userId: number): Promise<UserActivity[]>;
  getActivitiesByType(activityType: string): Promise<UserActivity[]>;
  getRecentActivities(limit?: number): Promise<UserActivity[]>;

  // Session management methods
  createSession(session: InsertSession): Promise<UserSession>;
  updateSession(sessionId: string, updates: Partial<UserSession>): Promise<UserSession | undefined>;
  getActiveSession(userId: number): Promise<UserSession | undefined>;
  getSessionsByUser(userId: number): Promise<UserSession[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progress: Map<number, OnboardingProgress>;
  private guides: Map<number, GuideConfig>;
  private activities: Map<number, UserActivity>;
  private sessions: Map<string, UserSession>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentGuideId: number;
  private currentActivityId: number;

  constructor() {
    this.users = new Map();
    this.progress = new Map();
    this.guides = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentGuideId = 1;

    // Initialize with default guide configurations and demo data
    this.initializeDefaultGuides();
    this.initializeDemoUsers();
  }

  private initializeDefaultGuides() {
    const defaultGuides = [
      {
        guideType: "overview",
        title: "Stampede Onboarding Journey",
        description: "Your complete step-by-step guide to getting started with Stampede",
        url: "internal://overview",
        isActive: true,
      },
      {
        guideType: "bookings",
        title: "Table Bookings Readiness Guide",
        description: "Learn how to set up and manage your booking system effectively",
        url: "https://h.stampede.ai/table-bookings-readiness?hs_preview=XqvGJPfp-224913439982",
        isActive: true,
      },
      {
        guideType: "loyalty",
        title: "Loyalty Program Setup",
        description: "Configure your customer loyalty and rewards system",
        url: "https://h.stampede.ai/loyalty",
        isActive: true,
      },
      {
        guideType: "marketing",
        title: "Marketing Readiness Guide",
        description: "Set up campaigns and customer communication tools",
        url: "https://h.stampede.ai/marketing-readiness?hs_preview=ivCspIml-224924145856",
        isActive: true,
      },
    ];

    defaultGuides.forEach((guide) => {
      const guideWithId: GuideConfig = {
        id: this.currentGuideId++,
        ...guide,
        updatedAt: new Date(),
      };
      this.guides.set(guideWithId.id, guideWithId);
    });
  }

  private initializeDemoUsers() {
    // Create demo admin user
    const adminUser: User = {
      id: this.currentUserId++,
      email: "admin@stampede.ai",
      firebaseUid: "admin-001",
      name: "Admin User",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create demo client user
    const clientUser: User = {
      id: this.currentUserId++,
      email: "client@example.com",
      firebaseUid: "client-001",
      name: "Demo Client",
      role: "client",
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(clientUser.id, clientUser);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.firebaseUid === firebaseUid
    );
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      id,
      email: insertUser.email,
      firebaseUid: insertUser.firebaseUid,
      name: insertUser.name || null,
      role: insertUser.role || "client",
      isActive: insertUser.isActive !== undefined ? insertUser.isActive : true,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Progress methods
  async getAllProgress(): Promise<OnboardingProgress[]> {
    return Array.from(this.progress.values());
  }

  async getProgressByUser(userId: number): Promise<OnboardingProgress[]> {
    return Array.from(this.progress.values()).filter(
      (p) => p.userId === userId
    );
  }

  async getProgressByUserAndStep(userId: number, step: string): Promise<OnboardingProgress | undefined> {
    return Array.from(this.progress.values()).find(
      (p) => p.userId === userId && p.step === step
    );
  }

  async createProgress(insertProgress: InsertProgress): Promise<OnboardingProgress> {
    const id = this.currentProgressId++;
    const progress: OnboardingProgress = {
      id,
      userId: insertProgress.userId,
      step: insertProgress.step,
      completed: insertProgress.completed || false,
      completedAt: insertProgress.completed ? new Date() : null,
      data: null,
    };
    this.progress.set(id, progress);
    return progress;
  }

  async updateProgress(id: number, updates: Partial<OnboardingProgress>): Promise<OnboardingProgress | undefined> {
    const progress = this.progress.get(id);
    if (!progress) return undefined;

    const updatedProgress = { ...progress, ...updates };
    this.progress.set(id, updatedProgress);
    return updatedProgress;
  }

  // Guide configuration methods
  async getAllGuides(): Promise<GuideConfig[]> {
    return Array.from(this.guides.values()).filter(guide => guide.isActive);
  }

  async getGuideByType(guideType: string): Promise<GuideConfig | undefined> {
    return Array.from(this.guides.values()).find(
      (guide) => guide.guideType === guideType && guide.isActive
    );
  }

  async createGuide(insertGuide: InsertGuideConfig): Promise<GuideConfig> {
    const id = this.currentGuideId++;
    const guide: GuideConfig = {
      id,
      guideType: insertGuide.guideType,
      title: insertGuide.title,
      description: insertGuide.description || null,
      url: insertGuide.url,
      isActive: insertGuide.isActive !== undefined ? insertGuide.isActive : true,
      updatedAt: new Date(),
    };
    this.guides.set(id, guide);
    return guide;
  }

  async updateGuide(id: number, updates: Partial<GuideConfig>): Promise<GuideConfig | undefined> {
    const guide = this.guides.get(id);
    if (!guide) return undefined;

    const updatedGuide = { 
      ...guide, 
      ...updates,
      updatedAt: new Date(),
    };
    this.guides.set(id, updatedGuide);
    return updatedGuide;
  }
}

export const storage = new MemStorage();
