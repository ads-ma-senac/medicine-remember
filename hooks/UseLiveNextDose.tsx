import {Dose} from "@/types/Dose";
import {useContext, useEffect, useState} from "react";
import {getNextDose} from "@/lib/doseUtils";
import {RemindersContext} from "@/context/RemindersContext";

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export function useLiveNextDose(reminderId?: string): Dose | null {
    const {doses = []} = useContext(RemindersContext) ?? {};

    const [nextDose, setNextDose] = useState<Dose | null>(() => {
        return getNextDose(doses) ?? null;
    });

    useEffect(() => {
        const update = () => {
            setNextDose(getNextDose(doses));
        };

        update();

        const interval = setInterval(update, ONE_HOUR_IN_MS);
        return () => clearInterval(interval);

    }, [doses, reminderId]);

    return nextDose;
}