import React from "react";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

type ConfirmDialogProps = {
    visible: boolean;
    title?: string;
    message?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export function ConfirmDialog({
    visible,
    title = "Confirmação",
    message = "Tem certeza que deseja continuar?",
    onCancel,
    onConfirm,
}: ConfirmDialogProps) {

    const theme = useTheme();

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCancel} theme={{ colors: { elevation: { level3: theme.colors.onSurface } } }}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onCancel}>Cancelar</Button>
                    <Button onPress={onConfirm}>Confirmar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
