import React, { useState, Context, ReactNode } from "react";
import { User } from "@firebase/auth";
import useAuth from "@/hooks/useAuth";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import { Redirect } from "expo-router";

type contextType = {
  user: null | string;
};

const AuthContext: Context<contextType> = React.createContext<contextType>({
  user: null,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: isUserLoading } = useAuth();

  if (isUserLoading) {
    return <CommonLoadingComponent message={"Loading user information..."} />;
  }

  if (user == null) {
    return <Redirect href={"/login"} />;
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
