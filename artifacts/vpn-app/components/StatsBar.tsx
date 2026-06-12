import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface Props {
  downloadSpeed: number;
  uploadSpeed: number;
  totalDownloaded: number;
  totalUploaded: number;
  connectedTime: number;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatBytes(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb.toFixed(1)} MB`;
}

export function StatsBar({ downloadSpeed, uploadSpeed, totalDownloaded, totalUploaded, connectedTime }: Props) {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.stat}>
        <Feather name="arrow-down-circle" size={16} color={colors.primary} />
        <Text style={[styles.value, { color: colors.foreground }]}>{downloadSpeed.toFixed(1)}</Text>
        <Text style={[styles.unit, { color: colors.mutedForeground }]}>Mbps</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.stat}>
        <Feather name="clock" size={16} color={colors.accent} />
        <Text style={[styles.value, { color: colors.foreground }]}>{formatTime(connectedTime)}</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.stat}>
        <Feather name="arrow-up-circle" size={16} color={colors.success} />
        <Text style={[styles.value, { color: colors.foreground }]}>{uploadSpeed.toFixed(1)}</Text>
        <Text style={[styles.unit, { color: colors.mutedForeground }]}>Mbps</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  stat: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  value: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  unit: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  divider: {
    width: 1,
    height: 24,
  },
});
