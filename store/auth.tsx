import React, {Context, ReactNode, useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import { Redirect } from "expo-router";
import useUserHasSetOwnPassword from "@/hooks/useUserHasSetOwnPassword";
import useRegisterDevice from "@/hooks/fetch_register";
import useExpoPushNotifications from "@/hooks/useExpoPushNotifications";
import CommonErrorComponent from "@/components/common/CommonErrorComponent";
import {User} from "@firebase/auth";

type contextType = {
  user: null | User;
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
  const [key, setKey] = useState<number>(0);


  useEffect(() => {
    if (user) {
      checkUserHasSetOwnPassword(user);
    }
  }, [user, checkUserHasSetOwnPassword, key]);

  useEffect(() => {
    if (user && userHasSetOwnPassword) {
      registerForExpoPushNotifications();
    }
  }, [user, userHasSetOwnPassword, key]);

  useEffect(() => {
    const f = async () => {
      if (user  && userHasSetOwnPassword && expoPushToken?.data) {
        const token = await user.getIdToken();
        registerDevice(expoPushToken.data, token);
      }
    };
    f();
  }, [user, userHasSetOwnPassword, expoPushToken, key]);

  const handleRetry = () => {
    setKey(p => p + 1);
  }

  if (isRegisterForExpoPushNotificationError) {
    return <Error message="Failed to get push notification token." retry={handleRetry} />;
  }

  if (isRegisterDeviceError) {
    return <Error message="Failed to register device for push notifications." retry={handleRetry} />;
  }

  if (isUserLoading) {
    return <CommonLoadingComponent message="Loading user information..." />;
  }

  if (user == null) {
    return <Redirect href="/login" />;
  }

  if (userHasSetOwnPassword == null) {
    return <CommonLoadingComponent message="Checking whether user has set their password..." />;
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
    return <Error message="Failed to register device for push notifications." retry={handleRetry} />;
  }

  const defaultContext = {
    user: user,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};


const Error = ({message, retry}: {message:string, retry: () => void}) => {
  return (
    <CommonErrorComponent
      message={message}
      offerToLogout={true}
      onRetry={retry}
    />
  )
}


export default AuthContext;
