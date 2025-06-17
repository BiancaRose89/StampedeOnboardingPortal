import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  name: text("name"),
  role: text("role").notNull().default("client"), // "client" or "admin"
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const onboardingProgress = pgTable("onboarding_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  step: text("step").notNull(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  data: jsonb("data"), // Additional step-specific data
});

export const guideConfigs = pgTable("guide_configs", {
  id: serial("id").primaryKey(),
  guideType: text("guide_type").notNull().unique(), // "bookings", "loyalty", "marketing"
  title: text("title").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// User activity tracking for monitoring login and navigation behavior
export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  activityType: varchar("activity_type", { length: 50 }).notNull(), // 'login', 'page_visit', 'guide_view', 'step_complete'
  page: varchar("page", { length: 100 }), // page/section visited
  metadata: jsonb("metadata"), // additional data like time spent, guide type, etc.
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// User sessions for tracking login sessions and activity
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  sessionId: varchar("session_id", { length: 255 }).notNull().unique(),
  loginTime: timestamp("login_time").notNull().defaultNow(),
  lastActivity: timestamp("last_activity").notNull().defaultNow(),
  logoutTime: timestamp("logout_time"),
  ipAddress: varchar("ip_address", { length: 45 }), // supports IPv6
  userAgent: text("user_agent"),
  isActive: boolean("is_active").notNull().default(true),
});

