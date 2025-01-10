import React, {useState, Context, ReactNode, useEffect} from "react";
import { User } from "@firebase/auth";
import useAuth from "@/hooks/useAuth";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import { Redirect } from "expo-router";
import useUserHasSetOwnPassword from "@/hooks/useUserHasSetOwnPassword";

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

  useEffect(() => {
    if (!user) return;
    checkUserHasSetOwnPassword(user);
  }, [user, checkUserHasSetOwnPassword]);

  if (isUserLoading) {
    return <CommonLoadingComponent message={"Loading user information..."} />;
  }

  if (user == null) {
    return <Redirect href={"/login"} />;
  }

  if (userHasSetOwnPassword == null) {
    return <CommonLoadingComponent message={"Checking is user has set their password..."} />;
  }

  if (userHasSetOwnPassword === false) {
    return <Redirect href={"/change-password"} />;
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
