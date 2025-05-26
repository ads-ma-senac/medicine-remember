import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmationBottomSheet = forwardRef<BottomSheet, Props>(
  ({ onConfirm, onCancel }, ref) => {
    const theme = useTheme();
    const snapPoints = useMemo(() => ["25%"], []);

    return (
      <BottomSheet ref={ref} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <View style={styles.sheetContainer}>
          <Text style={styles.title}>Deseja realmente deletar o medicamento?</Text>

          <Pressable
            style={[styles.button, { backgroundColor: theme.colors.error }]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>Sim, deletar</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: theme.colors.surfaceVariant }]}
            onPress={onCancel}
          >
            <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>Cancelar</Text>
          </Pressable>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
