import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { VpnStatus } from "@/context/VpnContext";

interface Props {
  status: VpnStatus;
  onPress: () => void;
}

export function ConnectButton({ status, onPress }: Props) {
  const colors = useColors();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const isConnected = status === "connected";
  const isConnecting = status === "connecting" || status === "disconnecting";

  useEffect(() => {
    if (isConnecting) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0);
    }
  }, [isConnecting]);

  useEffect(() => {
    if (isConnected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 1600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isConnected]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const btnColor = isConnected
    ? colors.success
    : isConnecting
    ? colors.warning
    : colors.primary;

  const label = isConnected
    ? "DISCONNECT"
    : isConnecting
    ? status === "connecting"
      ? "CONNECTING..."
      : "DISCONNECTING..."
    : "CONNECT";

  return (
    <View style={styles.wrapper}>
      {isConnected && (
        <Animated.View
          style={[
            styles.glow,
            {
              backgroundColor: colors.success,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
      )}
      <Pressable
        onPress={onPress}
        disabled={isConnecting}
        style={({ pressed }) => [
          styles.button,
          {
            borderColor: btnColor,
            opacity: isConnecting ? 0.9 : pressed ? 0.85 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.inner,
            {
              backgroundColor: isConnected ? colors.success : isConnecting ? colors.warning : colors.primary,
              transform: isConnecting ? [{ rotate: spin }] : [],
            },
          ]}
        >
          {isConnecting ? (
            <View style={styles.spinner}>
              <View style={[styles.spinnerArc, { borderTopColor: "#fff" }]} />
            </View>
          ) : (
            <Text style={styles.icon}>{isConnected ? "⏹" : "▶"}</Text>
          )}
        </Animated.View>
        <Text style={[styles.label, { color: btnColor }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 2,
    borderRadius: 80,
    width: 140,
    height: 140,
    padding: 8,
  },
  inner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 28,
    color: "#fff",
  },
  spinner: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  spinnerArc: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "transparent",
  },
  label: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
});
