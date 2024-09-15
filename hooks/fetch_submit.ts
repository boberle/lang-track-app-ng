import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildSubmitAssignmentURL } from "./_url_builders";

const useSubmitAssignment = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch();
  const [isTooLate, setIsTooLate] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const submitAssignment = useCallback(
    async (assignmentId: string, answers: AnswerType[], token: string) => {
      const url = buildSubmitAssignmentURL(assignmentId);
      fetchData(url, {
        method: "PUT",
        jsonData: { answers: answers },
        token: token,
      });
    },
    [fetchData],
  );

  useEffect(() => {
    setIsTooLate(statusCode === 410);
    setIsSubmitted(statusCode === 200);
  }, [statusCode]);

  return {
    submitAssignment,
    isLoading,
    isError,
    isTooLate,
    isSubmitted,
  };
};

export default useSubmitAssignment;
