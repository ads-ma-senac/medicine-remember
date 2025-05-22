import { useAppContext } from "@/context/AppContext";
import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";

export const useDoses = () => {
  const { doses = [] } = useAppContext();

  const upcomingDoses24h = doses.filter((dose) =>
    dateUtils.isWithinNextHours(dose.datetime, 24)
  );

  const getNextDose = (reminderId?: string): Dose | null => {
    const relevantDoses = reminderId
      ? doses.filter((dose) => dose.reminderId === reminderId)
      : doses;

    return (
      relevantDoses
        .filter((dose) => dateUtils.isAfterNow(dose.datetime) && !dose.taken)
        .sort((a, b) => dateUtils.compareAsc(a.datetime, b.datetime))[0] ?? null
    );
  };

  const getAllActiveDoses = (): Dose[] => doses.filter((d) => d.visibility);

  return { doses, upcomingDoses24h, getNextDose, getAllActiveDoses };
};
