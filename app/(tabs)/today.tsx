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
    const { getTodayDoses } = useDoses();

    const [doses, setDoses] = useState<Dose[]>([]);

    useEffect(() => {
        const fetchDoses = async () => {
            const todayDoses = getTodayDoses();
            setDoses(todayDoses);
        };
        fetchDoses();
    }, []);


    return (
        <DefaultScreen>
            <View style={styles.container}>
                <Text style={styles.title}>Hoje</Text>
                <TouchableOpacity style={{ backgroundColor: theme.colors.tertiaryContainer, padding: 16, borderRadius: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", textAlign: "center" }}>
                        Confirmar todos os remédios
                    </Text>
                </TouchableOpacity>
                {
                    doses.length === 0 ? (
                        <EmptyState title="" messagem="" />
                    ) : (
                        <View style={styles.section}>
                            <FlatList
                                data={doses}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <DoseCard dose={item} />}
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
});
