import { Dose } from "@/types/Dose";
import { dateUtils } from "@/lib/dateUtils";
import { useAppContext } from "@/context/AppContext";

export const useDoses = () => {
  const { doses = [], updateDoses } = useAppContext();

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

  const getVisibleDosesToday = (): Dose[] =>
    doses.filter(
      (d) => dateUtils.isToday(d.datetime) && d.visibility && !d.taken
    );

  const markDoseAsTaken = (doseId: string) => {
    const updatedDoses = doses.map((dose) => {
      if (dose.id === doseId) {
        return { ...dose, taken: true };
      }
      return dose;
    });
    updateDoses(updatedDoses);
  };

  const markAllDosesAsTaken = () => {
    const dosesTake = doses.map((d) => {
      if (
        dateUtils.isWithinNextHours(d.datetime, 24) &&
        d.visibility &&
        !d.taken
      ) {
        return { ...d, taken: true };
      }
      return {
        ...d,
      };
    });

    updateDoses(dosesTake);
  };

  return {
    doses,
    upcomingDoses24h,
    getNextDose,
    getAllActiveDoses,
    markAllDosesAsTaken,
    markDoseAsTaken,
    getVisibleDosesToday,
  };
};
