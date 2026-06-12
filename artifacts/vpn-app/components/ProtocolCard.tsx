import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { Protocol } from "@/constants/protocols";

interface Props {
  protocol: Protocol;
  selected?: boolean;
  onSelect: () => void;
}

const speedColor = (speed: string, colors: ReturnType<typeof useColors>) =>
  speed === "Fast" ? colors.success : speed === "Medium" ? colors.warning : colors.mutedForeground;

const securityColor = (sec: string, colors: ReturnType<typeof useColors>) =>
  sec === "Maximum" ? colors.primary : sec === "High" ? colors.success : colors.warning;

export function ProtocolCard({ protocol, selected, onSelect }: Props) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: selected ? colors.primary + "18" : colors.card,
          borderColor: selected ? colors.primary : colors.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, { color: colors.foreground }]}>{protocol.name}</Text>
          {protocol.recommended && (
            <View style={[styles.badge, { backgroundColor: colors.primary + "20" }]}>
              <Text style={[styles.badgeText, { color: colors.primary }]}>RECOMMENDED</Text>
            </View>
          )}
        </View>
        {selected && (
          <View style={[styles.checkCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.check}>✓</Text>
          </View>
        )}
      </View>
      <Text style={[styles.description, { color: colors.mutedForeground }]}>{protocol.description}</Text>
      <View style={styles.tags}>
        <View style={[styles.tag, { backgroundColor: speedColor(protocol.speed, colors) + "20" }]}>
          <Text style={[styles.tagText, { color: speedColor(protocol.speed, colors) }]}>
            {protocol.speed}
          </Text>
        </View>
        <View style={[styles.tag, { backgroundColor: securityColor(protocol.security, colors) + "20" }]}>
          <Text style={[styles.tagText, { color: securityColor(protocol.security, colors) }]}>
            {protocol.security} Security
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter_700Bold",
  },
});
