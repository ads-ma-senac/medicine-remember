import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";

import { ReminderImage } from "@/components/ReminderImage";
import { useReminders } from "@/hooks/useReminders";
import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";
import { Reminder, reminderTypeToImage } from "@/types/Reminder";
import { router } from "expo-router";

export default function DoseCard({ dose }: { dose: Dose }) {
  const theme = useTheme();
  const { getReminderById } = useReminders();

  const [isSwitchOn, setIsSwitchOn] = useState(dose.taken);
  const [reminder, setReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    const foundReminder = getReminderById(dose.reminderId);
    if (!foundReminder) {
      router.navigate("/");
      return;
    }
    setReminder(foundReminder);
  }, [dose.reminderId]);

  useEffect(() => {
    setIsSwitchOn(dose.taken);
  }, [dose.taken]);

  const imageSource = useMemo(() => {
    return reminder ? reminderTypeToImage[reminder.type] : undefined;
  }, [reminder]);

  const handleToggleSwitch = () => {
    setIsSwitchOn((prev) => !prev);
  };

  if (!reminder) return null;

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.colors.primaryContainer }]}>
      <View style={styles.cardDetailsContainer}>
        <View style={styles.row}>
          <ReminderImage width={46} height={46} source={imageSource} />
          <View style={styles.column}>
            <Text style={[styles.text, { color: theme.colors.onSurface, fontWeight: "bold" }]}>
              {reminder.name}
            </Text>
            <Text style={[styles.text, { color: theme.colors.onSurface }]}>
              {dateUtils.formatDistance(dose.datetime)}
            </Text>
          </View>
        </View>
        <Switch value={isSwitchOn} onValueChange={handleToggleSwitch} color="#05df72" />
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
