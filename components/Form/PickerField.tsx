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
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        itemStyle={{ height: 62, backgroundColor: theme.colors.primaryContainer, }}
        style={[
          styles.picker,
          {
            backgroundColor: theme.colors.primaryContainer,
            color: theme.colors.onSurface,
            width: "100%",
            borderRadius: 8
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
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    borderRadius: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    height: 62,
    fontSize: 18,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 0,
    borderColor: "transparent",
  },
});
