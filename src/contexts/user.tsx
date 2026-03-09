"use client";
import { type UserCollection } from "@/types/schema";
import React, { createContext, useContext, useState } from "react";

// Define the correct type for the context
type UserContextType = {
  user: UserCollection | null;
  setUser: React.Dispatch<React.SetStateAction<UserCollection | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserCollection | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
