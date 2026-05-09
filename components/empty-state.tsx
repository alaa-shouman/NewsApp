import { Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <Text className="text-5xl mb-5">📰</Text>
      <Text className="text-slate-900 font-bold text-xl text-center mb-2">
        No articles yet
      </Text>
      <Text className="text-slate-400 text-sm text-center leading-relaxed">
        Set how many articles you want and tap{" "}
        <Text className="text-brand-600 font-semibold">Fetch</Text> to load
        the latest news
      </Text>
    </View>
  );
}
