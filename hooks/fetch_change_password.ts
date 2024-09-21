import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import {
  buildChangePasswordURL,
  buildSubmitAssignmentURL,
} from "./_url_builders";

const useChangePassword = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const changePassword = useCallback(
    async (password: string, token: string) => {
      const url = buildChangePasswordURL();
      fetchData(url, {
        method: "POST",
        jsonData: { new_password: password },
        token: token,
      });
    },
    [fetchData],
  );

  useEffect(() => {
    setIsSuccess(statusCode === 200);
  }, [statusCode]);

  return {
    changePassword,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useChangePassword;
