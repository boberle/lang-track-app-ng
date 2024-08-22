import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildSubmitAssignmentURL } from "./_url_builders";

const useSubmitAssignment = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch();
  const [isTooLate, setIsTooLate] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const submitAssignment = useCallback(
    async (assignmentId: number, answers: AnswerType[]) => {
      const url = buildSubmitAssignmentURL(assignmentId);
      fetchData(url, "PUT", { answers: answers });
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
