import { Stack } from "expo-router";
import { AuthContextProvider } from "@/store/auth";

export default function AppLayout() {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="assignments" options={{ headerShown: false }} />
      </Stack>
    </AuthContextProvider>
  );
}
