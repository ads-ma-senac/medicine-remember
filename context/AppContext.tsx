import React, { createContext, useContext, useEffect, useState } from "react";

import { dateUtils } from "@/lib/dateUtils";
import { generateNextDoses } from "@/lib/doseUtils";
import { Dose } from "@/types/Dose";
import { Reminder } from "@/types/Reminder";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AppContextType = {
  reminders: Reminder[];
  doses: Dose[];
  addReminder: (reminder: Reminder) => void;
  updateReminder: (reminder: Reminder) => void;
  deleteReminderById: (reminderId: string) => void;
  disabledReminderById: (reminderId: string) => void;
  updateDoses: (updateDoses: Dose[]) => void;
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

  const addReminder = async (reminder: Reminder) => {
    setReminders((prev) => [reminder, ...prev]);

    const newDoses = generateNextDoses(
      reminder.id,
      reminder.frequency,
      reminder.startTime,
      reminder.endTime
    );

    setDoses((prev) => [...prev, ...newDoses]);

    const dates = newDoses.map(d => d.datetime);

    // if (Platform.OS == "android" || Platform.OS == "ios") {
    //   await scheduleMultipleNotifications(dates)
    // }

  };

  const updateReminder = (reminder: Reminder) => {
    const filterReminders = reminders.filter((r) => r.id !== reminder.id);
    const prevReminder = reminders.find((r) => r.id === reminder.id);

    setReminders([...filterReminders, reminder]);

    if (reminder.frequency !== prevReminder?.frequency) {

      const filterDoses = doses.filter((d) => {
        if (d.reminderId !== reminder.id) return d;
        if (d.reminderId === reminder.id && !dateUtils.isAfterNow(d.datetime)) {
          return d
        }
      });

      const newDoses = generateNextDoses(
        reminder.id,
        reminder.frequency,
        reminder.startTime,
        reminder.endTime
      );

      setDoses([...filterDoses, ...newDoses]);

    }

  };

  const updateDoses = (updateDoses: Dose[]) => { setDoses([...updateDoses]); };

  const deleteReminderById = (reminderId: string) => {
    const filterReminders = reminders.filter((r) => r.id !== reminderId);
    const filterDoses = doses.filter((d) => d.reminderId !== reminderId);
    setReminders([...filterReminders]);
    setDoses([...filterDoses]);
  };

  const disabledReminderById = (reminderId: string) => {
    const reminder = reminders.find((r) => r.id === reminderId);

    const filterReminders = reminders.filter((r) => r.id !== reminderId);
    const filterDoses = doses.filter((d) => d.reminderId !== reminderId);

    if (reminder) {
      reminder.active = !reminder.active;

      const dosesByReminderId = doses
        .filter((r) => r.reminderId === reminderId)
        .map((d) => {
          if (d.reminderId === reminderId && dateUtils.isAfterNow(d.datetime)) {
            return {
              ...d,
              visibility: !d.visibility,
            };
          }
          return d;
        });

      setReminders([...filterReminders, reminder]);
      setDoses([...filterDoses, ...dosesByReminderId]);
    }
  };
  return (
    <AppContext.Provider
      value={{
        reminders,
        doses,
        addReminder,
        deleteReminderById,
        updateReminder,
        disabledReminderById,
        updateDoses
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


