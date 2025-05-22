import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

import React from "react";

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
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        theme={{ colors: { elevation: { level3: theme.colors.onSurface } } }}
        style={{
          backgroundColor: theme.colors.primary,
          flex: 1 / 3,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
            marginLeft: 8,
          
        }}
      >
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
