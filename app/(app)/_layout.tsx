import { Redirect, Stack } from "expo-router";
import useAuth from "@/hooks/useAuth";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import usePushNotifications from "@/hooks/usePushNotifications";
import { useEffect, useState } from "react";
import useRegisterDevice from "@/hooks/fetch_register";
import CommonErrorComponent from "@/components/common/CommonErrorComponent";
import useUserHasSetOwnPassword from "@/hooks/useUserHasSetOwnPassword";

export default function AppLayout() {
  const [key, setKey] = useState<number>(0);
  const { user, isLoading: isUserLoading } = useAuth();
  const {
    isLoading: isHasSetOwnPasswordLoading,
    userHasSetOwnPassword,
    checkUserHasSetOwnPassword,
  } = useUserHasSetOwnPassword();
  const {
    registerDevice,
    isLoading: isRegisterDeviceLoading,
    isError: isRegisterDeviceError,
    isSuccess: isRegisterDeviceSuccess,
  } = useRegisterDevice();

  const { expoPushToken, registerForPushNotifications } =
    usePushNotifications();

  useEffect(() => {
    const f = async () => {
      if (!user) return;
      if (!userHasSetOwnPassword) return;
      if (!expoPushToken?.data) return;

      const token = await user.getIdToken();
      await registerDevice(expoPushToken.data, token);
    };
    f();
  }, [user, expoPushToken, key, userHasSetOwnPassword]);

  useEffect(() => {
    if (user) {
      checkUserHasSetOwnPassword(user);
    }
  }, [user, checkUserHasSetOwnPassword, key]);

  useEffect(() => {
    if (user && userHasSetOwnPassword) {
      registerForPushNotifications();
    }
  }, [user, userHasSetOwnPassword, key]);

  if (isUserLoading || isHasSetOwnPasswordLoading || isRegisterDeviceLoading) {
    return <CommonLoadingComponent />;
  }

  if (user == null) {
    return <Redirect href={"/login"} />;
  }

  if (userHasSetOwnPassword === false) {
    return <Redirect href={"/change-password"} />;
  }

  if (isRegisterDeviceLoading) {
    return <CommonLoadingComponent />;
  }

  if (!expoPushToken) {
    return <CommonLoadingComponent />;
  }

  if (isRegisterDeviceError || !isRegisterDeviceSuccess) {
    return (
      <CommonErrorComponent
        message="Failed to register for push notifications."
        offerToLogout={true}
        onRetry={() => setKey((p) => p + 1)}
      />
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="assignments" options={{ headerShown: false }} />
    </Stack>
  );
}
