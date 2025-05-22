import { FlatList, StyleSheet, View } from "react-native";

import { Reminder } from "@/types/Reminder";
import React from "react";
import { Text } from "react-native-paper";
import { EmptyState } from "./EmptyState";
import ReminderCard from "./ReminderCard";

type ReminderSectionProps = {
  title: string;
  reminders: Reminder[];
};

export default function ReminderSection({
  title,
  reminders,
}: ReminderSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {
        reminders.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ReminderCard reminder={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            showsVerticalScrollIndicator={false}
          />
        )
      }

    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
