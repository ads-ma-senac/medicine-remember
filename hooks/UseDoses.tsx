import {useContext} from "react";
import {dateUtils} from "@/lib/dateUtils";
import {RemindersContext} from "@/context/RemindersContext";

export const useDoses = () => {
  const { doses = [] } = useContext(RemindersContext) ?? {};

  const upcomingDoses24h = doses.filter((dose) =>
    dateUtils.isWithinNextHours(dose.datetime, 24)
  );

  return { doses, upcomingDoses24h };
};