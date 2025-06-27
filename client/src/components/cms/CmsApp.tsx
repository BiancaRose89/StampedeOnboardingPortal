import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CmsLogin from './CmsLogin';
import CmsDashboard from './CmsDashboard';
import { useToast } from '@/hooks/use-toast';

interface CmsAdmin {
  id: number;
  email: string;
  name: string;
  role: string;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const token = localStorage.getItem('cms_token');
        const response = await fetch(queryKey[0] as string, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        
        return response.json();
      },
    },
  },
});

export default function CmsApp() {
  const [admin, setAdmin] = useState<CmsAdmin | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing authentication on app load
    const checkAuth = async () => {
      const token = localStorage.getItem('cms_token');
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const response = await fetch('/api/cms/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdmin(data.admin);
        } else {
          localStorage.removeItem('cms_token');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('cms_token');
      } finally {
        setIsInitializing(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/cms/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('cms_token', data.token);
      setAdmin(data.admin);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.admin.name}!`,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    setAdmin(null);
    queryClient.clear();
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading CMS...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {admin ? (
        <CmsDashboard admin={admin} onLogout={handleLogout} />
      ) : (
        <CmsLogin 
          onLogin={handleLogin} 
          isLoading={isLoading} 
          error={error} 
        />
      )}
    </QueryClientProvider>
  );
}