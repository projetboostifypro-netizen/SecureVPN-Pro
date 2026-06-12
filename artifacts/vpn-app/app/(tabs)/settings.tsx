import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SettingToggle } from "@/components/SettingToggle";
import { useVpn } from "@/context/VpnContext";
import { useColors } from "@/hooks/useColors";

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const {
    adBlockEnabled,
    killSwitchEnabled,
    autoConnect,
    toggleAdBlock,
    toggleKillSwitch,
    toggleAutoConnect,
    selectedProtocol,
    selectedCountry,
    stats,
  } = useVpn();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={[styles.header, { paddingTop: insets.top + 12, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>Settings</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Security Section */}
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>SECURITY</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SettingToggle
            icon="shield-off"
            title="Ad Blocker"
            description="Block ads, trackers and malware domains"
            value={adBlockEnabled}
            onToggle={toggleAdBlock}
            accent
          />
          <SettingToggle
            icon="zap"
            title="Kill Switch"
            description="Block internet if VPN disconnects"
            value={killSwitchEnabled}
            onToggle={toggleKillSwitch}
            accent
          />
          <SettingToggle
            icon="wifi"
            title="Auto-Connect"
            description="Connect VPN on startup"
            value={autoConnect}
            onToggle={toggleAutoConnect}
          />
        </View>

        {/* Current Config */}
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>CURRENT CONFIGURATION</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Pressable
            onPress={() => router.push("/(tabs)/countries")}
            style={styles.configRow}
          >
            <Text style={styles.configFlag}>{selectedCountry.flag}</Text>
            <View style={styles.configInfo}>
              <Text style={[styles.configLabel, { color: colors.mutedForeground }]}>SERVER</Text>
              <Text style={[styles.configValue, { color: colors.foreground }]}>
                {selectedCountry.name} · {selectedCountry.city}
              </Text>
            </View>
            <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
          </Pressable>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <Pressable
            onPress={() => router.push("/(tabs)/protocols")}
            style={styles.configRow}
          >
            <View style={[styles.configIcon, { backgroundColor: colors.primary + "20" }]}>
              <Feather name="shield" size={18} color={colors.primary} />
            </View>
            <View style={styles.configInfo}>
              <Text style={[styles.configLabel, { color: colors.mutedForeground }]}>PROTOCOL</Text>
              <Text style={[styles.configValue, { color: colors.foreground }]}>
                {selectedProtocol.name}
              </Text>
            </View>
            <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
          </Pressable>
        </View>

        {/* Session Stats */}
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>SESSION STATS</Text>
        <View style={[styles.statsGrid, { gap: 12 }]}>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="arrow-down-circle" size={20} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {stats.totalDownloaded.toFixed(1)} MB
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Downloaded</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="arrow-up-circle" size={20} color={colors.success} />
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {stats.totalUploaded.toFixed(1)} MB
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Uploaded</Text>
          </View>
        </View>

        {/* About */}
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>ABOUT</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { icon: "info" as const, label: "Version", value: "1.0.0" },
            { icon: "server" as const, label: "Servers", value: "32 countries" },
            { icon: "lock" as const, label: "Encryption", value: "AES-256-GCM" },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <View style={styles.aboutRow}>
                <Feather name={item.icon} size={16} color={colors.mutedForeground} />
                <Text style={[styles.aboutLabel, { color: colors.foreground }]}>{item.label}</Text>
                <Text style={[styles.aboutValue, { color: colors.mutedForeground }]}>{item.value}</Text>
              </View>
              {i < arr.length - 1 && (
                <View style={[styles.separator, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  title: { fontSize: 17, fontFamily: "Inter_700Bold" },
  scroll: { padding: 20, gap: 0 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  separator: { height: 1, marginLeft: 0 },
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  configFlag: { fontSize: 26 },
  configIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  configInfo: { flex: 1, gap: 2 },
  configLabel: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },
  configValue: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  statsGrid: { flexDirection: "row" },
  statBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 1,
  },
  statValue: { fontSize: 16, fontFamily: "Inter_700Bold" },
  statLabel: { fontSize: 11, fontFamily: "Inter_400Regular" },
  aboutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
  },
  aboutLabel: { flex: 1, fontSize: 14, fontFamily: "Inter_500Medium" },
  aboutValue: { fontSize: 13, fontFamily: "Inter_400Regular" },
});
