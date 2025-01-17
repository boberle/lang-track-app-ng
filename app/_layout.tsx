import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Slot />
    </SafeAreaProvider>
  );
}
