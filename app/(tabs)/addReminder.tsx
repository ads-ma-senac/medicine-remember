import * as Crypto from "expo-crypto";

import {Button, Text, useTheme} from "react-native-paper";
import React, {useState} from "react";
import {StyleSheet, View} from "react-native";

import FormInput from "@/components/Form/FormInput";
import FormPicker from "@/components/Form/FormPicker";
import {Reminder, ReminderType, typesMedicine} from "@/types/Reminder";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";

import {useReminders} from "@/hooks/UseReminders";

import {frequencyOptions, FrequencyValue} from "@/types/Frequency";
import FormNumericInput from "@/components/Form/FormNumericInput";

export default function AddReminder() {
    const theme = useTheme();
    const {addReminderHandler} = useReminders();

    const [name, setName] = useState("");
    const [type, setType] = useState<ReminderType>("pill");
    const [dosage, setDosage] = useState<number>(1);
    const [frequency, setFrequency] = useState<FrequencyValue>("1d");

    const handleSave = async () => {
        const UUID = Crypto.randomUUID();

        const reminder: Reminder = {
            id: UUID,
            name,
            type,
            dosage,
            frequency,
            active: true
        };

        addReminderHandler(reminder);
        router.replace("/");
    };

    return (
        <SafeAreaView
            style={[{flex: 1}, {backgroundColor: theme.colors.background}]}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Novo medicamento</Text>
                <View style={styles.formContainer}>
                    <FormInput label="Nome" value={name} onChangeText={setName}/>
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
                        min={1}
                        onChangeNumber={setDosage}
                    />
                    <FormPicker
                        label="Frequência"
                        value={frequency}
                        onChange={setFrequency}
                        options={frequencyOptions}
                    />
                    <Button
                        mode="contained"
                        style={[
                            styles.formButton,
                            {backgroundColor: theme.colors.tertiaryContainer},
                        ]}
                        onPress={handleSave}
                    >
                        <Text
                            style={[styles.formButtonLabel, {color: theme.colors.tertiary}]}
                        >
                            Adicionar medicamento
                        </Text>
                    </Button>
                </View>
            </View>
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
        flex: 1,
        flexDirection: "column",
        gap: 24,
    },
    title: {
        fontSize: 32,
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
});
