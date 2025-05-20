import ReminderCardStatus from "@/components/ReminderCardStatus";
import { useReminders } from "@/hooks/useReminders";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function Reminders() {
  
  const theme = useTheme();
  const { getAllReminders } = useReminders();
  const allReminders = getAllReminders();

  return (
    <SafeAreaView
      style={[{ flex: 1 }, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Visão geral</Text>
        <View style={styles.section}>
          <FlatList
            data={allReminders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ReminderCardStatus reminder={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
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
    flex:1,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 16,
  },
});
