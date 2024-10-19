import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildGetAssignmentURL, buildTestSurveyURL } from "./_url_builders";

const useTestSurvey = () => {
  const { data, isLoading, isError, fetchData } = useFetch(false);

  const sendTestSurvey = useCallback(
    async (token: string) => {
      const url = buildTestSurveyURL();
      fetchData(url, { token });
    },
    [fetchData],
  );

  return {
    sendTestSurvey,
    isLoading,
    isError,
  };
};

export default useTestSurvey;
