import { MD3LightTheme, PaperProvider } from "react-native-paper";

import { Colors } from "@/constants/Colors";
import { MD3DarkTheme } from "react-native-paper";
import { RemindersProvider } from "@/context/RemindersContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, roundness: 8, colors: Colors.dark }
      : { ...MD3LightTheme, roundness: 8, colors: Colors.light };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <RemindersProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <StatusBar style="auto" />
        </RemindersProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
