import { User } from "@firebase/auth";
import { useCallback, useState } from "react";

const useUserHasSetOwnPassword = () => {
  const [userHasSetOwnPassword, setUserHasSetOwnPassword] = useState<
    boolean | null
  >(null);

  const checkUserHasSetOwnPassword = useCallback(async (user: User) => {
    const idTokenResult = await user.getIdTokenResult();
    setUserHasSetOwnPassword(idTokenResult.claims.hasSetOwnPassword === true);
  }, []);

  return {
    userHasSetOwnPassword,
    checkUserHasSetOwnPassword,
  };
};

export default useUserHasSetOwnPassword;
