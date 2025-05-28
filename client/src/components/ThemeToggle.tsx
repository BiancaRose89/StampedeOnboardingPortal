import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

/**
 * Theme toggle button component
 * Allows users to switch between light, dark, and system themes
 * Shows appropriate icon based on current theme
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
    if (theme === "dark") {
      return <Moon className="h-4 w-4" />;
    }
    return <Sun className="h-4 w-4" />;
  };

  const getTooltipText = () => {
    if (theme === "light") return "Switch to Dark Mode";
    if (theme === "dark") return "Switch to System Theme";
    return "Switch to Light Mode";
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      title={getTooltipText()}
      className="text-[#0D0D25] dark:text-white hover:bg-[#FA58A8]/10 dark:hover:bg-[#FA58A8]/20"
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}