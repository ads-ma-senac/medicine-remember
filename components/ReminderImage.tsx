import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export function ReminderImage({ source }: { source: string }) {
    return <Image style={styles.image} source={source} />;
}

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        alignSelf: "center",
        marginBottom: 16,
    },
});
