import * as Crypto from "expo-crypto";

import { FrequencyValue, frequencyToHours } from "@/types/Frequency";
import { Reminder, ReminderType } from "@/types/Reminder";

import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";

export function dosaFormat(reminder: Reminder) {
  const suffix: Record<ReminderType, string> = {
    pill: "comprimido",
    capsule: "cápsula",
    injection: "injeção",
    syrup: "um colher",
  };

  return `${reminder.dosage} ${suffix[reminder.type]}`;
}

export function generateNextDoses(
  reminderId: string,
  frequency: string,
  startTime: string | Date | undefined,
  endTime: string | Date | undefined
): Dose[] {
  const interval = frequencyToHours[frequency as FrequencyValue];

  const randomHour = Math.floor(Math.random() * 24);
  const currentDate = new Date();

  const start = startTime
    ? new Date(startTime)
    : dateUtils.addHours(currentDate, randomHour);
  const end = endTime ? new Date(endTime) : dateUtils.addDays(currentDate, 14);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || interval <= 0)
    return [];

  const doses: Dose[] = [];

  let current = new Date(start);

  while (current <= end) {
    const uuid = Crypto.randomUUID();
    doses.push({
      id: uuid,
      datetime: current,
      reminderId,
      taken: false,
      visibility: true,
    });
    current = dateUtils.addHours(current, interval);
  }

  return doses;
}
