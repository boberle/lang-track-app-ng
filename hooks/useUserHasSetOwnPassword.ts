import { User } from "@firebase/auth";
import { useCallback, useState } from "react";

const useUserHasSetOwnPassword = () => {
  const [userHasSetOwnPassword, setUserHasSetOwnPassword] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserHasSetOwnPassword = useCallback(async (user: User) => {
    setIsLoading(true);
    const idTokenResult = await user.getIdTokenResult();
    setUserHasSetOwnPassword(idTokenResult.claims.hasSetOwnPassword === true);
    setIsLoading(false);
  }, []);

  return {
    userHasSetOwnPassword,
    isLoading,
    checkUserHasSetOwnPassword,
  };
};

export default useUserHasSetOwnPassword;
