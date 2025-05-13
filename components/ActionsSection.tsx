import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionCard from './ActionCard';


type ActionsSectionProps = {
    children: React.ReactNode;
};

export default function ActionsSection({ children }: ActionsSectionProps) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gridTemplateColumns: 'repeat(4, 1fr)',
        columnGap: 8,
    },
});
