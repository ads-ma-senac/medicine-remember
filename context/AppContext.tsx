import { generateNextDoses } from "@/lib/doseUtils";
import { Dose } from "@/types/Dose";
import { Reminder } from "@/types/Reminder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  reminders: Reminder[];
  doses: Dose[];
  addReminder: (reminder: Reminder) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext precisa estar dentro de AppProvider");
  
  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [doses, setDoses] = useState<Dose[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    const [remindersRaw, dosesRaw] = await Promise.all([
      AsyncStorage.getItem("reminders"),
      AsyncStorage.getItem("doses"),
    ]);

    setReminders(remindersRaw ? JSON.parse(remindersRaw) : []);
    setDoses(dosesRaw ? JSON.parse(dosesRaw) : []);
  };

  const saveReminders = async (data: Reminder[]) =>
    AsyncStorage.setItem("reminders", JSON.stringify(data));

  const saveDoses = async (data: Dose[]) =>
    AsyncStorage.setItem("doses", JSON.stringify(data));

  useEffect(() => {
    loadData().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoading) saveReminders(reminders);
  }, [reminders]);

  useEffect(() => {
    if (!isLoading) saveDoses(doses);
  }, [doses]);

  const addReminder = (reminder: Reminder) => {
    setReminders((prev) => [reminder, ...prev]);

    const newDoses = generateNextDoses(
      reminder.id,
      reminder.frequency,
      reminder.startTime,
      reminder.endTime
    );
    
    setDoses((prev) => [...prev, ...newDoses]);
  };

  return (
    <AppContext.Provider value={{ reminders, doses, addReminder }}>
      {children}
    </AppContext.Provider>
  );
};
