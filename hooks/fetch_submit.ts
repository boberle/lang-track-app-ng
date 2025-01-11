import { useCallback, useEffect, useState } from "react";
import { buildSubmitAssignmentURL } from "./_url_builders";
import useFetch from "./_fetch";

const convertAnswerToDTO = (
  answer: SingleChoiceAnswer | MultipleChoiceAnswer | OpenEndedAnswer | null,
): any => {
  if (answer == null) return null;
  switch (answer.type) {
    case "singleChoice":
      return {
        selected_index: answer.selectedIndex,
        specify_answer: answer.specify,
      };
    case "multipleChoice":
      return {
        selected_indices: answer.selectedIndices,
        specify_answer: answer.specify,
      };
    case "openEnded":
      return {
        value: answer.value,
      };
  }
};

const useSubmitAssignment = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch();
  const [isTooLate, setIsTooLate] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const submitAssignment = useCallback(
    async (
      assignmentId: string,
      answers: (
        | SingleChoiceAnswer
        | MultipleChoiceAnswer
        | OpenEndedAnswer
        | null
      )[],
      token: string,
    ) => {
      const url = buildSubmitAssignmentURL(assignmentId);
      fetchData(url, {
        method: "PUT",
        jsonData: {
          answers: answers.map((answer) => convertAnswerToDTO(answer)),
        },
        token,
      });
    },
    [fetchData],
  );

  useEffect(() => {
    if (statusCode == null) return;
    setIsTooLate(statusCode === 410);
    setIsSubmitted(200 <= statusCode && statusCode < 300);
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
