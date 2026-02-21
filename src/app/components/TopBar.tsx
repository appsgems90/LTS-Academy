import { Bell, ChevronLeft, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from 'next-themes';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  showNotifications?: boolean;
}

export function TopBar({ title, showBack = false, showNotifications = true }: TopBarProps) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-10">
      <div className="max-w-md mx-auto flex items-center justify-between h-16 px-4">
        <div className="w-10">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full active:bg-muted transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1C2D8C] rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">LTS</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full active:bg-muted transition-colors"
          >
            <Sun className="w-5 h-5 text-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute w-5 h-5 text-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          {showNotifications && (
            <button className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full active:bg-muted transition-colors relative">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#00C2FF] rounded-full" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
