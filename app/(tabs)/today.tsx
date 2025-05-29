import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { DefaultScreen } from "@/components/DefaultScreen";
import DoseCard from "@/components/DoseCard";
import { EmptyState } from "@/components/EmptyState";
import { useDoses } from "@/hooks/useDoses";
import { dateUtils } from "@/lib/dateUtils";
import { Dose } from "@/types/Dose";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ConfettiMethods, PIConfetti } from 'react-native-fast-confetti';

export default function Reminders() {
    const theme = useTheme();
    const ConfettiRef = useRef<ConfettiMethods>(null);

    const { getVisibleDosesToday, markAllDosesAsTaken, markDoseAsTaken, doses } = useDoses();

    const [visibleDosesPending, setVisibleDosesPending] = useState<Dose[]>([]);

    useEffect(() => {
        const fetchDoses = async () => {
            const visibleDosesToday = getVisibleDosesToday();
            setVisibleDosesPending(visibleDosesToday);
        };
        fetchDoses();
    }, [doses]);

    const handleConfirmAll = () => {
        console.log(ConfettiRef.current)
        ConfettiRef.current?.restart();
        markAllDosesAsTaken();
    };

    const handleConfirmDose = (doseId: string) => {
        ConfettiRef.current?.restart();
        markDoseAsTaken(doseId);
    }

    const disabledButton = visibleDosesPending.length === 0;

    return (
        <DefaultScreen>
            <View style={styles.container}>
                <PIConfetti ref={ConfettiRef} autoplay={false} fadeOutOnEnd count={300} />
                <View>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={{ fontSize: 18 }}>{dateUtils.getTodayformatDate()}</Text>
                </View>
                <View style={[styles.cardInfo, { borderColor: theme.colors.onSurface }]}>
                    <MaterialCommunityIcons name={"alert-circle-outline"} size={20} color={"#fff"} />
                    <View style={{ flexDirection: "column" }}>
                        <Text>Dica:</Text>
                        <Text>Pressione e segure um medicamento por 1 segundo para marcá-lo como tomado.</Text>
                    </View>
                </View>
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
                                renderItem={({ item }: { item: Dose }) => <DoseCard dose={item} onLongPress={() => handleConfirmDose(item.id)} />}
                                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    )
                }
            </View>
        </DefaultScreen >
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
    },
    cardInfo: {
        flexDirection: "row",
        gap: 8,
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 8,
        padding: 12
    }
});
