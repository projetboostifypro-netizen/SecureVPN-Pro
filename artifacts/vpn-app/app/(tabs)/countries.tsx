import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CountryCard } from "@/components/CountryCard";
import { COUNTRIES, REGIONS } from "@/constants/countries";
import { useVpn } from "@/context/VpnContext";
import { useColors } from "@/hooks/useColors";

export default function CountriesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const { selectedCountry, selectCountry, favorites, toggleFavorite } = useVpn();
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("All");
  const [tab, setTab] = useState<"all" | "favorites">("all");

  const filtered = COUNTRIES.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "All" || c.region === region;
    const matchFav = tab === "all" || favorites.includes(c.id);
    return matchSearch && matchRegion && matchFav;
  });

  const handleSelect = (country: typeof COUNTRIES[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    selectCountry(country);
    router.back();
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>Select Server</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Search */}
      <View style={[styles.searchWrap, { backgroundColor: colors.muted, borderColor: colors.border }]}>
        <Feather name="search" size={16} color={colors.mutedForeground} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search country or city..."
          placeholderTextColor={colors.mutedForeground}
          style={[styles.searchInput, { color: colors.foreground }]}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Feather name="x" size={16} color={colors.mutedForeground} />
          </Pressable>
        )}
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
        {(["all", "favorites"] as const).map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t)}
            style={[
              styles.tab,
              { borderBottomColor: tab === t ? colors.primary : "transparent" },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: tab === t ? colors.primary : colors.mutedForeground },
              ]}
            >
              {t === "all" ? "All Servers" : "Favorites"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Region Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.regions}
      >
        {REGIONS.map((r) => (
          <Pressable
            key={r}
            onPress={() => setRegion(r)}
            style={[
              styles.regionPill,
              {
                backgroundColor: region === r ? colors.primary : colors.muted,
                borderColor: region === r ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.regionText,
                { color: region === r ? colors.primaryForeground : colors.mutedForeground },
              ]}
            >
              {r}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Count */}
      <Text style={[styles.count, { color: colors.mutedForeground }]}>
        {filtered.length} server{filtered.length !== 1 ? "s" : ""}
      </Text>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CountryCard
            country={item}
            selected={selectedCountry.id === item.id}
            isFavorite={favorites.includes(item.id)}
            onSelect={() => handleSelect(item)}
            onFavorite={() => toggleFavorite(item.id)}
          />
        )}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="globe" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No servers found</Text>
          </View>
        }
      />
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
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Inter_400Regular" },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
  },
  tabText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  regions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  regionPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 6,
  },
  regionText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  count: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  list: { paddingHorizontal: 16 },
  empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 14, fontFamily: "Inter_500Medium" },
});
