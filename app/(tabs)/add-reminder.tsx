import * as Crypto from "expo-crypto";

import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";


import FormInput from "@/components/Form/FormInput";
import FormNumericInput from "@/components/Form/FormNumericInput";
import FormPicker from "@/components/Form/FormPicker";
import { useReminders } from "@/hooks/useReminders";
import { frequencyOptions, FrequencyValue } from "@/types/Frequency";
import { Reminder, ReminderType, typesMedicine } from "@/types/Reminder";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function AddReminder() {
    const theme = useTheme();
    const { addReminder } = useReminders();

    const [name, setName] = useState("");
    const [type, setType] = useState<ReminderType>("pill");
    const [dosage, setDosage] = useState<number>();
    const [frequency, setFrequency] = useState<FrequencyValue>("1d");
    const [startTime, setStartTime] = useState<Date | undefined>(undefined);
    const [endTime, setEndTime] = useState<Date | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>("");

    const clearForm = () => {
        setName("");
        setType("pill");
        setDosage(undefined);
        setFrequency("1d");
        setStartTime(undefined);
        setEndTime(undefined);
    }

    const onChange = (event: any, selectedDate?: any) => {
        const currentDate = selectedDate;
        setStartTime(currentDate);
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

        if (startTime && endTime && startTime.getTime() > endTime.getTime()) {
            setMessage("A data de início não pode ser maior que a data de término");
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
            startTime,
            endTime,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        addReminder(reminder);
        clearForm();
        router.push("/");
    };

    return (
        <SafeAreaView
            style={[{ flex: 1 }, { backgroundColor: theme.colors.background }]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Novo medicamento</Text>
                    <View style={styles.formContainer}>
                        <FormInput label="Nome" value={name} onChangeText={setName} />
                        <FormPicker
                            label="Tipo de medicação"
                            value={type}
                            onChange={setType}
                            options={typesMedicine}
                        />
                        <FormNumericInput
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
                        {/* <DateTimeInput label="Data de início" onChange={onChange} value={new Date()}/> */}
                        {/* <DateTimeInput label="Data de termino" onChange={onChange} value={new Date() } minimumDate={new Date()}/> */}
                    </View>
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            {
                                message && <Text style={[styles.errorMessage, { color: theme.colors.error }]}>
                                    ️⚠️ {message}
                                </Text>
                            }
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
                                style={[styles.formButtonLabel, { color: theme.colors.surface }]}
                            >
                                Adicionar medicamento
                            </Text>
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
    imageContent:
    {
        maxWidth: 92,
        width: "100%",
        height: 86,
        flex: 1,
    },
    errorMessage: {
        fontSize: 14, fontWeight: "bold", alignItems: "center"
    }
});
