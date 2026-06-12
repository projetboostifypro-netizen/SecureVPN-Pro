import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface Props {
  realIp: string;
  vpnIp: string;
  isConnected: boolean;
  countryFlag: string;
  countryName: string;
}

export function IpCard({ realIp, vpnIp, isConnected, countryFlag, countryName }: Props) {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.row}>
        <View style={styles.ipBlock}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>YOUR IP</Text>
          <Text style={[styles.ip, { color: colors.foreground }]}>{realIp}</Text>
        </View>
        <View style={styles.arrow}>
          <Feather name="arrow-right" size={18} color={isConnected ? colors.success : colors.mutedForeground} />
        </View>
        <View style={styles.ipBlock}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>VPN IP</Text>
          {isConnected ? (
            <View style={styles.vpnIpRow}>
              <Text style={styles.flag}>{countryFlag}</Text>
              <Text style={[styles.ip, { color: colors.success }]}>{vpnIp}</Text>
            </View>
          ) : (
            <Text style={[styles.ip, { color: colors.mutedForeground }]}>Not connected</Text>
          )}
        </View>
      </View>
      {isConnected && (
        <View style={[styles.badge, { backgroundColor: colors.success + "20" }]}>
          <View style={[styles.dot, { backgroundColor: colors.success }]} />
          <Text style={[styles.badgeText, { color: colors.success }]}>
            Protected · {countryName}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ipBlock: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.5,
  },
  ip: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  vpnIpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  flag: {
    fontSize: 16,
  },
  arrow: {
    paddingHorizontal: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
});
