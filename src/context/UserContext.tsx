import React, { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  title: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
}

interface UserContextType {
  user: User;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    title: 'Full-Stack Developer',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Skilled in React, Node.js, TypeScript, and cloud technologies. Love solving complex problems and creating user-friendly solutions.',
    joinDate: '2023-01-15'
  });

  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};