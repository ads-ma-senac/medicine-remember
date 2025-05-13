import { FlatList, StyleSheet, View } from "react-native";

import React from "react";
import { Reminder } from "@/types/Reminder";
import ReminderCard from "./ReminderCard";
import { Text } from "react-native-paper";

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
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReminderCard reminder={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex:1,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
