import { useReminders } from "@/hooks/useReminders";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";

export function ReminderActions({
    reminder,
    onEdit,
    onDelete,
    onViewALL,
}: any) {
    const theme = useTheme();
    const { disabledReminderById, deleteReminderById } = useReminders();
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const colorCircularIdentifier = isSwitchOn ? "#05df72" : "#939393";

    const handleEdit = () => router.push(`/reminders/${reminder.id}/editar`);
    const handleHistory = () => router.push(`/history`);
    const handleDelete = () => { deleteReminderById(reminder.id); router.push("/reminders") };
    const handleToggleSwitch = () => {
        if (reminder) {
            disabledReminderById(reminder.id);
            setIsSwitchOn((prev) => !prev)
        }
    };

    useEffect(() => {
        if (reminder) {
            setIsSwitchOn(reminder.active);
        }
    }, [reminder, isSwitchOn]);

    return (
        <View style={styles.container}>
            <ActionButton icon="pencil-outline" text="Editar Informações" onPress={handleEdit} />
            <ActionButton icon="clock-time-four" text="Ver histórico" onPress={handleHistory} />
            <View style={[styles.button, { backgroundColor: theme.colors.inverseOnSurface, justifyContent: "space-between" }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <View style={[styles.circle, { backgroundColor: colorCircularIdentifier }]} />
                    <Text style={[styles.text, { color: theme.colors.onSurface }]}>Status lembrete</Text>
                </View>
                <Switch value={isSwitchOn} onValueChange={handleToggleSwitch} color={colorCircularIdentifier} />
            </View>
            <ActionButton icon="trash-can-outline" text="Deletar medicamento" onPress={handleDelete} error />
        </View>
    );
}


type ActionButtonProps = {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    text: string
    onPress: () => void
    error?: boolean
}

function ActionButton({ icon, text, onPress, error = false }: ActionButtonProps) {
    const theme = useTheme();
    const color = error ? theme.colors.error : theme.colors.onSurface;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: theme.colors.inverseOnSurface }]}
        >
            <MaterialCommunityIcons name={icon} size={20} color={color} />
            <Text style={[styles.text, { color }]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { width: "100%", gap: 8 },
    button: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        padding: 16,
        width: "100%",
        height: 64,
        gap: 8,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 99,
    },
});
