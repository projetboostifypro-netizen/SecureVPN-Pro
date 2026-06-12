import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";
import { useColors } from "@/hooks/useColors";

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "shield", selected: "shield.fill" }} />
        <Label>VPN</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="countries">
        <Icon sf={{ default: "globe", selected: "globe.americas.fill" }} />
        <Label>Servers</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="protocols">
        <Icon sf={{ default: "lock", selected: "lock.fill" }} />
        <Label>Protocol</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Icon sf={{ default: "gearshape", selected: "gearshape.fill" }} />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          height: isWeb ? 84 : 60,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "VPN",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="shield.fill" tintColor={color} size={22} />
            ) : (
              <Feather name="shield" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="countries"
        options={{
          title: "Servers",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="globe" tintColor={color} size={22} />
            ) : (
              <Feather name="globe" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="protocols"
        options={{
          title: "Protocol",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="lock.fill" tintColor={color} size={22} />
            ) : (
              <Feather name="lock" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="gearshape.fill" tintColor={color} size={22} />
            ) : (
              <Feather name="settings" size={22} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
