import * as Crypto from "expo-crypto";

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import FormInput from "@/components/Form/FormInput";
import FormNumericInput from "@/components/Form/FormNumericInput";
import FormPicker from "@/components/Form/FormPicker";
import { images } from "@/constants/images";
import { useReminders } from "@/hooks/useReminders";
import { frequencyOptions, FrequencyValue } from "@/types/Frequency";
import { Reminder, ReminderType, typesMedicine } from "@/types/Reminder";
import { Image } from "expo-image";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddReminder() {
    const theme = useTheme();
    const { addReminder } = useReminders();

    const [name, setName] = useState("");
    const [type, setType] = useState<ReminderType>("pill");
    const [dosage, setDosage] = useState<number>(1);
    const [frequency, setFrequency] = useState<FrequencyValue>("1d");
    const [startTime, setStartTime] = useState<Date | undefined>(undefined);
    const [endTime, setEndTime] = useState<Date | undefined>(undefined);



    const handleSave = async () => {
        const UUID = Crypto.randomUUID();

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
        router.replace("/");
    };

    return (
        <SafeAreaView
            style={[{ flex: 1 }, { backgroundColor: theme.colors.background }]}
        >
            <View style={styles.container}>
                <View style={{ width: "100%",height:138,alignItems: "center",justifyContent: "center" }}>
                    <Image source={images.pill3d} priority={"high"} style={styles.imageContent} />
                </View>
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
                            { backgroundColor: theme.colors.tertiaryContainer },
                        ]}
                        onPress={handleSave}
                    >
                        <Text
                            style={[styles.formButtonLabel, { color: theme.colors.tertiary }]}
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
            width:"100%",
            height: 86,
            flex: 1,
        },
});
