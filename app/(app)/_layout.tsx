import { Redirect, router, Stack } from "expo-router";
import useAuth from "@/hooks/useAuth";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import usePushNotifications from "@/hooks/usePushNotifications";
import { useEffect } from "react";

export default function AppLayout() {
  const { user, isLoading: isUserLoading } = useAuth();

  const { expoPushToken, registerForPushNotifications } =
    usePushNotifications();

  useEffect(() => {
    if (!user) return;
    console.log(
      "SEND HERE PUSH NOTIFICATION TO SERVER (token, user.uid): ",
      expoPushToken,
      user.uid,
    );
  }, [user, expoPushToken]);

  useEffect(() => {
    if (user) registerForPushNotifications();
  }, [user]);

  if (isUserLoading) {
    return <CommonLoadingComponent />;
  }

  if (user == null) {
    return <Redirect href={"/login"} />;
  }

  if (!expoPushToken) {
    return <CommonLoadingComponent />;
  }

  return (
    <Stack>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="assignments" options={{ headerShown: false }} />
    </Stack>
  );
}
