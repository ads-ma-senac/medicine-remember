import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

import "dayjs/locale/pt-br";

dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export const dateUtils = {

    // Formatador de hora (09:00 AM)
    formatTime(date: string | Date): string {
        return dayjs(date).format("hh:mm A");
    },

    // Formatador 24h (09:00)
    formatTime24h(date: string | Date): string {
        return dayjs(date).format("HH:mm");
    },

    // Data completa (09/05/2025)
    formatDate(date: string | Date): string {
        return dayjs(date).format("DD/MM/YYYY");
    },

    // Data + hora (09/05/2025 às 08:00)
    formatDateTime(date: string | Date): string {
        return dayjs(date).format("DD/MM/YYYY [às] HH:mm");
    },

    // "há 5 minutos", "em 2 dias"
    formatDistance(date: string | Date): string {
        return dayjs(date).fromNow();
    },

    addHours(date: string | Date, hours: number): Date {
        return dayjs(date).add(hours, "hours").toDate();
    },

    addDays(date: string | Date, days: number): Date {
        return dayjs(date).add(days, "day").toDate();
    },

    // Verificações

    isToday(date: string | Date): boolean {
        return dayjs(date).isToday();
    },

    isWeek(date: string | Date): boolean {
        return dayjs(date).isSame(dayjs(), 'weeks')
    },

    isMonth(date: string | Date): boolean {
        return dayjs(date).isSame(dayjs(), 'month')
    },

    isBeforeNow(date: string | Date): boolean {
        return dayjs(date).isBefore(dayjs());
    },

    isAfterNow(date: string | Date): boolean {
        return dayjs(date).isAfter(dayjs());
    },

    isWithinNextHours(date: string | Date, hours: number): boolean {
        const now = dayjs();
        const target = dayjs(date);
        const end = now.add(hours, "hour");
        return target.isAfter(now) && target.isBefore(end);
    },


    compareAsc(date: string | Date, dateOther: string | Date): number {
        return dayjs(date).isSameOrAfter(dayjs(dateOther)) ? 1 : -1;
    },

    // ISO para salvar
    toISO(date: string | Date): string {
        return dayjs(date).toISOString();
    },
};