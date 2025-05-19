import { capitalizeFirstLetter } from "@/lib/utils";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { Reminder, reminderTypeToImage } from "@/types/Reminder";
import { Image } from "expo-image";

import { dosaFormat } from "@/lib/doseUtils";
import { frequencyOptions } from "@/types/Frequency";
import { router } from "expo-router";

export default function ReminderCardStatus({ reminder }: { reminder: Reminder }) {
    const theme = useTheme();

    const frequencyLabel = frequencyOptions.find(f =>
        f.value === reminder.frequency)?.label ?? "-"

    const imageSource = reminderTypeToImage[reminder.type];

    const handlePress = () => {
        router.push(`/reminders/${reminder.id}`);
    }

    return (
        <TouchableOpacity
            style={[
                styles.cardContainer,
                { backgroundColor: theme.colors.primaryContainer },
            ]}
            onPress={handlePress}
        >
            <View style={{ width: 52, height: 52 }}>
                <Image style={styles.image} source={imageSource} />
            </View>
            <View style={styles.cardDetailsContainer}>
                <View style={styles.cardDetails}>
                    <Text style={[styles.cardTitle]}>
                        {capitalizeFirstLetter(reminder.name)}
                    </Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={[styles.cardText]}>
                        {dosaFormat(reminder)}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: theme.colors.onSecondaryContainer }]} >
                        <Text style={[styles.cardText, { color: theme.colors.onSecondary }]}>{reminder.active ? "Ativo" : "Pausado"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    cardDetailsContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 6,
    },
    cardDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    cardText: {
        fontSize: 16,
    },
    image: {
        flex: 1,
        width: 52,
        height: 52,
    },
    badge: {
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 8,
        gap: 4,
        minWidth: 64,
        maxWidth: 128,
        height: 32,
        fontWeight: "bold",
    }
});
