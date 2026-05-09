import { SearchMode } from "@/types/news.types";
import { Pressable, Text, TextInput, View } from "react-native";

interface Props {
  mode: SearchMode;
  count: string;
  keyword: string;
  loading: boolean;
  onCountChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onFetch: () => void;
}

export default function SearchControls({
  mode,
  count,
  keyword,
  loading,
  onCountChange,
  onKeywordChange,
  onFetch,
}: Props) {
  return (
    <View className="mx-4 mt-3 mb-1">
      {mode === "search" && (
        <TextInput
          className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm mb-2"
          placeholder="Search by title, author or keyword…"
          placeholderTextColor="#94A3B8"
          value={keyword}
          onChangeText={onKeywordChange}
          returnKeyType="search"
          onSubmitEditing={onFetch}
          autoCorrect={false}
          autoCapitalize="none"
        />
      )}

      <View className="flex-row" style={{ gap: 8 }}>
        <TextInput
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm"
          placeholder="No. of articles (1 – 10)"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={count}
          onChangeText={onCountChange}
          returnKeyType="done"
          maxLength={2}
        />

        <Pressable
          onPress={onFetch}
          disabled={loading}
          className="bg-brand-600 rounded-xl px-6 justify-center items-center"
          style={{ opacity: loading ? 0.5 : 1, minWidth: 80 }}
        >
          <Text className="text-white font-bold text-sm tracking-wide">Fetch</Text>
        </Pressable>
      </View>
    </View>
  );
}
