import * as Crypto from "expo-crypto";

import { FrequencyValue, frequencyOptions } from "@/types/Frequency";
import { Reminder, ReminderType, typesMedicine } from "@/types/Reminder";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { DefaultScreen } from "@/components/DefaultScreen";
import FormField from "@/components/Form/InputField";
import NumericInputField from "@/components/Form/NumericInputField";
import FormPicker from "@/components/Form/PickerField";
import { useReminders } from "@/hooks/useReminders";
import { router } from "expo-router";

export default function AddReminder() {
  const theme = useTheme();
  const { addReminder } = useReminders();

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<ReminderType>();
  const [dosage, setDosage] = useState<number>(0);
  const [frequency, setFrequency] = useState<FrequencyValue>();
  const [message, setMessage] = useState<string | undefined>();

  const [showPicker, setShowPicker] = useState(false);

  const clearForm = () => {
    setName("");
    setType("pill");
    setDosage(0);
    setFrequency("1d");
  };


  const handleSave = async () => {
    const UUID = Crypto.randomUUID();

    if (!name || !type || !dosage || !frequency || dosage < 1) {
      setMessage("Preencha todos os campos obrigatórios");
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addReminder(reminder);
    clearForm();
    router.push("/");
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  return (
    <DefaultScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Novo lembrete</Text>
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
                  Adicionar lembrete
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
