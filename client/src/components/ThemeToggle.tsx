import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

/**
 * Enhanced theme toggle component
 * Cycles through light → dark → system themes with visual feedback
 * Pink accent on hover matching Stampede branding
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "dark":
        return "Dark mode";
      case "system":
        return "System mode";
      default:
        return "Light mode";
    }
  };

  const getNextMode = () => {
    switch (theme) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to system mode";
      default:
        return "Switch to light mode";
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      title={getNextMode()}
      className="text-[#0D0D25] dark:text-white hover:bg-[#FA58A8]/10 dark:hover:bg-[#FA58A8]/20 hover:text-[#FA58A8] dark:hover:text-[#FA58A8] transition-all duration-200"
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  );
}