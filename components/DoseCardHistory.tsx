import { Reminder, reminderTypeToImage } from "@/types/Reminder";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { ReminderImage } from "@/components/ReminderImage";
import { useReminders } from "@/hooks/useReminders";
import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";
import { router } from "expo-router";

export default function DoseCardHistory({ dose }: { dose: Dose }) {
  const theme = useTheme();
  const { getReminderById } = useReminders();

  const [reminder, setReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    const foundReminder = getReminderById(dose.reminderId);
    if (!foundReminder) {
      router.navigate("/");
      return;
    }
    setReminder(foundReminder);
  }, [dose.reminderId]);

  const imageSource = useMemo(() => {
    return reminder ? reminderTypeToImage[reminder.type] : undefined;
  }, [reminder]);

  if (!reminder) return null;

  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
      <View style={styles.cardDetailsContainer}>
        <View style={styles.row}>
          <ReminderImage width={46} height={46} source={imageSource} />
          <View style={styles.column}>
            <Text
              style={[
                styles.text,
                { color: theme.colors.onSurface, fontWeight: "bold" },
              ]}
            >
              {reminder.name}
            </Text>
            <Text style={[styles.text, { color: theme.colors.onSurface }]}>
              {dateUtils.formatDateTime(dose.datetime)}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            {dose.taken ? "Tomado" : "Não tomado"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    gap: 16,
  },
  cardDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    gap: 6,
  },
});
