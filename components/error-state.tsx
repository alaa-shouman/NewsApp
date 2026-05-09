import { Pressable, Text, View } from "react-native";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <Text className="text-5xl mb-5">⚠️</Text>
      <Text className="text-slate-900 font-bold text-xl text-center mb-2">
        Something went wrong
      </Text>
      <Text className="text-slate-400 text-sm text-center leading-relaxed mb-8">
        {message}
      </Text>
      <Pressable
        onPress={onRetry}
        className="bg-brand-600 px-10 py-3.5 rounded-2xl"
      >
        <Text className="text-white font-bold text-sm tracking-wide">Try Again</Text>
      </Pressable>
    </View>
  );
}
