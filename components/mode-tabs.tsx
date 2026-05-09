import { SearchMode } from "@/types/news.types";
import { Pressable, Text, View } from "react-native";

const ACTIVE_SHADOW = {
  elevation: 2,
  shadowColor: "#1E3A5F",
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
} as const;

const TABS: { key: SearchMode; label: string }[] = [
  { key: "headlines", label: "Top Headlines" },
  { key: "search", label: "Search" },
];

interface Props {
  mode: SearchMode;
  onChange: (mode: SearchMode) => void;
}

export default function ModeTabs({ mode, onChange }: Props) {
  return (
    <View className="flex-row mx-4 mt-4 bg-slate-200 rounded-2xl p-1">
      {TABS.map(({ key, label }) => {
        const active = mode === key;
        return (
          <Pressable
            key={key}
            onPress={() => onChange(key)}
            className={`flex-1 py-2.5 rounded-xl items-center ${active ? "bg-white" : ""}`}
            style={active ? ACTIVE_SHADOW : undefined}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
