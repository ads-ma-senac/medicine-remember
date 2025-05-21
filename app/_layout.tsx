import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppProvider } from "@/context/AppContext";
import { Colors } from "@/constants/colors";
import { MD3DarkTheme } from "react-native-paper";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, roundness: 8, colors: Colors.dark }
      : { ...MD3LightTheme, roundness: 8, colors: Colors.light };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <AppProvider>
          <SafeAreaView
            style={{ flex: 1 }}
            edges={["top", "bottom", "left", "right"]}
          >
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
            <StatusBar style="auto" />
          </SafeAreaView>
        </AppProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
