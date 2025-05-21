import React, { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dose } from "@/types/Dose";
import { Reminder } from "@/types/Reminder";
import { dateUtils } from "@/lib/dateUtils";
import { generateNextDoses } from "@/lib/doseUtils";

type AppContextType = {
  reminders: Reminder[];
  doses: Dose[];
  addReminder: (reminder: Reminder) => void;
  deleteReminder: (reminderId: string) => void;
  disabledReminderById: (reminderId: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext precisa estar dentro de AppProvider");

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

  const deleteReminder = (reminderId: string) => {
    const filterReminders = reminders.filter((r) => r.id !== reminderId);
    const filterDoses = doses.filter((d) => d.reminderId !== reminderId);
    setReminders([...filterReminders]);
    setDoses([...filterDoses]);
  };

  const disabledReminderById = (reminderId: string) => {
    const reminder = reminders.find((r) => r.id === reminderId);

    if (reminder) {
      reminder.active = !reminder.active;

      const dosesUpdate = doses.map((d) => {
        if (d.reminderId === reminderId && dateUtils.isAfterNow(d.datetime)) {
          return {
            ...d,
            taken: !d.taken,
          };
        }
        return d;
      });

      setReminders((prev) => [...prev, reminder]);
      setDoses((prev) => [...prev, ...dosesUpdate]);
    }
  };
  return (
    <AppContext.Provider
      value={{
        reminders,
        doses,
        addReminder,
        deleteReminder,
        disabledReminderById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
