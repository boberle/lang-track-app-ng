import { useState, useCallback } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";

export type UseExpoPushNotificationsReturnType = {
  expoPushToken: Notifications.ExpoPushToken | NullExpoPushToken | null;
  isError: boolean;
  registerForExpoPushNotifications: () => void;
};

const useExpoPushNotifications = (): UseExpoPushNotificationsReturnType => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [isError, setIsError] = useState<boolean>(false);
  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken | null>(null);

  const registerForExpoPushNotifications = useCallback(async () => {
    setIsError(false);

    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification");
        setIsError(true);
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
    } else {
      console.log("Must be using a physical device for Push notifications");
      setIsError(true);
      return;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        //vibrationPattern: [0, 250, 250, 250],
        //lightColor: "#FF231F7C",
      });
    }

    setIsError(false);
    setExpoPushToken(token);
  }, []);

  return {
    expoPushToken,
    isError,
    registerForExpoPushNotifications,
  };
};

export default useExpoPushNotifications;
