import { Dose } from "@/types/Dose";
import { useEffect, useState } from "react";
import { useDoses } from "./useDoses";

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export const useLiveNextDose = (reminderId?: string): Dose | null => {
  const { getNextDose, doses } = useDoses();
  const [nextDose, setNextDose] = useState<Dose | null>(() => getNextDose(reminderId));

  useEffect(() => {
    const update = () => {
      setNextDose(getNextDose(reminderId));
    };

    update();
    const interval = setInterval(update, ONE_HOUR_IN_MS);

    return () => clearInterval(interval);
  }, [doses, reminderId]);

  return nextDose;
};
