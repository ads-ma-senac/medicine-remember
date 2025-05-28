import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/colors";
import { AppProvider } from "@/context/AppContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const lightTheme = { ...MD3LightTheme, roundness: 8, colors: Colors.light };
const darkTheme = { ...MD3DarkTheme, roundness: 8, colors: Colors.dark };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
