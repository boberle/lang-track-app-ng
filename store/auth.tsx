import React, {Context, ReactNode, useEffect} from "react";
import useAuth from "@/hooks/useAuth";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import { Redirect } from "expo-router";
import useUserHasSetOwnPassword from "@/hooks/useUserHasSetOwnPassword";
import useRegisterDevice from "@/hooks/fetch_register";
import useExpoPushNotifications from "@/hooks/useExpoPushNotifications";
import CommonErrorComponent from "@/components/common/CommonErrorComponent";

type contextType = {
  user: null | string;
};

const AuthContext: Context<contextType> = React.createContext<contextType>({
  user: null,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: isUserLoading } = useAuth();
  const {
    userHasSetOwnPassword,
    checkUserHasSetOwnPassword,
  } = useUserHasSetOwnPassword();
  const { expoPushToken, isError: isRegisterForExpoPushNotificationError, registerForExpoPushNotifications } =
    useExpoPushNotifications();
  const {
    deviceIsRegistered,
    isError: isRegisterDeviceError,
    registerDevice,
  } = useRegisterDevice();

  useEffect(() => {
    if (user) {
      checkUserHasSetOwnPassword(user);
    }
  }, [user, checkUserHasSetOwnPassword]);

  useEffect(() => {
    if (user && userHasSetOwnPassword) {
      registerForExpoPushNotifications();
    }
  }, [user, userHasSetOwnPassword]);

  useEffect(() => {
    const f = async () => {
      if (user  && userHasSetOwnPassword && expoPushToken?.data) {
        const token = await user.getIdToken();
        registerDevice(expoPushToken.data, token);
      }
    };
    f();
  }, [user, userHasSetOwnPassword, expoPushToken]);

  if (isRegisterForExpoPushNotificationError) {
    return <CommonErrorComponent message="Failed to get push notification token." />;
  }

  if (isRegisterDeviceError) {
    return <CommonErrorComponent message="Failed to register device for push notifications." />;
  }

  if (isUserLoading) {
    return <CommonLoadingComponent message="Loading user information..." />;
  }

  if (user == null) {
    return <Redirect href="/login" />;
  }

  if (userHasSetOwnPassword === false) {
    return <Redirect href="/change-password" />;
  }

  if (expoPushToken == null) {
    return <CommonLoadingComponent message="Getting push notification token..." />;
  }

  if (deviceIsRegistered == null) {
    return <CommonLoadingComponent message="Registering device for push notifications..." />;
  }

  if (deviceIsRegistered === false) {
    return <CommonErrorComponent message="Failed to register device for push notifications." />;
  }

  const defaultContext = {
    user: user.email,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
