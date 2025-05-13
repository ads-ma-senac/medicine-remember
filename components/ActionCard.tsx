import {StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";
import {Text, useTheme} from "react-native-paper";

import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

type ActionCardProps = {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    label: string;
    backgroundColor?: string;
    iconColor?: string;
    style?: ViewStyle;
    onPress?: () => void;
};

export default function ActionCard({
                                       icon,
                                       label,
                                       backgroundColor,
                                       style,
                                       onPress
                                   }: ActionCardProps) {
    const theme = useTheme();

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons
                    name={icon}
                    size={32}
                    color={theme.colors.tertiary}
                    style={{
                        backgroundColor: backgroundColor || theme.colors.primaryContainer,
                        borderRadius: 8,
                        padding: 16,
                    }}
                />
            </TouchableOpacity>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        boxSizing: "border-box",
        gap: 8,
    },
    label: {
        boxSizing: "border-box",
        fontSize: 14,
        flexWrap: "wrap",
        textAlign: "center",
    },
});
