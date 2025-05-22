import { FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { DefaultScreen } from "@/components/DefaultScreen";
import { EmptyState } from "@/components/EmptyState";
import ReminderCardStatus from "@/components/ReminderCardStatus";
import { useReminders } from "@/hooks/useReminders";

export default function Reminders() {
  const theme = useTheme();
  const { getAllReminders } = useReminders();
  const allReminders = getAllReminders();

  return (
    <DefaultScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Visão geral</Text>
        {
          allReminders.length === 0 ? (
            <EmptyState />
          ) : (
            <View style={styles.section}>
              <FlatList
                data={allReminders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ReminderCardStatus reminder={item} />}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )
        }
      </View>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingTop: 24,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "column",
  },
  section: {
    flex: 1,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 16,
  },
});
