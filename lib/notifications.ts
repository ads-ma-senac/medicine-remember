import * as Notifications from 'expo-notifications';

export async function scheduleReminderNotification(title: string, date: Date) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Hora de tomar o remédio!',
            body: title,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 2,
        },
    });
}
