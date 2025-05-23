import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { APP_CONFIG } from "@/lib/config";

export default function ChatWidget() {
  const { dbUser } = useAuth();

  useEffect(() => {
    // Only load Tawk.to if we have a valid property ID (not the placeholder)
    if (APP_CONFIG.tawkToPropertyId === "YOUR_TAWK_ID") {
      console.log("Chat widget placeholder - Tawk.to ID not configured");
      return;
    }

    // Load Tawk.to script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${APP_CONFIG.tawkToPropertyId}/default`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    // Configure Tawk.to API
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    
    // Set up onLoad callback
    (window as any).Tawk_API.onLoad = function() {
      console.log("Tawk.to chat widget loaded");
      
      // Set user attributes if logged in
      if (dbUser && (window as any).Tawk_API.setAttributes) {
        (window as any).Tawk_API.setAttributes({
          name: dbUser.name || dbUser.email,
          email: dbUser.email,
          hash: "onboarding-portal",
          role: dbUser.role,
          userId: dbUser.id.toString(),
        });
      }
    };

    // Track chat interactions for onboarding progress
    (window as any).Tawk_API.onChatStarted = function() {
      console.log("Chat started - tracking engagement");
      if ((window as any).trackOnboardingProgress) {
        (window as any).trackOnboardingProgress("chat_interaction");
      }
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src*="embed.tawk.to"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Update user attributes when user changes
  useEffect(() => {
    if ((window as any).Tawk_API && dbUser) {
      (window as any).Tawk_API.setAttributes({
        name: dbUser.name || dbUser.email,
        email: dbUser.email,
        hash: "onboarding-portal",
        role: dbUser.role,
        userId: dbUser.id.toString(),
      });
    }
  }, [dbUser]);

  // Note: The actual chat widget will be rendered by Tawk.to script
  return null;
}
