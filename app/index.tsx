import ArticleCard from "@/components/article-card";
import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import ModeTabs from "@/components/mode-tabs";
import SearchControls from "@/components/search-controls";
import SkeletonCard from "@/components/skeleton-card";
import { fetchTopHeadlines, searchArticles } from "@/services/news.services";
import { Article, SearchMode } from "@/types/news.types";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
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
      setError("Failed to load articles. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const skeletonCount = Math.min(Math.max(parseInt(count, 10) || 5, 1), 10);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="px-4 pt-3 pb-1">
        <Text className="text-[28px] font-bold text-slate-900 tracking-tight">
          NewsApp
        </Text>
        <Text className="text-slate-400 text-sm mt-0.5">
          Latest news from around the world
        </Text>
      </View>

      <ModeTabs mode={mode} onChange={setMode} />

      <SearchControls
        mode={mode}
        count={count}
        keyword={keyword}
        loading={loading}
        onCountChange={setCount}
        onKeywordChange={setKeyword}
        onFetch={handleFetch}
      />

      {/* Results count */}
      {totalResults !== null && !loading && articles.length > 0 && (
        <View className="mx-4 mt-2 mb-0.5">
          <Text className="text-slate-400 text-xs">
            Showing {articles.length} of {totalResults.toLocaleString()} results
          </Text>
        </View>
      )}

      {/* Content area */}
      {error ? (
        <ErrorState message={error} onRetry={handleFetch} />
      ) : loading ? (
        <FlatList
          data={Array.from({ length: skeletonCount })}
          keyExtractor={(_, i) => `skeleton-${i}`}
          renderItem={() => <SkeletonCard />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        />
      ) : articles.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, i) => `${item.url}-${i}`}
          renderItem={({ item }) => <ArticleCard article={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
