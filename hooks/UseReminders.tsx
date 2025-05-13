import {useContext} from "react";
import {RemindersContext} from "@/context/RemindersContext";

export const useReminders = () => {
    const context = useContext(RemindersContext);

    if(context === undefined) {
        throw new Error('useReminders must be defined');
    }

    return {
        reminders:context.reminders,
        addReminderHandler:context.addReminderHandler,
    };
};