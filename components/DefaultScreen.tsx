// components/ThemeBackground.tsx

import { ReactNode } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface DefaultScreenPros {
  children: ReactNode;
}

export function DefaultScreen({ children }: DefaultScreenPros) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "bottom", "left", "right"]}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
