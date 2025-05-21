import { Reminder } from "@/types/Reminder";
import { useAppContext } from "@/context/AppContext";

interface UseRemindersReturn {
  getAllReminders: () => Reminder[];
  getLastActiveReminders: () => Reminder[];
  getReminderById: (reminderId: string) => Reminder | undefined;
  addReminder: (reminder: Reminder) => void;
  deleteReminder: (reminderId: string) => void;
  disabledReminderById: (reminderId: string) => void;
}

export const useReminders = (): UseRemindersReturn => {
  const {
    reminders = [],
    addReminder,
    deleteReminder,
    disabledReminderById,
  } = useAppContext();

  const getAllReminders = (): Reminder[] => reminders;

  const getLastActiveReminders = (): Reminder[] => {
    return reminders
      .filter((reminder) => reminder.active)
      .sort((a, b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        return bDate.getTime() - aDate.getTime();
      })
      .slice(-5)
      .reverse();
  };
  const getReminderById = (reminderId: string): Reminder | undefined =>
    reminders.find((r) => r.id === reminderId);

  return {
    getAllReminders,
    getReminderById,
    getLastActiveReminders,
    addReminder,
    deleteReminder,
    disabledReminderById,
  };
};
