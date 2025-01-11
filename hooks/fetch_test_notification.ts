import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildTestNotificationURL } from "./_url_builders";

const useTestNotification = () => {
  const { isLoading, isError, fetchData } = useFetch();

  const sendTestNotification = useCallback(
    async (token: string) => {
      const url = buildTestNotificationURL();
      fetchData(url, { token });
    },
    [fetchData],
  );

  return {
    sendTestNotification,
    isLoading,
    isError,
  };
};

export default useTestNotification;
