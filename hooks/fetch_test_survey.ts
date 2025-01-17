import { useCallback } from "react";
import useFetch from "./_fetch";
import { buildTestSurveyURL } from "./_url_builders";
const useTestSurvey = () => {
  const { isLoading, isError, fetchData } = useFetch();
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
