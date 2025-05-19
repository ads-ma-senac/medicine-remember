import { StyleSheet, View } from "react-native";

import ActionCard from "@/components/ActionCard";
import ActionsSection from "@/components/ActionsSection";
import NextDoseInfo from "@/components/NextDoseInfo";
import ReminderSection from "@/components/ReminderSection";
import { useReminders } from "@/hooks/useReminders";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();
  const { getLastActiveReminders } = useReminders();

  const lastActiveReminders = getLastActiveReminders();

  return (
    <SafeAreaView
      style={[{ flex: 1 }, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <NextDoseInfo />
        <ActionsSection>
          <ActionCard icon="history" label="Histórico" onPress={() => router.push("/history")} />
          <ActionCard icon="pill" label="Lembretes" onPress={() => router.push("/(tabs)/reminders")} />
          <ActionCard icon="plus-circle" label="Novo lembrete" onPress={() => router.push("/add-reminder")} />
          <ActionCard icon="eye" label="Ver todos" />
        </ActionsSection>
        <ReminderSection title={"Últimos lembretes cadastrados"} reminders={lastActiveReminders} />
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
  actionContainer: {},
  actionCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
