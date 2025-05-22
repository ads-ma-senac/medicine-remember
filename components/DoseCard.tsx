import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";

import { Dose } from "@/types/Dose";

export default function DoseCard({ dose }: { dose: Dose }) {
  const theme = useTheme();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [colorCircularIdentifier, setColorCircularIdentifier] =
    useState("#05df72");

  useEffect(() => {
    if (dose) {
      setIsSwitchOn(dose.taken);
      setColorCircularIdentifier(dose.taken ? "#05df72" : "#939393");
    }
  }, [dose]);

  const handleToggleSwitch = () => {
    if (dose) {
      setIsSwitchOn((prev) => {
        const newVal = !prev;
        setColorCircularIdentifier(newVal ? "#05df72" : "#939393");
        return newVal;
      });
    }
  };

  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
      <View style={styles.cardDetailsContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View
            style={[
              styles.circle,
              { backgroundColor: colorCircularIdentifier },
            ]}
          />
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            Tomar medicamentos
          </Text>
        </View>
        <Switch
          value={isSwitchOn}
          onValueChange={handleToggleSwitch}
          color="#05df72"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
    flexDirection: "row",
    gap: 16,
  },
  cardDetailsContainer: {
    flex: 1,
  },
  cardDetails: {},
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
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
  circle: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
});
