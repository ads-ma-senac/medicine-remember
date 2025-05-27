import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { DefaultScreen } from "@/components/DefaultScreen";
import DoseCard from "@/components/DoseCard";
import { EmptyState } from "@/components/EmptyState";
import { useDoses } from "@/hooks/useDoses";
import { Dose } from "@/types/Dose";
import { useEffect, useState } from "react";

export default function Reminders() {
    const theme = useTheme();
    const { getVisibleDosesWithinNext24Hours, markAllDosesAsTaken } = useDoses();

    const [doses, setDoses] = useState<Dose[]>([]);

    useEffect(() => {
        const fetchDoses = async () => {
            const todayDoses = getVisibleDosesWithinNext24Hours();
            setDoses(todayDoses);
        };
        fetchDoses();
    }, []);

    const handleConfirmAll = () => markAllDosesAsTaken();

    return (
        <DefaultScreen>
            <View style={styles.container}>
                <Text style={styles.title}>Hoje</Text>
                <TouchableOpacity
                    onPress={handleConfirmAll}
                    style={[styles.buttonContainer, { backgroundColor: theme.colors.onPrimaryContainer }]}>
                    <Text style={{ fontSize: 18, fontWeight: "700", textAlign: "center", color: theme.colors.onPrimary }}>
                        Confirmar todos os remédios
                    </Text>
                </TouchableOpacity>
                {
                    doses.length === 0 ? (
                        <EmptyState
                            title="Nenhuma dose hoje"
                            messagem="Não há doses programadas para as próximas 24 horas."
                        />
                    ) : (
                        <View style={styles.section}>
                            <FlatList
                                data={doses}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }: { item: Dose }) => <DoseCard dose={item} />}
                                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    )
                }
            </View>
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        paddingTop: 24,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: "column",
    },
    section: {
        flex: 1,
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 16,
    },
    buttonContainer: {
        padding: 16,
        borderRadius: 8
    }
});
