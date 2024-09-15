import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import {
  buildGetAssignmentURL,
  buildTestNotificationURL,
} from "./_url_builders";

const useTestNotification = () => {
  const { data, isLoading, isError, fetchData } = useFetch(false);

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
