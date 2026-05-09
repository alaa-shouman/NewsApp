import { fetchTopHeadlines, searchArticles } from "@/services/news.services";
import { Article, SearchMode } from "@/types/news.types";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [count, setCount] = useState("10");
  const [keyword, setKeyword] = useState("");
  const [mode, setMode] = useState<SearchMode>("headlines");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(null);

  const handleFetch = async () => {
    const n = Math.min(Math.max(parseInt(count, 10) || 10, 1), 10);
    setLoading(true);
    setError(null);
    try {
      const res =
        mode === "headlines"
          ? await fetchTopHeadlines(n)
          : await searchArticles(keyword.trim() || "news", n);
      setArticles(res.articles);
      setTotalResults(res.totalArticles);
    } catch {
      setError("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Article }) => (
    <Pressable
      onPress={() => Linking.openURL(item.url)}
      className="bg-white rounded-2xl mb-4 overflow-hidden border border-gray-100"
      style={{ elevation: 2, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
    >
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 192 }}
          contentFit="cover"
        />
      ) : (
        <View className="w-full bg-gray-100 items-center justify-center" style={{ height: 120 }}>
          <Text className="text-gray-400 text-sm">No image available</Text>
        </View>
      )}

      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className="bg-blue-50 px-2 py-1 rounded-md">
            <Text className="text-blue-600 text-xs font-semibold" numberOfLines={1}>
              {item.source.name}
            </Text>
          </View>
          <Text className="text-gray-400 text-xs">
            {new Date(item.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>

        <Text
          className="text-gray-900 font-bold text-base leading-snug mb-2"
          numberOfLines={3}
        >
          {item.title}
        </Text>

        {item.description ? (
          <Text
            className="text-gray-500 text-sm leading-relaxed"
            numberOfLines={3}
          >
            {item.description}
          </Text>
        ) : null}

        <Text className="text-blue-500 text-xs mt-3 font-semibold">
          Read full article →
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 pt-2 pb-1">
        <Text className="text-3xl font-bold text-gray-900">NewsApp</Text>
        <Text className="text-gray-400 text-sm mt-1">
          Latest news from around the world
        </Text>
      </View>

      {/* Mode Tabs */}
      <View className="flex-row mx-4 mt-3 bg-gray-200 rounded-xl p-1">
        <Pressable
          onPress={() => setMode("headlines")}
          className={`flex-1 py-2 rounded-lg items-center ${
            mode === "headlines" ? "bg-white" : ""
          }`}
          style={mode === "headlines" ? { elevation: 1, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } } : undefined}
        >
          <Text
            className={`text-sm font-semibold ${
              mode === "headlines" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Top Headlines
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setMode("search")}
          className={`flex-1 py-2 rounded-lg items-center ${
            mode === "search" ? "bg-white" : ""
          }`}
          style={mode === "search" ? { elevation: 1, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } } : undefined}
        >
          <Text
            className={`text-sm font-semibold ${
              mode === "search" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Search
          </Text>
        </Pressable>
      </View>

      {/* Controls */}
      <View className="mx-4 mt-3 mb-1">
        {mode === "search" && (
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mb-2"
            placeholder="Search by title, author or keyword..."
            placeholderTextColor="#9ca3af"
            value={keyword}
            onChangeText={setKeyword}
            returnKeyType="search"
            onSubmitEditing={handleFetch}
          />
        )}
        <View className="flex-row" style={{ gap: 8 }}>
          <TextInput
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
            placeholder="Number of articles (1–10)"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={count}
            onChangeText={setCount}
            returnKeyType="done"
          />
          <Pressable
            onPress={handleFetch}
            disabled={loading}
            className="bg-blue-600 rounded-xl px-6 justify-center items-center"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            <Text className="text-white font-bold text-sm">
              {loading ? "..." : "Fetch"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Results count */}
      {totalResults !== null && !loading && articles.length > 0 && (
        <View className="mx-4 mb-1">
          <Text className="text-gray-400 text-xs">
            Showing {articles.length} of {totalResults.toLocaleString()} articles
          </Text>
        </View>
      )}

      {/* Content */}
      {error ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-red-500 text-center text-sm mb-4">{error}</Text>
          <Pressable onPress={handleFetch} className="bg-blue-600 px-6 py-3 rounded-xl">
            <Text className="text-white font-semibold text-sm">Try Again</Text>
          </Pressable>
        </View>
      ) : loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text className="text-gray-400 text-sm mt-3">Loading articles...</Text>
        </View>
      ) : articles.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-5xl mb-4">📰</Text>
          <Text className="text-gray-700 font-semibold text-lg text-center mb-1">
            No articles yet
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Set the number of articles and tap Fetch to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
