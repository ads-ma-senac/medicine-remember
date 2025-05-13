import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Text, TextInputProps, useTheme} from 'react-native-paper';


type FormNumericInputProps = {
    label: string;
    value: number | undefined;
    onChangeNumber: (value: number) => void;
    min?: number;
    max?: number;
} & Omit<TextInputProps, 'value' | 'onChangeText'>;

export default function FormNumericInput({
                                             label,
                                             value,
                                             onChangeNumber,
                                             min,
                                             max,
                                             ...rest
                                         }: FormNumericInputProps) {
    const theme = useTheme();

    const handleChange = (text: string) => {
        const num = Number(text);

        if (!isNaN(num)) {
            if ((min === undefined || num >= min) && (max === undefined || num <= max)) {
                onChangeNumber(num);
            }
        } else if (text === '') {
            onChangeNumber(0);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                value={value?.toString() ?? ''}
                mode="outlined"
                outlineColor="transparent"
                onChangeText={handleChange}
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

