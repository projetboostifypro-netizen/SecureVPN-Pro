import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { COUNTRIES, Country } from "@/constants/countries";
import { PROTOCOLS, Protocol } from "@/constants/protocols";

export type VpnStatus = "disconnected" | "connecting" | "connected" | "disconnecting";

interface VpnStats {
  downloadSpeed: number;
  uploadSpeed: number;
  totalDownloaded: number;
  totalUploaded: number;
  connectedTime: number;
}

interface VpnContextValue {
  status: VpnStatus;
  selectedCountry: Country;
  selectedProtocol: Protocol;
  realIp: string;
  vpnIp: string;
  stats: VpnStats;
  adBlockEnabled: boolean;
  killSwitchEnabled: boolean;
  autoConnect: boolean;
  favorites: string[];
  connect: () => void;
  disconnect: () => void;
  selectCountry: (country: Country) => void;
  selectProtocol: (protocol: Protocol) => void;
  toggleAdBlock: () => void;
  toggleKillSwitch: () => void;
  toggleAutoConnect: () => void;
  toggleFavorite: (countryId: string) => void;
}

const defaultStats: VpnStats = {
  downloadSpeed: 0,
  uploadSpeed: 0,
  totalDownloaded: 0,
  totalUploaded: 0,
  connectedTime: 0,
};

const VpnContext = createContext<VpnContextValue | null>(null);

export function VpnProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<VpnStatus>("disconnected");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol>(PROTOCOLS[0]);
  const [realIp, setRealIp] = useState<string>("---.---.---.---");
  const [vpnIp, setVpnIp] = useState<string>("");
  const [stats, setStats] = useState<VpnStats>(defaultStats);
  const [adBlockEnabled, setAdBlockEnabled] = useState<boolean>(true);
  const [killSwitchEnabled, setKillSwitchEnabled] = useState<boolean>(false);
  const [autoConnect, setAutoConnect] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const statsRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetchRealIp();
    loadSettings();
  }, []);

  const fetchRealIp = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setRealIp(data.ip ?? "---.---.---.---");
    } catch {
      setRealIp("192.168.1.1");
    }
  };

  const loadSettings = async () => {
    try {
      const savedFavs = await AsyncStorage.getItem("vpn_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      const savedAdBlock = await AsyncStorage.getItem("vpn_adblock");
      if (savedAdBlock !== null) setAdBlockEnabled(JSON.parse(savedAdBlock));
      const savedKillSwitch = await AsyncStorage.getItem("vpn_killswitch");
      if (savedKillSwitch !== null) setKillSwitchEnabled(JSON.parse(savedKillSwitch));
      const savedAutoConnect = await AsyncStorage.getItem("vpn_autoconnect");
      if (savedAutoConnect !== null) setAutoConnect(JSON.parse(savedAutoConnect));
      const savedProtocolId = await AsyncStorage.getItem("vpn_protocol");
      if (savedProtocolId) {
        const p = PROTOCOLS.find((pr) => pr.id === savedProtocolId);
        if (p) setSelectedProtocol(p);
      }
      const savedCountryId = await AsyncStorage.getItem("vpn_country");
      if (savedCountryId) {
        const c = COUNTRIES.find((co) => co.id === savedCountryId);
        if (c) setSelectedCountry(c);
      }
    } catch {}
  };

  const generateVpnIp = (country: Country) => {
    const ranges: Record<string, string> = {
      US: "104.16",
      GB: "185.220",
      DE: "194.165",
      FR: "176.10",
      NL: "185.107",
      CH: "194.35",
      SE: "185.159",
      NO: "194.63",
      CA: "162.218",
      AU: "103.114",
      JP: "45.32",
      SG: "139.99",
    };
    const prefix = ranges[country.code] ?? "10.0";
    const a = Math.floor(Math.random() * 254) + 1;
    const b = Math.floor(Math.random() * 254) + 1;
    return `${prefix}.${a}.${b}`;
  };

  const connect = useCallback(() => {
    setStatus("connecting");
    setTimeout(() => {
      setStatus("connected");
      setVpnIp(generateVpnIp(selectedCountry));
      setStats(defaultStats);
      timerRef.current = setInterval(() => {
        setStats((prev) => ({ ...prev, connectedTime: prev.connectedTime + 1 }));
      }, 1000);
      statsRef.current = setInterval(() => {
        setStats((prev) => ({
          ...prev,
          downloadSpeed: Math.random() * 50 + 20,
          uploadSpeed: Math.random() * 15 + 5,
          totalDownloaded: prev.totalDownloaded + Math.random() * 0.5,
          totalUploaded: prev.totalUploaded + Math.random() * 0.1,
        }));
      }, 2000);
    }, 2200);
  }, [selectedCountry]);

  const disconnect = useCallback(() => {
    setStatus("disconnecting");
    if (timerRef.current) clearInterval(timerRef.current);
    if (statsRef.current) clearInterval(statsRef.current);
    setTimeout(() => {
      setStatus("disconnected");
      setVpnIp("");
      setStats(defaultStats);
    }, 1000);
  }, []);

  const selectCountry = useCallback(async (country: Country) => {
    setSelectedCountry(country);
    await AsyncStorage.setItem("vpn_country", country.id);
  }, []);

  const selectProtocol = useCallback(async (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    await AsyncStorage.setItem("vpn_protocol", protocol.id);
  }, []);

  const toggleAdBlock = useCallback(async () => {
    setAdBlockEnabled((prev) => {
      AsyncStorage.setItem("vpn_adblock", JSON.stringify(!prev));
      return !prev;
    });
  }, []);

  const toggleKillSwitch = useCallback(async () => {
    setKillSwitchEnabled((prev) => {
      AsyncStorage.setItem("vpn_killswitch", JSON.stringify(!prev));
      return !prev;
    });
  }, []);

  const toggleAutoConnect = useCallback(async () => {
    setAutoConnect((prev) => {
      AsyncStorage.setItem("vpn_autoconnect", JSON.stringify(!prev));
      return !prev;
    });
  }, []);

  const toggleFavorite = useCallback(async (countryId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(countryId)
        ? prev.filter((id) => id !== countryId)
        : [...prev, countryId];
      AsyncStorage.setItem("vpn_favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <VpnContext.Provider
      value={{
        status,
        selectedCountry,
        selectedProtocol,
        realIp,
        vpnIp,
        stats,
        adBlockEnabled,
        killSwitchEnabled,
        autoConnect,
        favorites,
        connect,
        disconnect,
        selectCountry,
        selectProtocol,
        toggleAdBlock,
        toggleKillSwitch,
        toggleAutoConnect,
        toggleFavorite,
      }}
    >
      {children}
    </VpnContext.Provider>
  );
}

export function useVpn() {
  const ctx = useContext(VpnContext);
  if (!ctx) throw new Error("useVpn must be used within VpnProvider");
  return ctx;
}
