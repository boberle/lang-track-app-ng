import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { UseNotificationSubscriptionReturnType } from "@/hooks/useNotificationSubscription";

const useNotificationSubscription =
  (): UseNotificationSubscriptionReturnType => {
    const notification = undefined;
    return {
      notification,
    };
  };

export default useNotificationSubscription;
