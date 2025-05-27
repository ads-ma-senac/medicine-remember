import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

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

  const { getReminderById } =
    useReminders();

  const reminder = getReminderById(id as string);
  const nextDose = getNextDose(reminder?.id);

  const frequencyLabel =
    frequencyOptions.find((f) => f.value === reminder?.frequency)?.label ?? "-";
  if (!reminder) return <Text style={{ margin: 20 }}>Carregando...</Text>;

  const imgSize = Platform.OS === "ios" ? 120 : 150
  return (
    <DefaultScreen>
      <View style={styles.container}>
        <View style={{ width: "100%", marginBottom: 16 }}>
          <ReminderImage source={reminderTypeToImage[reminder.type]} width={imgSize} height={imgSize} />
          <ReminderInfoCard reminder={reminder} frequencyLabel={frequencyLabel} nextDose={nextDose} />
        </View>
        <ReminderActions reminder={reminder} />
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
