import * as Notifications from 'expo-notifications';

export async function scheduleMultipleNotifications(dates: Date[]) {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Permissão para notificações negada');
    return;
  }

  for (const date of dates) {
    if (date.getTime() > Date.now()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Lembrete',
          body: `Notificação agendada para: ${date.toLocaleString()}`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date,
        },
      });
    } else {
      console.warn('Data no passado ignorada:', date.toISOString());
    }
  }
}
