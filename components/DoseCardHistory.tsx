import { Reminder, reminderTypeToImage } from "@/types/Reminder";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { ReminderImage } from "@/components/ReminderImage";
import { useReminders } from "@/hooks/useReminders";
import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";


function DoseTakenBadge({ taken }: { taken: boolean }) {

  const theme = useTheme();
  const message = taken ? "Tomou" : "Esqueceu"
  const icon = taken ? "check-circle" : "close-circle";
  const colorCheck = !theme.dark ? "#05df72" : "#4caf50";
  const colorClose = !theme.dark ? "#ff1744" : "#f44336";
  const color = taken ? colorCheck : colorClose;

  return (
    <View
      style={{
        backgroundColor: color,
        borderRadius: 8,
        paddingRight: 6,
        paddingLeft: 6,
        paddingTop: 2,
        paddingBottom: 2,
        flexDirection: "row",
        gap: 4
      }}
    >
      <MaterialCommunityIcons name={icon} size={20} color={"#fff"} />
      <Text style={{ color: "#fff", fontSize: 12 }}>
        {message}
      </Text>
    </View>
  );
}

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
    <View style={[styles.cardContainer, { backgroundColor: theme.colors.primaryContainer }]}>
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
        <DoseTakenBadge taken={dose.taken} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    flexDirection: "row",
    flex: 1,
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: "space-between",
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
