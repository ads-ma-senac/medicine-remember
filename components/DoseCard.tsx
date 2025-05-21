import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { Dose } from "@/types/Dose";
import React from "react";
import { dateUtils } from "@/lib/dateUtils";

export default function DoseCard({ dose }: { dose: Dose }) {
  const theme = useTheme();
  console.log(dose.datetime);
  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
      <View style={styles.cardDetailsContainer}>
        <View style={styles.cardDetails}>
          <Text style={[styles.cardTitle]}>{dose.taken}</Text>
        </View>
        <View style={styles.cardDetails}>
          <Text style={[styles.cardTitle]}>
            {dateUtils.formatDate(dose.datetime)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 6,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
  },
  image: {
    flex: 1,
    width: 52,
    height: 52,
  },
  badge: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
    gap: 4,
    minWidth: 64,
    maxWidth: 128,
    height: 32,
    fontWeight: "bold",
  },
});
