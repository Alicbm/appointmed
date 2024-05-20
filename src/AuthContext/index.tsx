import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { useNavigate } from  'react-router-dom';

interface AuthContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("AUTH_TOKEN_APPOINTMED");
    const data = auth !== null && JSON.parse(auth) 

    setUser(data)
  }, [])

  console.log(user)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
