import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }}/>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
            <Stack.Screen name="surveys" options={{ headerShown: false }}/>
        </Stack>
    );
}
