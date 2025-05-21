
import { useDoses } from "@/hooks/useDoses";
import { useReminders } from "@/hooks/useReminders";
import { dateUtils } from "@/lib/dateUtils";
import { dosaFormat } from "@/lib/doseUtils";
import { capitalizeFirstLetter } from "@/lib/utils";
import { frequencyOptions } from "@/types/Frequency";
import { reminderTypeToImage } from "@/types/Reminder";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ReminderDetailsById() {
    const theme = useTheme();
    const { getNextDose } = useDoses();

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [colorCircularIdentifier, setColorCircularIdentifier] = useState("#05df72");

    const onToggleSwitch = () => {
        setColorCircularIdentifier(!isSwitchOn ? "#05df72" : "#939393")
        setIsSwitchOn(!isSwitchOn)
    };

    const { reminderId } = useLocalSearchParams();
    const { getReminderById } = useReminders();

    const reminder = getReminderById(reminderId as string);
    const nextDose = getNextDose(reminder?.id);

    const frequencyLabel = frequencyOptions.find(f =>
        f.value === reminder?.frequency)?.label ?? "-"

    const imageSource = reminder ? reminderTypeToImage[reminder.type] : null;

    return (
        <SafeAreaView
            style={[{ flex: 1, backgroundColor: theme.colors.background, paddingTop: 16 }]}
        >
            {
                reminder && (
                    <View
                        style={styles.cardContainer}
                    >
                        <View style={{ width: 128, height: 128, alignItems: "center", minWidth: "100%" }}>
                            <Image style={styles.image} source={imageSource} />
                        </View>
                        <View style={styles.cardDetailsContainer}>
                            <View style={[styles.cardDetails]}>
                                <Text style={[styles.cardTitle, { width: "100%", textAlign: "center" }]}>
                                    {capitalizeFirstLetter(reminder.name)}
                                </Text>
                            </View>
                            <View style={{ width: "100%", flex: 1 }}>
                                <View style={[styles.cardDetails, { height: 34 }]}>
                                    <Text style={[styles.cardText]}>
                                        {dosaFormat(reminder)}
                                    </Text>
                                </View>
                                <View style={[styles.cardDetails, { height: 34 }]}>
                                    <Text style={styles.cardText}>
                                        Próxima dose {nextDose ?
                                            dateUtils.formatDistance(nextDose.datetime)
                                            : ""}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: "100%", gap: 8 }}>
                                <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.inverseOnSurface, gap: 6, alignItems: "center" }]}>
                                    <MaterialCommunityIcons
                                        name={"pencil-outline"}
                                        size={20}
                                        color={theme.colors.onSurface}
                                        style={{ marginBottom: -1 }}
                                    />
                                    <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>
                                        Editar Informações
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.inverseOnSurface, gap: 6, alignItems: "center" }]}>
                                    <MaterialCommunityIcons
                                        name={"clock-time-four"}
                                        size={20}
                                        color={theme.colors.onSurface}
                                        style={{ marginBottom: 3 }}
                                    />
                                    <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>
                                        Ver histórico
                                    </Text>
                                </TouchableOpacity>
                                <View style={[styles.button, { backgroundColor: theme.colors.inverseOnSurface, justifyContent: "space-between", gap: 6, alignItems: "center" }]}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                        <View style={[styles.circularIdentifier, { backgroundColor: colorCircularIdentifier }]}></View>
                                        <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>
                                            Tomar medicamentos
                                        </Text>
                                    </View>
                                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#05df72" />
                                </View>
                                <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.inverseOnSurface, gap: 6, alignItems: "center" }]}>
                                    <MaterialCommunityIcons
                                        name={"trash-can-outline"}
                                        size={20}
                                        color={theme.colors.error}
                                        style={{ marginBottom: 3 }}
                                    />
                                    <Text style={[styles.buttonText, { color: theme.colors.error }]}>
                                        Deletar medicamento
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    cardContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 16,
        height: "100%"
    },
    cardDetailsContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        width: "100%"
    },
    cardDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        paddingRight: 16,
        paddingLeft: 16,
        width: "100%",
        height: 56
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
        height: 56,
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
    }
});