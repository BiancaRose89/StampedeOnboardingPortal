// Mock Firebase implementation for development without Firebase credentials
export interface MockUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

// Simple in-memory auth state for demo purposes
let currentUser: MockUser | null = null;
const authStateListeners: ((user: MockUser | null) => void)[] = [];

// Demo users for testing
const DEMO_USERS = [
  { email: "admin@stampede.ai", password: "admin123", uid: "admin-001", role: "admin" },
  { email: "client@example.com", password: "client123", uid: "client-001", role: "client" },
];

export const signIn = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
  if (!demoUser) {
    throw new Error("Invalid email or password");
  }
  
  currentUser = {
    uid: demoUser.uid,
    email: demoUser.email,
    displayName: email.split('@')[0],
  };
  
  // Notify listeners
  authStateListeners.forEach(listener => listener(currentUser));
  
  return { user: currentUser };
};

export const signOutUser = async () => {
  currentUser = null;
  authStateListeners.forEach(listener => listener(null));
};

export const onAuthStateChange = (callback: (user: MockUser | null) => void) => {
  authStateListeners.push(callback);
  
  // Immediately call with current state
  callback(currentUser);
  
  // Return unsubscribe function
  return () => {
    const index = authStateListeners.indexOf(callback);
    if (index > -1) {
      authStateListeners.splice(index, 1);
    }
  };
};

// Initialize with admin user for demo
setTimeout(() => {
  if (!currentUser) {
    signIn("admin@stampede.ai", "admin123").catch(() => {
      // Silently fail for demo
    });
  }
}, 100);
