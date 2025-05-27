import { capitalizeFirstLetter } from "@/lib/utils";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { dateUtils } from "@/lib/dateUtils";
import { Reminder, reminderTypeToImage } from "@/types/Reminder";
import { Image } from "expo-image";

import { useDoses } from "@/hooks/useDoses";
import { dosaFormat } from "@/lib/doseUtils";
import { frequencyOptions } from "@/types/Frequency";
import { router } from "expo-router";

export default function ReminderCard({ reminder }: { reminder: Reminder }) {
    const theme = useTheme();
    const { getNextDose } = useDoses();

    const nextDose = getNextDose(reminder.id);

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
            <View style={{ width: 40, height: 40 }}>
                <Image style={styles.image} source={imageSource} />
            </View>
            <View style={styles.cardDetailsContainer}>
                <View style={styles.cardDetails}>
                    <Text style={[styles.cardTitle]}>
                        {capitalizeFirstLetter(reminder.name)}
                    </Text>
                    <Text style={styles.cardText}>
                        {nextDose
                            ? capitalizeFirstLetter(
                                dateUtils.formatDistance(nextDose.datetime)
                            )
                            : ""}
                    </Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={[styles.cardText]}>
                        {dosaFormat(reminder)}
                    </Text>
                    <Text style={styles.cardText}>{frequencyLabel}</Text>
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
        fontSize: 20,
        fontWeight: "bold",
    },
    cardText: {
        fontSize: 14,
    },
    image: {
        flex: 1,
        width: 40,
        height: 40,
    },
});
