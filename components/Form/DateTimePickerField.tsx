import DateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
} from "@react-native-community/datetimepicker";
import { HelperText, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import React from "react";

type DateTimePickerFieldProps = {
  label: string;
  error?: string;
} & IOSNativeProps &
  AndroidNativeProps;

export default function DateTimePickerField({
  label,
  value,
  onChange,
  mode = "date",
  is24Hour = true,
  error,
  ...rest
}: DateTimePickerFieldProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label]} accessible accessibilityLabel={label}>
        {label}
      </Text>
      <DateTimePicker
        value={value}
        mode={mode}
        is24Hour={is24Hour}
        onChange={onChange}
        style={styles.input}
        {...rest}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
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
