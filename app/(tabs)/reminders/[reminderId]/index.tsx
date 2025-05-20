
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";


import { useReminders } from "@/hooks/useReminders";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ReminderDetailsById() {
    const theme = useTheme();
    const { reminderId } = useLocalSearchParams();
    const { getReminderById } = useReminders();

    const reminder = getReminderById(reminderId as string);

    return (
        <SafeAreaView
            style={[{ flex: 1 }, { backgroundColor: theme.colors.background }]}
        >
            <View style={styles.container}>
                <Text>
                    {reminder?.name}
                </Text>
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

});
