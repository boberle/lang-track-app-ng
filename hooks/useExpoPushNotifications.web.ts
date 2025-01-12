import { useMemo } from "react";
import { UseExpoPushNotificationsReturnType } from "@/hooks/useExpoPushNotifications";

const usePushNotifications = (): UseExpoPushNotificationsReturnType => {
  const expoPushToken: NullExpoPushToken = useMemo(
    () => ({ type: "null", data: "__null__" }),
    [],
  );
  return {
    expoPushToken,
    isError: false,
    registerForExpoPushNotifications: () => {},
  };
};

export default usePushNotifications;
