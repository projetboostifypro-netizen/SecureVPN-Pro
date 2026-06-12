import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
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
import { ProtocolCard } from "@/components/ProtocolCard";
import { PROTOCOLS } from "@/constants/protocols";
import { useVpn } from "@/context/VpnContext";
import { useColors } from "@/hooks/useColors";

export default function ProtocolsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const { selectedProtocol, selectProtocol, status } = useVpn();
  const isConnected = status === "connected";

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={[styles.header, { paddingTop: insets.top + 12, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>VPN Protocol</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {isConnected && (
          <View style={[styles.notice, { backgroundColor: colors.warning + "20", borderColor: colors.warning + "40" }]}>
            <Feather name="alert-circle" size={14} color={colors.warning} />
            <Text style={[styles.noticeText, { color: colors.warning }]}>
              Disconnect to change the protocol
            </Text>
          </View>
        )}

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="shield" size={18} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
            WireGuard is recommended for the best balance of speed and security. Use Stealth for heavily censored networks.
          </Text>
        </View>

        {PROTOCOLS.map((p) => (
          <ProtocolCard
            key={p.id}
            protocol={p}
            selected={selectedProtocol.id === p.id}
            onSelect={() => {
              if (isConnected) return;
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              selectProtocol(p);
            }}
          />
        ))}
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
  notice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
  },
  noticeText: { fontSize: 13, fontFamily: "Inter_500Medium", flex: 1 },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
  },
  infoText: { fontSize: 13, fontFamily: "Inter_400Regular", flex: 1, lineHeight: 19 },
});
