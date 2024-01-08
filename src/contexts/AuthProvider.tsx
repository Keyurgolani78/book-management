import React, { ReactNode, useContext, useState } from "react";
import mockUsers from "data/users";
import { User } from "@/interfaces/user";

export interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const authenticatedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (authenticatedUser) {
      setUser({
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        firstName: authenticatedUser.firstName,
        lastName: authenticatedUser.lastName,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error(
        "Email is already registered. Please login or use different email"
      );
    }

    const newUser: User = {
      id: users.length + 1,
      email,
      password,
      firstName,
      lastName,
    };

    setUsers([...users, newUser]);

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
