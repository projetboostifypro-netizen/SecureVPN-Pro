import React from "react";
import { Animated, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { Feather } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  value: boolean;
  onToggle: () => void;
  accent?: boolean;
}

export function SettingToggle({ icon, title, description, value, onToggle, accent }: Props) {
  const colors = useColors();
  const iconColor = accent ? colors.primary : colors.mutedForeground;

  return (
    <Pressable
      onPress={onToggle}
      style={[styles.row, { borderColor: colors.border }]}
    >
      <View style={[styles.iconWrap, { backgroundColor: iconColor + "18" }]}>
        <Feather name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.text}>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.desc, { color: colors.mutedForeground }]}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary + "80" }}
        thumbColor={value ? colors.primary : colors.mutedForeground}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 14,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  desc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
