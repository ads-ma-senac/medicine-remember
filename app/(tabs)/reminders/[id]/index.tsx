import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { DefaultScreen } from "@/components/DefaultScreen";
import { ReminderActions } from "@/components/ReminderActions";
import { ReminderImage } from "@/components/ReminderImage";
import { ReminderInfoCard } from "@/components/ReminderInfoCard";
import { useDoses } from "@/hooks/useDoses";
import { useReminders } from "@/hooks/useReminders";
import { frequencyOptions } from "@/types/Frequency";
import { reminderTypeToImage } from "@/types/Reminder";
import { Text } from "react-native-paper";

export default function ReminderDetailsById() {
  const { id } = useLocalSearchParams();
  const { getNextDose } = useDoses();
  const { getReminderById, deleteReminder, disabledReminderById } =
    useReminders();

  const reminder = getReminderById(id as string);
  const nextDose = getNextDose(reminder?.id);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [colorCircularIdentifier, setColorCircularIdentifier] =
    useState("#05df72");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleDeletePress = () => setShowConfirmDialog(true);

  useEffect(() => {
    if (reminder) {
      setIsSwitchOn(reminder.active);
      setColorCircularIdentifier(reminder.active ? "#05df72" : "#939393");
    }
  }, [reminder]);

  const handleToggleSwitch = () => {
    if (reminder) {
      disabledReminderById(reminder.id);
      setIsSwitchOn((prev) => {
        const newVal = !prev;
        setColorCircularIdentifier(newVal ? "#05df72" : "#939393");
        return newVal;
      });
    }
  };

  const frequencyLabel =
    frequencyOptions.find((f) => f.value === reminder?.frequency)?.label ?? "-";


  const handleEdit = () => router.push(`/reminders/${id}/editar`);
  const handleHistory = () => router.push(`/history`);
  const handleDelete = () => {
    if (reminder) {
      deleteReminder(reminder.id);
      router.navigate("/reminders");
    }
  };

  if (!reminder) return <Text style={{ margin: 20 }}>Carregando...</Text>;

  return (
    <DefaultScreen>
      <View style={styles.container}>
        <View style={{ width: "100%", marginBottom: 16 }}>
          <ReminderImage source={reminderTypeToImage[reminder.type]} width={150} height={150} />
          <ReminderInfoCard reminder={reminder} frequencyLabel={frequencyLabel} nextDose={nextDose} />
        </View>
        <ReminderActions
          isSwitchOn={isSwitchOn}
          onToggleSwitch={handleToggleSwitch}
          colorCircularIdentifier={colorCircularIdentifier}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewALL={handleHistory}
        />
      </View>
    </DefaultScreen >
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    flex: 1,
    gap: 16,
  },
});
