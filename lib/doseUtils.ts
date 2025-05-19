import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";
import { frequencyToHours, FrequencyValue } from "@/types/Frequency";
import { Reminder, ReminderType } from "@/types/Reminder";
import * as Crypto from "expo-crypto";


export function dosaFormat(reminder: Reminder) {
    const suffix: Record<ReminderType, string> = {
        'pill': 'cápsula',
        "capsule": 'comprimido',
        "injection": 'injeção',
        "syrup": 'um colher',
    }

    return `${reminder.dosage} ${suffix[reminder.type]}`;
}

export function generateNextDoses(
    reminderId: string,
    frequency: string,
    startTime: string | Date | undefined,
    endTime: string | Date | undefined
): Dose[] {

    const UUID = Crypto.randomUUID();

    const interval = frequencyToHours[frequency as FrequencyValue];

    const currentDate = new Date();
    const start = startTime ? new Date(startTime) : dateUtils.addHours(currentDate, 4);
    const end = endTime ? new Date(endTime) : dateUtils.addDays(currentDate, 7);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || interval <= 0)
        return [];

    const doses: Dose[] = [];

    let current = new Date(start);

    while (current <= end) {
        doses.push({ id: UUID, datetime: current, reminderId, taken: false });
        current = dateUtils.addHours(current, interval);
    }

    return doses;
}