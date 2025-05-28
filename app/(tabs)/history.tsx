import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SegmentedButtons, Text, useTheme } from "react-native-paper";

import { DefaultScreen } from "@/components/DefaultScreen";
import DoseCardHistory from "@/components/DoseCardHistory";
import { EmptyState } from "@/components/EmptyState";
import { useDoses } from "@/hooks/useDoses";
import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";

type FilterPeriod = "day" | "week" | "month" | "all";

export default function History() {
  const theme = useTheme();
  const { getHistoryDoses } = useDoses();

  const [value, setValue] = useState<FilterPeriod>("all");
  const [doses, setDoses] = useState<Dose[]>([]);

  useEffect(() => {
    const fetchDoses = async () => {
      const historyDoses = getHistoryDoses();
      setDoses(historyDoses);
    };
    fetchDoses();
  }, []);

  const dosesFiltered = useMemo(() => {
    switch (value) {
      case "day":
        return doses.filter((dose) => dateUtils.isToday(dose.datetime));
      case "week":
        return doses.filter((dose) => dateUtils.isWeek(dose.datetime));
      case "month":
        return doses.filter((dose) => dateUtils.isMonth(dose.datetime));
      default:
        return doses;
    }
  }, [value, doses]);

  return (
    <DefaultScreen>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Histórico</Text>
          <Text style={styles.subtitle}>Acompanhe seus medicamentos</Text>
        </View>
        <View
          style={[
            styles.filterContainer,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            style={[
              { backgroundColor: theme.colors.background, borderRadius: 8 },
            ]}
            buttons={[
              {
                value: "day",
                label: "Dia",
                labelStyle: styles.buttonLabel,
                style: styles.segmentedButtonRight,
              },
              {
                value: "week",
                label: "Semana",
                labelStyle: styles.buttonLabel,
                style: styles.segmentedButton,
              },
              {
                value: "month",
                label: "Mês",
                labelStyle: styles.buttonLabel,
                style: styles.segmentedButton,
              },
              {
                value: "all",
                label: "Tudo",
                labelStyle: styles.buttonLabel,
                style: styles.segmentedButtonLeft,
              },
            ]}
          />
        </View>
        {dosesFiltered.length === 0 ? (
          <EmptyState
            title="Nenhum histórico disponível"
            messagem="Comece a tomar seus remédios para registrar aqui"
          />
        ) : (
          <View style={styles.section}>
            <FlatList
              data={dosesFiltered}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <DoseCardHistory dose={item} />}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  section: {
    flex: 1,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  filterContainer: {
    borderRadius: 8,
    padding: 2,
  },
  segmentedButton: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonLabel: {
    fontWeight: "bold",
    textAlign: "center",
  },
  segmentedButtonRight: {
    borderBottomStartRadius: 8,
    borderTopStartRadius: 8,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  segmentedButtonLeft: {
    borderBottomEndRadius: 8,
    borderTopEndRadius: 8,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
