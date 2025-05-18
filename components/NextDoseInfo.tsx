import { capitalizeFirstLetter } from "@/lib/utils";
import { StyleSheet, View } from "react-native";

import { useLiveNextDose } from "@/hooks/useLiveNextDose";
import { dateUtils } from "@/lib/dateUtils";
import React from "react";
import { Text } from "react-native-paper";

export default function NextDoseInfo() {
  const nextDose = useLiveNextDose();

  return nextDose ? (
    <View style={styles.container}>
      <Text style={styles.label}>Próxima dose</Text>
      <Text style={styles.time}>
        {capitalizeFirstLetter(dateUtils.formatDistance(nextDose.datetime))}
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.label}>
        Você não tem doses agendadas nas próximas 24 horas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  time: {
    fontSize: 40,
    fontWeight: "bold",
  },
  remaining: {
    fontSize: 16,
    color: "#01df81",
    marginTop: 4,
  },
});
