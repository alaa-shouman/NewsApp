import { Article } from "@/types/news.types";
import { Image } from "expo-image";
import { Linking, Pressable, Text, View } from "react-native";

const BLURHASH = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";

const CARD_SHADOW = {
  elevation: 3,
  shadowColor: "#1E3A5F",
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
} as const;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <Pressable
      onPress={() => Linking.openURL(article.url)}
      className="bg-white rounded-2xl mb-4 overflow-hidden border border-slate-100"
      style={CARD_SHADOW}
    >
      <Image
        source={article.image ? { uri: article.image } : undefined}
        placeholder={{ blurhash: BLURHASH }}
        contentFit="cover"
        transition={350}
        style={{ width: "100%", height: 192 }}
      />

      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className="bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-lg">
            <Text className="text-brand-600 text-xs font-bold" numberOfLines={1}>
              {article.source.name}
            </Text>
          </View>
          <Text className="text-slate-400 text-xs">{formatDate(article.publishedAt)}</Text>
        </View>

        <Text
          className="text-slate-900 font-bold text-[15px] leading-snug mb-2"
          numberOfLines={3}
        >
          {article.title}
        </Text>

        {article.description ? (
          <Text className="text-slate-500 text-sm leading-relaxed" numberOfLines={2}>
            {article.description}
          </Text>
        ) : null}

        <View className="flex-row items-center mt-3 pt-3 border-t border-slate-100">
          <Text className="text-brand-600 text-xs font-semibold">Read full article →</Text>
        </View>
      </View>
    </Pressable>
  );
}
