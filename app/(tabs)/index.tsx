import { StyleSheet, View } from "react-native";

import ActionCard from "@/components/ActionCard";
import ActionsSection from "@/components/ActionsSection";
import NextDoseInfo from "@/components/NextDoseInfo";
import ReminderSection from "@/components/ReminderSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import {useReminders} from "@/hooks/UseReminders";
import {router} from "expo-router";

export default function Index() {
  const theme = useTheme();
  const { reminders } = useReminders();

  const activeRemindersPreview = reminders.filter( r => !r.active).slice(0,5);

  return (
    <SafeAreaView
      style={[{ flex: 1 }, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <NextDoseInfo />
        <ActionsSection>
          <ActionCard icon="history" label="Histórico" onPress={() => router.push("/history")} />
          <ActionCard icon="pill" label="Lembretes" onPress={() => router.push("/reminders")} />
          <ActionCard icon="plus-circle" label="Novo lembrete" onPress={() => router.push("/addReminder")} />
          <ActionCard icon="eye" label="Ver todos" />
        </ActionsSection>
        <ReminderSection title={"Medicamentos"} reminders={activeRemindersPreview} />
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
