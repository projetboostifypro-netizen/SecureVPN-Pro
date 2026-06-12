import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ConnectButton } from "@/components/ConnectButton";
import { IpCard } from "@/components/IpCard";
import { StatsBar } from "@/components/StatsBar";
import { useVpn } from "@/context/VpnContext";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { status, selectedCountry, selectedProtocol, realIp, vpnIp, stats, connect, disconnect } =
    useVpn();

  const isConnected = status === "connected";
  const isConnecting = status === "connecting" || status === "disconnecting";

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (isConnected) disconnect();
    else connect();
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <LinearGradient
        colors={
          isDark
            ? ["#0A0F1E", "#0D1628", "#0A0F1E"]
            : ["#F0F6FF", "#EAF3FF", "#F8FAFB"]
        }
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.appTitle, { color: colors.primary }]}>SecureVPN</Text>
            <Text style={[styles.appSubtitle, { color: colors.mutedForeground }]}>Pro</Text>
          </View>
          <Pressable
            onPress={() => router.push("/(tabs)/settings")}
            style={[styles.headerBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Feather name="settings" size={20} color={colors.foreground} />
          </Pressable>
        </View>

        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isConnected
                ? colors.success + "20"
                : isConnecting
                ? colors.warning + "20"
                : colors.muted,
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: isConnected
                  ? colors.success
                  : isConnecting
                  ? colors.warning
                  : colors.mutedForeground,
              },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              {
                color: isConnected
                  ? colors.success
                  : isConnecting
                  ? colors.warning
                  : colors.mutedForeground,
              },
            ]}
          >
            {isConnected ? "Connection Secured" : isConnecting ? "Processing..." : "Not Protected"}
          </Text>
        </View>

        {/* Connect Button */}
        <View style={styles.connectArea}>
          <ConnectButton status={status} onPress={handlePress} />
        </View>

        {/* Selected Country */}
        <Pressable
          onPress={() => router.push("/(tabs)/countries")}
          style={[styles.countryPill, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
          <View style={styles.countryInfo}>
            <Text style={[styles.countryName, { color: colors.foreground }]}>
              {selectedCountry.name}
            </Text>
            <Text style={[styles.countryCity, { color: colors.mutedForeground }]}>
              {selectedCountry.city} · {selectedProtocol.name}
            </Text>
          </View>
          <View style={styles.pingRow}>
            <View
              style={[
                styles.pingDot,
                {
                  backgroundColor:
                    selectedCountry.ping < 50
                      ? colors.success
                      : selectedCountry.ping < 100
                      ? colors.warning
                      : colors.destructive,
                },
              ]}
            />
            <Text style={[styles.pingText, { color: colors.mutedForeground }]}>
              {selectedCountry.ping}ms
            </Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
        </Pressable>

        {/* IP Card */}
        <View style={styles.section}>
          <IpCard
            realIp={realIp}
            vpnIp={vpnIp}
            isConnected={isConnected}
            countryFlag={selectedCountry.flag}
            countryName={selectedCountry.name}
          />
        </View>

        {/* Stats */}
        {isConnected && (
          <View style={styles.section}>
            <StatsBar
              downloadSpeed={stats.downloadSpeed}
              uploadSpeed={stats.uploadSpeed}
              totalDownloaded={stats.totalDownloaded}
              totalUploaded={stats.totalUploaded}
              connectedTime={stats.connectedTime}
            />
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable
            onPress={() => router.push("/(tabs)/countries")}
            style={[styles.quickBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Feather name="globe" size={20} color={colors.primary} />
            <Text style={[styles.quickLabel, { color: colors.foreground }]}>Servers</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(tabs)/protocols")}
            style={[styles.quickBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Feather name="shield" size={20} color={colors.primary} />
            <Text style={[styles.quickLabel, { color: colors.foreground }]}>Protocol</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(tabs)/settings")}
            style={[styles.quickBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Feather name="sliders" size={20} color={colors.primary} />
            <Text style={[styles.quickLabel, { color: colors.foreground }]}>Settings</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, gap: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 2,
    marginTop: -2,
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "center",
  },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  connectArea: {
    alignItems: "center",
    paddingVertical: 24,
  },
  countryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  countryFlag: { fontSize: 28 },
  countryInfo: { flex: 1, gap: 2 },
  countryName: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  countryCity: { fontSize: 12, fontFamily: "Inter_400Regular" },
  pingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  pingDot: { width: 6, height: 6, borderRadius: 3 },
  pingText: { fontSize: 11, fontFamily: "Inter_500Medium" },
  section: {},
  quickActions: { flexDirection: "row", gap: 12 },
  quickBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  quickLabel: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
});
