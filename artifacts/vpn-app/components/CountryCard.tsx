import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { Country } from "@/constants/countries";

interface Props {
  country: Country;
  selected?: boolean;
  isFavorite?: boolean;
  onSelect: () => void;
  onFavorite: () => void;
}

function PingDot({ ping }: { ping: number }) {
  const color = ping < 50 ? "#00D68F" : ping < 100 ? "#FFB800" : "#FF4444";
  return <View style={[styles.pingDot, { backgroundColor: color }]} />;
}

export function CountryCard({ country, selected, isFavorite, onSelect, onFavorite }: Props) {
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
      <Text style={styles.flag}>{country.flag}</Text>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={1}>
          {country.name}
        </Text>
        <Text style={[styles.city, { color: colors.mutedForeground }]}>{country.city}</Text>
      </View>
      <View style={styles.right}>
        {country.premium && (
          <View style={[styles.premiumBadge, { backgroundColor: colors.warning + "20" }]}>
            <Text style={[styles.premiumText, { color: colors.warning }]}>PRO</Text>
          </View>
        )}
        <View style={styles.pingRow}>
          <PingDot ping={country.ping} />
          <Text style={[styles.ping, { color: colors.mutedForeground }]}>{country.ping}ms</Text>
        </View>
        <Pressable onPress={onFavorite} hitSlop={8}>
          <Feather
            name="heart"
            size={16}
            color={isFavorite ? colors.destructive : colors.mutedForeground}
          />
        </Pressable>
      </View>
      {selected && (
        <View style={[styles.selectedDot, { backgroundColor: colors.primary }]} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    marginBottom: 8,
  },
  flag: {
    fontSize: 28,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  city: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  right: {
    alignItems: "flex-end",
    gap: 6,
  },
  pingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  ping: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  premiumBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  selectedDot: {
    position: "absolute",
    left: 0,
    top: "25%",
    bottom: "25%",
    width: 3,
    borderRadius: 2,
  },
});
