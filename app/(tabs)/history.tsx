import { FlatList, StyleSheet, View } from "react-native";
import { SegmentedButtons, Text, useTheme } from "react-native-paper";

import { DefaultScreen } from "@/components/DefaultScreen";
import DoseCard from "@/components/DoseCard";
import { EmptyState } from "@/components/EmptyState";
import { useDoses } from "@/hooks/useDoses";
import { useState } from "react";

export default function History() {
  const theme = useTheme();
  const { getAllActiveDoses } = useDoses();
  const [value, setValue] = useState("");
  
  const doses = getAllActiveDoses();

  return (
    <DefaultScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Histórico</Text>
        {
          doses.length === 0 ? (
            <EmptyState title="Nenhum histórico disponível" messagem="Comece a tomar seus remédios para registrar aqui" />
          ) : (
            <View style={{ gap: 16, flex:1 }}>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: theme.colors.primaryContainer,
                }}
              >
                <SegmentedButtons
                  value={value}
                  onValueChange={setValue}
                  style={{
                    borderRadius: 8,
                    backgroundColor: theme.colors.background,
                  }}
                  buttons={[
                    {
                      value: "day",
                      label: "Dia",
                      style: {
                        borderRadius: 8,
                        borderColor: "none",
                      },
                      labelStyle: { fontWeight: "bold" },
                    },
                    {
                      value: "week",
                      label: "Semana",
                      style: { borderColor: "none" },
                      labelStyle: { fontWeight: "bold" },
                    },
                    {
                      value: "month",
                      label: "Mês",
                      style: { borderRadius: 8, borderColor: "none" },
                      labelStyle: { fontWeight: "bold" },
                    },
                  ]}
                />
              </View>
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
