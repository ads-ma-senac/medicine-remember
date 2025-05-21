import { FlatList, StyleSheet, View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

import { DefaultScreen } from "@/components/DefaultScreen";
import DoseCard from "@/components/DoseCard";
import { useDoses } from "@/hooks/useDoses";
import { useState } from "react";

export default function History() {
  const { doses } = useDoses();
  const [value, setValue] = useState("");

  return (
    <DefaultScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Histórico</Text>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={{ borderRadius: 4 }}
          buttons={[
            {
              value: "day",
              label: "Dia",
            },
            {
              value: "week",
              label: "Semana",
            },
            { value: "month", label: "Mês" },
          ]}
        />
        <View style={styles.section}>
          <FlatList
            data={doses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DoseCard dose={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
