import { dateUtils } from "@/lib/dateUtils";
import { dosaFormat } from "@/lib/doseUtils";
import { capitalizeFirstLetter } from "@/lib/utils";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function ReminderInfoCard({ reminder, frequencyLabel, nextDose }: any) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{capitalizeFirstLetter(reminder.name)}</Text>

            <View style={[styles.card, { backgroundColor: theme.colors.inverseOnSurface }]}>
                <Text style={styles.text}>{dosaFormat(reminder)}</Text>
            </View>
            <View style={[styles.card, { backgroundColor: theme.colors.inverseOnSurface }]}>
                <Text style={styles.text}>{frequencyLabel}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.colors.inverseOnSurface }]}>
                <Text style={styles.text}>
                    {nextDose
                        ? "Próxima dose " + dateUtils.formatDistance(nextDose.datetime)
                        : ""}
                </Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
        gap: 12,
    },
    title: {
        fontSize: 38,
        fontWeight: "bold",
        textAlign: "center",
    },
    card: {
        borderRadius: 8,
        padding: 16,
        width: "100%",
        height: 56,
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
