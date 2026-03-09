"use client";
import React, { createContext, useContext, useState, type ReactNode } from "react";

// Define types for context values
interface ToastContextType {
  toast: string;
  position: "left" | "right" | "center";
  message: string;
  notifyUser: (
    toast: string,
    message: string,
    position: "left" | "right" | "center"
  ) => void;
}

// Create context with a default value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Define props for the ToastProvider
interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<string>("");
  const [position, setPosition] = useState<"left" | "right" | "center">(
    "right"
  );
  const [message, setMessage] = useState<string>("");

  const notifyUser = (
    toast: string,
    message: string,
    position: "left" | "right" | "center"
  ) => {
    setToast(toast);
    setMessage(message);
    setPosition(position);

    setTimeout(() => {
      setMessage("");
      setToast("");
      setPosition("right");
    }, 4000);
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        position,
        message,
        notifyUser,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
