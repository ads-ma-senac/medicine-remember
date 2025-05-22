import { images } from "@/constants/images";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface EmptyStateProps {
    title?: string
    messagem?: string
}

export function EmptyState({ title = "Você ainda não cadastrou nenhum medicamento", messagem = "Toque no '+' para criar seu primeiro lembrete." }: EmptyStateProps) {
    return (
        <View style={{ alignItems: "center", gap: 6, justifyContent: "center", flex: 1 }}>
            <Image style={styles.image} source={images.emptyState} />
            <View style={{ alignItems: "center", gap: 8 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message} >{messagem}</Text>
            </View>
        </View>
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
        fontSize: 12,
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
