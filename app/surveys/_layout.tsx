import { Stack } from "expo-router";

export default function SurveyLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ headerShown: false }}/>
        </Stack>
    );
}
