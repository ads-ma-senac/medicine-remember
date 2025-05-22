import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";

export function ReminderActions({
    isSwitchOn,
    onToggleSwitch,
    colorCircularIdentifier,
    onEdit,
    onDelete,
    onViewALL,
}: any) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <ActionButton icon="pencil-outline" text="Editar Informações" onPress={onEdit} />
            <ActionButton icon="clock-time-four" text="Ver histórico" onPress={onViewALL} />
            <View style={[styles.button, { backgroundColor: theme.colors.inverseOnSurface, justifyContent: "space-between" }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <View style={[styles.circle, { backgroundColor: colorCircularIdentifier }]} />
                    <Text style={[styles.text, { color: theme.colors.onSurface }]}>Tomar medicamentos</Text>
                </View>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#05df72" />
            </View>
            <ActionButton icon="trash-can-outline" text="Deletar medicamento" onPress={onDelete} error />
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
        height: 56,
        gap: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 12,
    },
});
