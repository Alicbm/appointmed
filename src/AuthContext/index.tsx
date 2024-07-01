import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    createdAt: string
    eps: string
  }
  access_token: string
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("AUTH_TOKEN_APPOINTMED");
    const data = auth !== null && JSON.parse(auth) 

    setUser(data)    
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
