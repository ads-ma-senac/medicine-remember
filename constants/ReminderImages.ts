import { ReminderType } from "@/types/Reminder";

export const ReminderImages = {
  pill: require("../assets/images/icons/pill.png"),
  capsule: require("../assets/images/icons/capsule.png"),
  syrup: require("../assets/images/icons/syrup.png"),
  injection: require("../assets/images/icons/injection.png"),
};

export const reminderTypeToImage: Record<ReminderType, any> = {
  pill: ReminderImages.pill,
  capsule: ReminderImages.capsule,
  syrup: ReminderImages.syrup,
  injection: ReminderImages.injection,
};
