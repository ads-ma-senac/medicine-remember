import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import { DefaultScreen } from "@/components/DefaultScreen";
import { ReminderActions } from "@/components/ReminderActions";
import { ReminderImage } from "@/components/ReminderImage";
import { ReminderInfoCard } from "@/components/ReminderInfoCard";
import { useDoses } from "@/hooks/useDoses";
import { useReminders } from "@/hooks/useReminders";
import { frequencyOptions } from "@/types/Frequency";
import { reminderTypeToImage } from "@/types/Reminder";

export default function ReminderDetailsById() {
    const { id } = useLocalSearchParams();
    const { getNextDose } = useDoses();
    const { getReminderById, deleteReminder, disabledReminderById } = useReminders();

    const reminder = getReminderById(id as string);
    const nextDose = getNextDose(reminder?.id);

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [colorCircularIdentifier, setColorCircularIdentifier] = useState("#05df72");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const handleDeletePress = () => setShowConfirmDialog(true);

    useEffect(() => {
        if (reminder) {
            setIsSwitchOn(reminder.active);
            setColorCircularIdentifier(reminder.active ? "#05df72" : "#939393");
        }
    }, [reminder]);

    const handleToggleSwitch = () => {
        if (reminder) {
            disabledReminderById(reminder.id);
            setIsSwitchOn((prev) => {
                const newVal = !prev;
                setColorCircularIdentifier(newVal ? "#05df72" : "#939393");
                return newVal;
            });
        }
    };

    const frequencyLabel = frequencyOptions.find((f) => f.value === reminder?.frequency)?.label ?? "-";

    const handleEdit = () => router.push(`/reminders/${id}/editar`);
    const handleDelete = () => {
        if (reminder) {
            deleteReminder(reminder.id);
            router.navigate("/reminders");
        }
    };

    if (!reminder) return <Text style={{ margin: 20 }}>Carregando...</Text>;

    return (
        <DefaultScreen>
            <View style={styles.container}>
                <ReminderImage source={reminderTypeToImage[reminder.type]} />
                <ReminderInfoCard reminder={reminder} frequencyLabel={frequencyLabel} />
                <ReminderActions
                    isSwitchOn={isSwitchOn}
                    onToggleSwitch={handleToggleSwitch}
                    colorCircularIdentifier={colorCircularIdentifier}
                    onEdit={handleEdit}
                    onDelete={handleDeletePress}
                />
                {showConfirmDialog && (
                    <ConfirmDialog
                        visible={showConfirmDialog}
                        title="Deletar medicamento"
                        message="Tem certeza que deseja deletar este medicamento?"
                        onCancel={() => setShowConfirmDialog(false)}
                        onConfirm={() => {
                            handleDelete();
                            setShowConfirmDialog(false);
                        }}
                    />
                )}
            </View>
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "center",
        flex: 1,
        gap: 16,
    },
});
