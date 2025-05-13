import {Dose} from "@/types/Dose";
import * as Crypto from "expo-crypto";
import {dateUtils} from "@/lib/dateUtils";
import {frequencyToHours, FrequencyValue} from "@/types/Frequency";
import {Reminder, ReminderType} from "@/types/Reminder";

export function getNextDose(doses: Dose[]): Dose | null {

    return doses
        .filter((dose) => dateUtils.isAfterNow(dose.datetime) && !dose.taken)
        .sort((a, b) => dateUtils.compareAsc(a.datetime, b.datetime))[0];
}

export function dosaFormat(reminder: Reminder) {
    const suffix: Record<ReminderType, string> = {
        'pill': 'c',
        "capsule": 'mg',
        "injection": 'ml',
        "syrup": 'ml'
    }

    return `${reminder.dosage} ${suffix[reminder.type]}`;
}

export function generateNextDoses(
    reminderId: string,
    frequency: string,
    startTime: string | Date | undefined,
    endTime: string | Date | undefined
): Dose[] {
    const start = !!startTime ? new Date(startTime) : dateUtils.addHours(new Date(), 2);
    const end = !!endTime ? new Date(endTime) : dateUtils.addDays(new Date(), 7);

    const UUID = Crypto.randomUUID();
    const interval = frequencyToHours[frequency as FrequencyValue ];

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || interval <= 0)
        return [];

    const doses: Dose[] = [];

    let current = new Date(start);

    while (current <= end) {
        doses.push({id: UUID, datetime: current, reminderId, taken: false});
        current = dateUtils.addHours(current, interval);
    }

    return doses;
}