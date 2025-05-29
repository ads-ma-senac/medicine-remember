
import { FrequencyValue, frequencyOptions } from "@/types/Frequency";
import { Reminder, ReminderType, typesMedicine } from "@/types/Reminder";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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

export default function EditReminder() {
  const theme = useTheme();
  const { getReminderById, updateReminder } = useReminders();

  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [type, setType] = useState<ReminderType>();
  const [dosage, setDosage] = useState<number>();
  const [frequency, setFrequency] = useState<FrequencyValue>();
  const [message, setMessage] = useState<string | undefined>("");

  useEffect(() => {
    const reminder = getReminderById(id as string);

    if (!reminder) {
      router.push("/");
      return;
    }

    setName(reminder.name);
    setType(reminder.type);
    setDosage(reminder.dosage);
    setFrequency(reminder.frequency as FrequencyValue);
  }, [id]);

  const clearForm = () => {
    setName("");
    setType("pill");
    setDosage(0);
    setFrequency("1d");
  };

  const handleSave = async () => {

    if (!name || !type || !dosage || !frequency || dosage < 1) {
      setMessage("Preencha todos os campos obrigatórios");
      return;
    }

    setMessage("");

    const reminder: Reminder = {
      id: id as string,
      name,
      type,
      dosage,
      frequency,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    clearForm();
    updateReminder(reminder);
    router.push(`/reminders/${reminder.id}`);
  };

  return (
    <DefaultScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Atualizar medicamento</Text>
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
