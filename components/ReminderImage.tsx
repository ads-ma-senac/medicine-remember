import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export function ReminderImage({ source, width = 120, height = 120 }: { source: string, width?: number, height?: number }) {
    return <Image style={[styles.image, { width, height }]} source={source} />;
}

const styles = StyleSheet.create({
    image: {
        alignSelf: "center",
        justifyContent: "center",
    },
});
