import { icons } from "@/constants/icons";

export type ReminderType = "capsule" | "pill" | "syrup" | "injection";

export type Reminder = {
  id: string;
  name: string;
  type: ReminderType;
  dosage: number;
  frequency: string;
  startTime?: Date;
  endTime?: Date;
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type MedicineTypeOption = {
  label: string;
  value: ReminderType;
};

export const typesMedicine: MedicineTypeOption[] = [
  { label: 'Cápsula', value: 'capsule' },
  { label: 'Comprimido', value: 'pill' },
  { label: 'Xarope', value: 'syrup' },
  { label: 'Injeção', value: 'injection' },
];

export const reminderTypeToImage: Record<ReminderType, any> = {
  pill: icons.pill,
  capsule: icons.capsule,
  syrup: icons.syrup,
  injection: icons.injection,
};