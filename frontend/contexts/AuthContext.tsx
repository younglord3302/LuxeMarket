'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, MOCK_USERS } from '@/utils/mockData';
import { loadUser, saveUser } from '@/utils/localStorage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = loadUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple mock check
        // Check if email matches any mock user
        const foundUser = MOCK_USERS.find(u => u.email === email);

        if (foundUser) {
          setUser(foundUser);
          saveUser(foundUser);
          resolve();
        } else {
          // If not in mock users, allow "custom" login if we want, OR reject.
          // For demo, let's reject strict mock check but maybe allow "demo" user creation on fly? 
          // No, let's stick to mock users or registration.
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `u_${Math.random().toString(36).substr(2, 9)}`,
          name,
          email,
          role: 'customer', // Default to customer
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        };
        setUser(newUser);
        saveUser(newUser);
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    saveUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
