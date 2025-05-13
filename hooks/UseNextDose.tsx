import {Dose} from "@/types/Dose";
import {useContext} from "react";
import {getNextDose} from "@/lib/doseUtils";
import {RemindersContext} from "@/context/RemindersContext";

export const useNextDose = (reminderId?: string): Dose | null => {
    const { doses = [] } = useContext(RemindersContext) ?? {};

    const relevantDoses = reminderId
        ? doses.filter((dose) => dose.reminderId === reminderId)
        : doses;

    return getNextDose(relevantDoses) ?? null;
};