import React, {createContext, useEffect, useState} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {Dose} from "@/types/Dose";
import {Reminder} from "@/types/Reminder";
import {generateNextDoses} from "@/lib/doseUtils";

type RemindersContextType = {
  reminders: Reminder[];
  doses: Dose[];
  addReminderHandler: (reminder: Reminder) => void;
};

export const RemindersContext = createContext<RemindersContextType | undefined>(
  undefined
);

export const RemindersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [doses, setDoses] = useState<Dose[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("reminders").then((data) => {
      if (data) setReminders(JSON.parse(data));
    });
    AsyncStorage.getItem("doses").then((data) => {
      if (data) setDoses(JSON.parse(data));
    });
  }, []);

  const addReminderHandler = async (reminder: Reminder) => {
    const updated = [reminder,...reminders];
    setReminders(updated);

    const newDoses = generateNextDoses(
      reminder.id,
      reminder.frequency,
      reminder.startTime,
      reminder.endTime
    );

    await AsyncStorage.setItem("reminders", JSON.stringify(updated));
    await AsyncStorage.setItem("doses",JSON.stringify([...doses, ...newDoses])
    );
  };

  return (
    <RemindersContext.Provider value={{ reminders, doses, addReminderHandler }}>
      {children}
    </RemindersContext.Provider>
  );
};



