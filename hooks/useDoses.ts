import { useAppContext } from "@/context/AppContext";
import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";

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
  const getHistoryDoses = (): Dose[] => doses.filter((d) => (d.visibility && dateUtils.isBeforeNow(d.datetime)) || d.taken);
  const getVisibleDosesWithinNext24Hours = (): Dose[] => doses.filter((d) => dateUtils.isWithinNextHours(d.datetime, 24) && d.visibility && !d.taken);

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
      if (dateUtils.isWithinNextHours(d.datetime, 24) && d.visibility && !d.taken) {
        return { ...d, taken: true };
      }
      return {
        ...d,
      };
    })

    updateDoses(dosesTake);
  };

  return { doses, upcomingDoses24h, getNextDose, getAllActiveDoses, getHistoryDoses, markAllDosesAsTaken, markDoseAsTaken, getVisibleDosesWithinNext24Hours };
};
