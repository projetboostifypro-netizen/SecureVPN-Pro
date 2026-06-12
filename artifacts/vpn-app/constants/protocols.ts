export interface Protocol {
  id: string;
  name: string;
  description: string;
  speed: "Fast" | "Medium" | "Slow";
  security: "High" | "Medium" | "Maximum";
  recommended: boolean;
}

export const PROTOCOLS: Protocol[] = [
  {
    id: "wireguard",
    name: "WireGuard",
    description: "Modern protocol with best speed-security balance",
    speed: "Fast",
    security: "High",
    recommended: true,
  },
  {
    id: "openvpn-udp",
    name: "OpenVPN UDP",
    description: "Reliable open-source protocol, UDP for speed",
    speed: "Medium",
    security: "High",
    recommended: false,
  },
  {
    id: "openvpn-tcp",
    name: "OpenVPN TCP",
    description: "Reliable open-source protocol, TCP for stability",
    speed: "Slow",
    security: "High",
    recommended: false,
  },
  {
    id: "ikev2",
    name: "IKEv2/IPSec",
    description: "Native mobile protocol, fast reconnection",
    speed: "Fast",
    security: "High",
    recommended: false,
  },
  {
    id: "l2tp",
    name: "L2TP/IPSec",
    description: "Legacy protocol with wide compatibility",
    speed: "Medium",
    security: "Medium",
    recommended: false,
  },
  {
    id: "stealth",
    name: "Stealth Mode",
    description: "Obfuscated tunnel for censored networks",
    speed: "Slow",
    security: "Maximum",
    recommended: false,
  },
];
