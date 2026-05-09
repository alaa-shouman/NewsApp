import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const CARD_SHADOW = {
  elevation: 2,
  shadowColor: "#1E3A5F",
  shadowOpacity: 0.05,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
} as const;

function SkeletonBlock({ className }: { className?: string }) {
  return <View className={`bg-slate-200 rounded-lg ${className ?? ""}`} />;
}

export default function SkeletonCard() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.35, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ opacity }, CARD_SHADOW]}
      className="bg-white rounded-2xl mb-4 overflow-hidden border border-slate-100"
    >
      <View className="bg-slate-200 w-full" style={{ height: 192 }} />

      <View className="p-4">
        <View className="flex-row items-center justify-between mb-3">
          <SkeletonBlock className="w-24 h-5" />
          <SkeletonBlock className="w-16 h-4" />
        </View>

        <SkeletonBlock className="w-full h-4 mb-2" />
        <SkeletonBlock className="w-5/6 h-4 mb-2" />
        <SkeletonBlock className="w-3/4 h-4 mb-4" />

        <SkeletonBlock className="w-full h-3 mb-2" />
        <SkeletonBlock className="w-4/5 h-3 mb-4" />

        <View className="pt-3 border-t border-slate-100">
          <SkeletonBlock className="w-28 h-3" />
        </View>
      </View>
    </Animated.View>
  );
}
