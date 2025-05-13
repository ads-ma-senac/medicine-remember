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