"use client";

import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UsageContextType {
  count: number;
  fetchUsage: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const UsageContext = createContext<UsageContextType | null>(null);
export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // state
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  // hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";
  useEffect(() => {
    if (email) fetchUsage();
  }, [email]);

  useEffect(() => {
    if (count > 10000) setOpenModal(true);
  }, [count]);
  const fetchUsage = async () => {
    const response = await usageCount(email);
    setCount(response);
  };
  // console.log("usage count in context => ", count);
  return (
    <UsageContext.Provider
      value={{ count, fetchUsage, openModal, setOpenModal }}
    >
      {children}
    </UsageContext.Provider>
  );
};
export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};
