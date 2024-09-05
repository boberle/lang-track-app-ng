import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

export type UseNotificationSubscriptionReturnType = {
  notification?: Notifications.Notification;
};

const useNotificationSubscription =
  (): UseNotificationSubscriptionReturnType => {
    const [notification, setNotification] = useState<
      Notifications.Notification | undefined
    >();

    const notificationListener = useRef<Notifications.Subscription>();

    useEffect(() => {
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current!,
        );
      };
    }, []);

    return {
      notification,
    };
  };

export default useNotificationSubscription;
