import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";
import { UsePushNotificationsReturnType } from "@/hooks/usePushNotifications";

const usePushNotifications = (): UsePushNotificationsReturnType => {
  const expoPushToken = undefined;
  return {
    expoPushToken,
    registerForPushNotifications: () => {},
  };
};

export default usePushNotifications;
