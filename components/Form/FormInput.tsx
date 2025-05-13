import { StyleSheet, View } from "react-native";
import { Text, TextInput, TextInputProps, useTheme } from "react-native-paper";

import React from "react";

type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
} & TextInputProps;

export default function FormInput({
  label,
  value,
  onChangeText,
  ...rest
}: FormInputProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        mode="outlined"
        outlineColor="transparent"
        onChangeText={onChangeText}
        style={[
          styles.input,
          { backgroundColor: theme.colors.primaryContainer  },
        ]}
        {...rest}
      />
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
  input: {
    borderRadius: 12,
    fontSize: 20,
  },
});
