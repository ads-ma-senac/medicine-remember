import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { DefaultScreen } from "@/components/DefaultScreen";
import DoseCard from "@/components/DoseCard";
import { EmptyState } from "@/components/EmptyState";
import { useDoses } from "@/hooks/useDoses";
import { Dose } from "@/types/Dose";
import { useEffect, useRef, useState } from "react";
import { ConfettiMethods, PIConfetti } from 'react-native-fast-confetti';

export default function Reminders() {
    const theme = useTheme();
    const ConfettiRef = useRef<ConfettiMethods>(null);

    const { getVisibleDosesWithinNext24Hours, markAllDosesAsTaken, doses } = useDoses();

    const [visibleDosesPending, setVisibleDosesPending] = useState<Dose[]>([]);

    useEffect(() => {
        const fetchDoses = async () => {
            const visibleDoses = getVisibleDosesWithinNext24Hours();
            setVisibleDosesPending(visibleDoses);
        };
        fetchDoses();
    }, [doses]);

    const handleConfirmAll = () => {
        ConfettiRef.current?.restart();
        markAllDosesAsTaken();
    };

    const disabledButton = visibleDosesPending.length === 0;

    return (
        <DefaultScreen>
            <View style={styles.container}>
                <PIConfetti ref={ConfettiRef} autoplay={false} fadeOutOnEnd count={300} />
                <Text style={styles.title}>Hoje</Text>
                <TouchableOpacity
                    onPress={handleConfirmAll}
                    disabled={disabledButton}
                    style={[styles.buttonContainer, { backgroundColor: disabledButton ? theme.colors.outline : theme.colors.onPrimaryContainer }]}>
                    <Text style={{ fontSize: 18, fontWeight: "700", textAlign: "center", color: theme.colors.onPrimary }}>
                        Confirmar todos os remédios
                    </Text>
                </TouchableOpacity>
                {
                    visibleDosesPending.length === 0 ? (
                        <EmptyState
                            title="Nenhuma dose hoje"
                            messagem="Não há doses programadas para as próximas 24 horas."
                        />
                    ) : (
                        <View style={styles.section}>
                            <FlatList
                                data={visibleDosesPending}
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
