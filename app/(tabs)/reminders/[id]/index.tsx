import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

import { DefaultScreen } from "@/components/DefaultScreen";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { capitalizeFirstLetter } from "@/lib/utils";
import { dateUtils } from "@/lib/dateUtils";
import { dosaFormat } from "@/lib/doseUtils";
import { frequencyOptions } from "@/types/Frequency";
import { reminderTypeToImage } from "@/types/Reminder";
import { useDoses } from "@/hooks/useDoses";
import { useReminders } from "@/hooks/useReminders";

export default function ReminderDetailsById() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const { getNextDose } = useDoses();
  const { getReminderById, deleteReminder, disabledReminderById } =
    useReminders();

  const reminder = getReminderById(id as string);
  const nextDose = getNextDose(reminder?.id);

  const [colorCircularIdentifier, setColorCircularIdentifier] =
    useState("#05df72");

  const [isSwitchOn, setIsSwitchOn] = useState(reminder?.active ?? false);

  const onToggleSwitch = () => {
    setColorCircularIdentifier(!isSwitchOn ? "#05df72" : "#939393");
    setIsSwitchOn(!isSwitchOn);

    if (reminder) disabledReminderById(reminder?.id);
  };

  const frequencyLabel =
    frequencyOptions.find((f) => f.value === reminder?.frequency)?.label ?? "-";

  const imageSource = reminder ? reminderTypeToImage[reminder.type] : null;

  const handleDelete = () => {
    if (reminder) {
      deleteReminder(reminder?.id);
      router.navigate("/reminders");
    }
  };

  return (
    <DefaultScreen>
      <View>
        {reminder && (
          <View style={styles.cardContainer}>
            <View
              style={{
                width: 128,
                height: 128,
                alignItems: "center",
                minWidth: "100%",
              }}
            >
              <Image style={styles.image} source={imageSource} />
            </View>
            <View style={styles.cardDetailsContainer}>
              <View style={[styles.cardDetails]}>
                <Text
                  style={[
                    styles.cardTitle,
                    { width: "100%", textAlign: "center" },
                  ]}
                >
                  {capitalizeFirstLetter(reminder.name)}
                </Text>
              </View>
              <View style={{ width: "100%", flex: 1 }}>
                <View style={[styles.cardDetails, { height: 34 }]}>
                  <Text style={[styles.cardText]}>{dosaFormat(reminder)}</Text>
                </View>
                <View style={[styles.cardDetails, { height: 34 }]}>
                  <Text style={styles.cardText}>
                    Próxima dose{" "}
                    {nextDose
                      ? dateUtils.formatDistance(nextDose.datetime)
                      : ""}
                  </Text>
                </View>
              </View>
              <View style={{ width: "100%", gap: 8 }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: theme.colors.inverseOnSurface,
                      gap: 6,
                      alignItems: "center",
                    },
                  ]}
                  onPress={() => {
                    router.push(`/reminders/${id}/editar`);
                  }}
                >
                  <MaterialCommunityIcons
                    name={"pencil-outline"}
                    size={20}
                    color={theme.colors.onSurface}
                    style={{ marginBottom: -1 }}
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    Editar Informações
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: theme.colors.inverseOnSurface,
                      gap: 6,
                      alignItems: "center",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={"clock-time-four"}
                    size={20}
                    color={theme.colors.onSurface}
                    style={{ marginBottom: 3 }}
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    Ver histórico
                  </Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.button,
                    {
                      backgroundColor: theme.colors.inverseOnSurface,
                      justifyContent: "space-between",
                      gap: 6,
                      alignItems: "center",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <View
                      style={[
                        styles.circularIdentifier,
                        { backgroundColor: colorCircularIdentifier },
                      ]}
                    ></View>
                    <Text
                      style={[
                        styles.buttonText,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      Tomar medicamentos
                    </Text>
                  </View>
                  <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    color="#05df72"
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: theme.colors.inverseOnSurface,
                      gap: 6,
                      alignItems: "center",
                    },
                  ]}
                  onPress={handleDelete}
                >
                  <MaterialCommunityIcons
                    name={"trash-can-outline"}
                    size={20}
                    color={theme.colors.error}
                    style={{ marginBottom: 3 }}
                  />
                  <Text
                    style={[styles.buttonText, { color: theme.colors.error }]}
                  >
                    Deletar medicamento
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 16,
    height: "100%",
  },
  cardDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    width: "100%",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    paddingRight: 16,
    paddingLeft: 16,
    width: "100%",
    height: 56,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: 128,
    height: 128,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingRight: 16,
    paddingLeft: 16,
    width: "100%",
    height: 68,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  circularIdentifier: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
});