// Available onboarding features definition
export const onboardingFeatures = pgTable("onboarding_features", {
  id: serial("id").primaryKey(),
  featureKey: text("feature_key").notNull().unique(), // "account_setup", "booking_system", "loyalty", etc.
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // "core", "advanced", "premium"
  estimatedTime: text("estimated_time"), // "10 minutes", "2 hours", etc.
  dependencies: jsonb("dependencies").default('[]'), // Array of feature keys that must be completed first
  taskCount: integer("task_count").notNull().default(1),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Venues table for multi-venue management with feature selection
export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  venueId: text("venue_id").unique(), // Custom venue identifier
  goLiveDate: timestamp("go_live_date"),
  selectedFeatures: jsonb("selected_features").notNull().default('[]'), // Array of feature keys
  teamMembers: jsonb("team_members").default('[]'), // Array of team member objects
  packageType: text("package_type").default("standard"), // "basic", "standard", "premium"
  status: text("status").notNull().default("setup"), // "setup", "in-progress", "completed", "live"
  progressData: jsonb("progress_data").default('{}'), // Progress tracking data
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Team members table
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  email: text("email"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Onboarding tasks with venue and team member assignments
export const onboardingTasks = pgTable("onboarding_tasks", {
  id: serial("id").primaryKey(),
  venueId: integer("venue_id").notNull().references(() => venues.id),
  taskName: text("task_name").notNull(),
  description: text("description"),
  estimatedTime: text("estimated_time"),
  status: text("status").notNull().default("not-started"), // "not-started", "in-progress", "completed"
  assignedTeamMemberId: integer("assigned_team_member_id").references(() => teamMembers.id),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// User settings for onboarding preferences
export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  goLiveDate: timestamp("go_live_date"),
  showOnboardingOverview: boolean("show_onboarding_overview").notNull().default(true),
  reminderFrequency: text("reminder_frequency").default("daily"), // "daily", "weekly", "none"
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertProgressSchema = createInsertSchema(onboardingProgress).omit({
  id: true,
  completedAt: true,
});

export const insertGuideConfigSchema = createInsertSchema(guideConfigs).omit({
  id: true,
  updatedAt: true,
});

export const updateProgressSchema = insertProgressSchema.extend({
  completed: z.boolean(),
});

// Schema for activity tracking
export const insertActivitySchema = createInsertSchema(userActivities).omit({
  id: true,
  timestamp: true,
});

export const insertSessionSchema = createInsertSchema(userSessions).omit({
  id: true,
  loginTime: true,
  lastActivity: true,
});

export const insertOnboardingFeatureSchema = createInsertSchema(onboardingFeatures).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVenueSchema = createInsertSchema(venues).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
});

export const insertOnboardingTaskSchema = createInsertSchema(onboardingTasks).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertUserSettingsSchema = createInsertSchema(userSettings).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type OnboardingProgress = typeof onboardingProgress.$inferSelect;
export type InsertGuideConfig = z.infer<typeof insertGuideConfigSchema>;
export type GuideConfig = typeof guideConfigs.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type UserActivity = typeof userActivities.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertOnboardingFeature = z.infer<typeof insertOnboardingFeatureSchema>;
export type OnboardingFeature = typeof onboardingFeatures.$inferSelect;
export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Venue = typeof venues.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertOnboardingTask = z.infer<typeof insertOnboardingTaskSchema>;
export type OnboardingTask = typeof onboardingTasks.$inferSelect;
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
export type UserSettings = typeof userSettings.$inferSelect;

// CMS Admin Users
export const cmsAdmins = pgTable("cms_admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("editor"), // "super_admin", "admin", "editor"
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Content Types (flexible schema for different content types)
export const contentTypes = pgTable("content_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // "page_content", "navigation", "settings", etc.
  displayName: text("display_name").notNull(),
  description: text("description"),
  schema: jsonb("schema").notNull(), // JSON schema defining fields for this content type
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Content Items
export const contentItems = pgTable("content_items", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(), // unique identifier like "home_hero_title"
  contentTypeId: integer("content_type_id").notNull().references(() => contentTypes.id),
  title: text("title").notNull(),
  content: jsonb("content").notNull(), // actual content data
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdBy: integer("created_by").notNull().references(() => cmsAdmins.id),
  updatedBy: integer("updated_by").notNull().references(() => cmsAdmins.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Content Versions (for version control)
export const contentVersions = pgTable("content_versions", {
  id: serial("id").primaryKey(),
  contentItemId: integer("content_item_id").notNull().references(() => contentItems.id),
  versionNumber: integer("version_number").notNull(),
  content: jsonb("content").notNull(),
  changeDescription: text("change_description"),
  createdBy: integer("created_by").notNull().references(() => cmsAdmins.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Content Locks (for collaborative editing)
export const contentLocks = pgTable("content_locks", {
  id: serial("id").primaryKey(),
  contentItemId: integer("content_item_id").notNull().references(() => contentItems.id),
  lockedBy: integer("locked_by").notNull().references(() => cmsAdmins.id),
  lockToken: text("lock_token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Activity Log
export const cmsActivityLog = pgTable("cms_activity_log", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").notNull().references(() => cmsAdmins.id),
  action: text("action").notNull(), // "create", "update", "delete", "publish", "unpublish"
  resourceType: text("resource_type").notNull(), // "content_item", "content_type", etc.
  resourceId: integer("resource_id").notNull(),
  details: jsonb("details"), // additional action details
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// CMS Relations
export const cmsAdminsRelations = relations(cmsAdmins, ({ many }) => ({
  contentItems: many(contentItems),
  contentVersions: many(contentVersions),
  contentLocks: many(contentLocks),
  activityLogs: many(cmsActivityLog),
}));

export const contentTypesRelations = relations(contentTypes, ({ many }) => ({
  contentItems: many(contentItems),
}));

export const contentItemsRelations = relations(contentItems, ({ one, many }) => ({
  contentType: one(contentTypes, {
    fields: [contentItems.contentTypeId],
    references: [contentTypes.id],
  }),
  createdByAdmin: one(cmsAdmins, {
    fields: [contentItems.createdBy],
    references: [cmsAdmins.id],
  }),
  updatedByAdmin: one(cmsAdmins, {
    fields: [contentItems.updatedBy],
    references: [cmsAdmins.id],
  }),
  versions: many(contentVersions),
  locks: many(contentLocks),
}));

// CMS Schema definitions
export const insertCmsAdminSchema = createInsertSchema(cmsAdmins).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContentTypeSchema = createInsertSchema(contentTypes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContentItemSchema = createInsertSchema(contentItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});

export const insertContentVersionSchema = createInsertSchema(contentVersions).omit({
  id: true,
  createdAt: true,
});

export const insertContentLockSchema = createInsertSchema(contentLocks).omit({
  id: true,
  createdAt: true,
});

export const insertCmsActivityLogSchema = createInsertSchema(cmsActivityLog).omit({
  id: true,
  createdAt: true,
});

// CMS Types
export type CmsAdmin = typeof cmsAdmins.$inferSelect;
export type InsertCmsAdmin = z.infer<typeof insertCmsAdminSchema>;
export type ContentType = typeof contentTypes.$inferSelect;
export type InsertContentType = z.infer<typeof insertContentTypeSchema>;
export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = z.infer<typeof insertContentItemSchema>;
export type ContentVersion = typeof contentVersions.$inferSelect;
export type InsertContentVersion = z.infer<typeof insertContentVersionSchema>;
export type ContentLock = typeof contentLocks.$inferSelect;
export type InsertContentLock = z.infer<typeof insertContentLockSchema>;
export type CmsActivityLog = typeof cmsActivityLog.$inferSelect;
export type InsertCmsActivityLog = z.infer<typeof insertCmsActivityLogSchema>;
