import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

// Venues table for multi-venue management
export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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

export const insertVenueSchema = createInsertSchema(venues).omit({
  id: true,
  createdAt: true,
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
export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Venue = typeof venues.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertOnboardingTask = z.infer<typeof insertOnboardingTaskSchema>;
export type OnboardingTask = typeof onboardingTasks.$inferSelect;
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
export type UserSettings = typeof userSettings.$inferSelect;
