import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerCmsRoutes } from "./cmsRoutes";
import { insertUserSchema, insertProgressSchema, insertGuideConfigSchema, updateProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register CMS routes
  registerCmsRoutes(app);
  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/firebase/:uid", async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await storage.getUserByFirebaseUid(uid);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const user = await storage.updateUser(parseInt(id), updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Progress routes
  app.get("/api/progress", async (req, res) => {
    try {
      // In a real implementation, you'd get the user ID from the session/auth
      // For now, we'll return empty array or implement basic logic
      const progress = await storage.getAllProgress();
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const progressData = insertProgressSchema.parse(req.body);
      // In a real implementation, you'd get the user ID from the session
      const userId = 1; // Placeholder
      
      const existingProgress = await storage.getProgressByUserAndStep(userId, progressData.step);
      
      if (existingProgress) {
        const updated = await storage.updateProgress(existingProgress.id, {
          completed: progressData.completed,
          completedAt: progressData.completed ? new Date() : null,
        });
        res.json(updated);
      } else {
        const newProgress = await storage.createProgress({
          userId,
          step: progressData.step,
          completed: progressData.completed,
        });
        res.status(201).json(newProgress);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Guide configuration routes
  app.get("/api/guides", async (req, res) => {
    try {
      const guides = await storage.getAllGuides();
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guides" });
    }
  });

  app.post("/api/guides", async (req, res) => {
    try {
      const guideData = insertGuideConfigSchema.parse(req.body);
      const guide = await storage.createGuide(guideData);
      res.status(201).json(guide);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid guide data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create guide" });
    }
  });

  app.patch("/api/guides/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const guide = await storage.updateGuide(parseInt(id), updates);
      if (!guide) {
        return res.status(404).json({ message: "Guide not found" });
      }
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to update guide" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
