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
