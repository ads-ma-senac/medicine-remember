import { useAppContext } from "@/context/AppContext";
import { Reminder } from "@/types/Reminder";

interface UseRemindersReturn {
  getAllReminders: () => Reminder[];
  getLastActiveReminders: () => Reminder[];
  getReminderById: (reminderId: string) => Reminder | undefined;
  addReminder: (reminder: Reminder) => void;
  updateReminder: (reminder: Reminder) => void;
  deleteReminderById: (reminderId: string) => void;
  disabledReminderById: (reminderId: string) => void;
}

export const useReminders = (): UseRemindersReturn => {
  const {
    reminders = [],
    addReminder,
    updateReminder,
    deleteReminderById,
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
    updateReminder,
    deleteReminderById,
    disabledReminderById,
  };
};
