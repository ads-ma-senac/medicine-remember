import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";

import { useReminders } from "@/hooks/useReminders";
import { Reminder } from "@/types/Reminder";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { router, useFocusEffect } from "expo-router";
import DeleteBottonSheet from "./DeleteBottonSheet";

interface ReminderActionsProps {
  reminder: Reminder;
}
export function ReminderActions({ reminder }: ReminderActionsProps) {
  const theme = useTheme();
  const { disabledReminderById, deleteReminderById } = useReminders();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const colorCircularIdentifier = isSwitchOn ? "#05df72" : "#939393";

  const handleEdit = () => router.push(`/reminders/${reminder.id}/editar`);
  const handleHistory = () => router.push(`/history`);
  const handleDelete = () => {
    bottomSheetRef.current?.expand();
  };
  const handleConfirmDelete = () => {
    deleteReminderById(reminder.id);
    bottomSheetRef.current?.close();
    router.push("/reminders");
  };

  const handleCancelDelete = () => {
    bottomSheetRef.current?.close();
  };

  const handleToggleSwitch = () => {
    if (reminder) {
      disabledReminderById(reminder.id);
      setIsSwitchOn((prev) => !prev);
    }
  };

  useEffect(() => {
    if (reminder) {
      setIsSwitchOn(reminder.active);
    }
  }, [reminder]);

  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close()
    }, [])
  );

  return (
    <View style={[styles.container, { flex: 1, backgroundColor: theme.colors.background }]}>
      <ActionButton
        icon="pencil-outline"
        text="Editar Informações"
        onPress={handleEdit}
      />
      <ActionButton
        icon="clock-time-four"
        text="Ver histórico"
        onPress={handleHistory}
      />
      <View
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.inverseOnSurface,
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View
            style={[
              styles.circle,
              { backgroundColor: colorCircularIdentifier },
            ]}
          />
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            Status lembrete
          </Text>
        </View>
        <Switch
          value={isSwitchOn}
          onValueChange={handleToggleSwitch}
          color={colorCircularIdentifier}
        />
      </View>
      <ActionButton
        icon="trash-can-outline"
        text="Deletar medicamento"
        onPress={handleDelete}
        error
      />
      <DeleteBottonSheet ref={bottomSheetRef}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.colors.errorContainer },
          ]}
          onPress={handleConfirmDelete}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: theme.colors.error,
              },
            ]}
          >
            Deletar lembrete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.colors.outlineVariant },
          ]}
          onPress={handleCancelDelete}
        >
          <Text style={[styles.buttonText]}>Cancelar</Text>
        </TouchableOpacity>
      </DeleteBottonSheet>
    </View>
  );
}

type ActionButtonProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
  onPress: () => void;
  error?: boolean;
};

function ActionButton({
  icon,
  text,
  onPress,
  error = false,
}: ActionButtonProps) {
  const theme = useTheme();
  const color = error ? theme.colors.error : theme.colors.onSurface;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: theme.colors.inverseOnSurface },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={20} color={color} />
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", gap: 8 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    gap: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 99,
  },
  bottomSheetContent: {
    padding: 16,
    alignItems: "center",
    gap: 16,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomSheetText: {
    fontSize: 16,
    textAlign: "center",
  },
  bottomSheetButtonContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    justifyContent: "center",
  },
  bottomSheetButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bottomSheetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
});
