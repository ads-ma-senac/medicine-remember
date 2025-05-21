import * as Crypto from "expo-crypto";

import { Button, Text, useTheme } from "react-native-paper";
import { FrequencyValue, frequencyOptions } from "@/types/Frequency";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Reminder, ReminderType, typesMedicine } from "@/types/Reminder";
import { router, useLocalSearchParams } from "expo-router";

import { DefaultScreen } from "@/components/DefaultScreen";
import FormField from "@/components/Form/InputField";
import FormPicker from "@/components/Form/PickerField";
import NumericInputField from "@/components/Form/NumericInputField";
import { useReminders } from "@/hooks/useReminders";

export default function EditReminder() {
  const theme = useTheme();
  const { getReminderById } = useReminders();

  const { id } = useLocalSearchParams();

  const reminder = getReminderById(id as string);

  const [name, setName] = useState(reminder?.name as string);
  const [type, setType] = useState<ReminderType>(
    reminder?.type as ReminderType
  );
  const [dosage, setDosage] = useState<number>(reminder?.dosage as number);
  const [frequency, setFrequency] = useState<FrequencyValue>(
    reminder?.frequency as FrequencyValue
  );
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const clearForm = () => {
    setName("");
    setType("pill");
    setDosage(0);
    setFrequency("1d");
    setStartTime("");
    setEndTime(undefined);
  };

  const handleSave = async () => {
    const UUID = Crypto.randomUUID();

    if (!name || !type || !dosage || !frequency || dosage < 1) {
      setMessage("Preencha todos os campos obrigatórios");
      return;
    }

    if (!startTime && endTime && endTime.getTime() < new Date().getTime()) {
      setMessage("A data de término não pode ser menor que a data atual");
      return;
    }

    setMessage("");

    const reminder: Reminder = {
      id: UUID,
      name,
      type,
      dosage,
      frequency,
      active: true,
      startTime: new Date(),
      endTime,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    clearForm();
    router.push("/");
  };

  return (
    <DefaultScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Novo medicamento</Text>
            <View style={styles.formContainer}>
              <FormField label="Nome" value={name} onChangeText={setName} />
              <FormPicker
                label="Tipo de medicação"
                value={type}
                onChange={setType}
                options={typesMedicine}
              />
              <NumericInputField
                label="Quantidade por dose"
                value={dosage}
                keyboardType="numeric"
                onChangeNumber={setDosage}
              />
              <FormPicker
                label="Frequência"
                value={frequency}
                onChange={setFrequency}
                options={frequencyOptions}
              />
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                {message && (
                  <Text
                    style={[styles.errorMessage, { color: theme.colors.error }]}
                  >
                    ️⚠️ {message}
                  </Text>
                )}
              </View>
              <Button
                mode="contained"
                style={[
                  styles.formButton,
                  { backgroundColor: theme.colors.onSurfaceVariant },
                ]}
                onPress={handleSave}
              >
                <Text
                  style={[
                    styles.formButtonLabel,
                    { color: theme.colors.surface },
                  ]}
                >
                  Atualizar medicamento
                </Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    paddingTop: 40,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: "column",
  },
  formContainer: {
    flexDirection: "column",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formButton: {
    marginTop: 16,
    borderRadius: 4,
    padding: 8,
  },
  formButtonLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContent: {
    maxWidth: 92,
    width: "100%",
    height: 86,
    flex: 1,
  },
  errorMessage: {
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
  },
});
