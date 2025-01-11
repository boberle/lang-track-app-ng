import AuthContext from "@/store/auth";
import { useCallback, useContext } from "react";
import { useRouter } from "expo-router";

const useGetIdToken = () => {
  const ctx = useContext(AuthContext);
  const router = useRouter();

  const getIdToken = useCallback(async () => {
    if (ctx.user === null) {
      console.log("User not authenticated, redirecting to login");
      router.replace("/login");
      throw new Error("User not authenticated");
    }
    return await ctx.user.getIdToken();
  }, []);

  return {
    getIdToken,
  };
};

export default useGetIdToken;
