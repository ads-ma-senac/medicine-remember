import { StyleSheet, TextStyle, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";
import React from "react";

type PickerOption = {
  label: string;
  value: string;
};

type FormPickerProps = {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  options: PickerOption[];
  style?: TextStyle;
};

export default function FormPicker({
  label,
  value,
  onChange,
  options,
  style,
}: FormPickerProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ borderRadius: 8, overflow: "hidden" }}>
        <Picker
            selectedValue={value}
            onValueChange={onChange}
            selectionColor={theme.colors.onSurface}
            style={[
              styles.picker,
              {
                backgroundColor: theme.colors.primaryContainer,
                color: theme.colors.onSurface,
              },
              style,
            ]}
        >
          {options.map((opt) => (
              <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                  style={{ fontSize: 18 }}
              />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {

  },
});
