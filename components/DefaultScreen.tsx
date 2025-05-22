// components/ThemeBackground.tsx

import { ReactNode } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

interface DefaultScreenPros {
  children: ReactNode;
}

export function DefaultScreen({ children }: DefaultScreenPros) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </View>
  );
}
