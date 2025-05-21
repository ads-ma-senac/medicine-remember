import * as SystemUI from "expo-system-ui";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { useTheme } from "react-native-paper";

const iconSize = 32;

export default function TabLayout() {
  const theme = useTheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, [theme.colors.background]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 62,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home-variant" : "home-variant-outline"}
              color={color}
              size={iconSize}
              style={{ marginBottom: -4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders/index"
        options={{
          title: "Lembretes",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="pill"
              color={color}
              size={iconSize}
              style={{ marginBottom: -4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-reminder"
        options={{
          title: "Novo lembrete",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "plus-circle" : "plus-circle-outline"}
              size={iconSize}
              color={color}
              style={{ marginBottom: -4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Histórico",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="history"
              color={color}
              size={iconSize}
              style={{ marginBottom: -4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders/[id]/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="reminders/[id]/editar"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
