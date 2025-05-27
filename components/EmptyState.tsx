import { images } from "@/constants/images";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface EmptyStateProps {
    title?: string
    messagem?: string
}

export function EmptyState({ title = "Você ainda não cadastrou nenhum medicamento", messagem = "Toque no '+' para criar seu primeiro lembrete." }: EmptyStateProps) {
    const theme = useTheme();
    return (
        <View style={{ alignItems: "center", gap: 6, justifyContent: "center", flex: 1 }}>
            <Image style={styles.image} source={images.emptyState} />
            <View style={{ alignItems: "center", gap: 8 }}>
                <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
                <Text style={[styles.message, { color: theme.colors.onSurface }]} >{messagem}</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center",
    },
    message: {
        fontSize: 14,
        textAlign: "center",
        alignItems: "center"
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: "center",
        marginBottom: 16,
    },
});
