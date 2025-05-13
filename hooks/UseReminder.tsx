import {useContext} from "react";
import {RemindersContext} from "@/context/RemindersContext";

export const useReminder = (reminderId: string) => {
    const { reminders = [] } = useContext(RemindersContext) ?? {};


    const reminder = reminders.find((r) => r.id === reminderId);

    return {reminder};
};