import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildGetAssignmentURL } from "./_url_builders";

type SingleChoiceQuestionResponse = {
  type: "single-choice";
  message: string;
  choices: string[];
};

const isSingleChoiceQuestionResponse = (
  o: any,
): o is SingleChoiceQuestionResponse => {
  if (typeof o !== "object") return false;
  if (
    !(
      "type" in o &&
      "message" in o &&
      "choices" in o &&
      o.type === "single-choice"
    )
  )
    return false;

  if (!Array.isArray(o.choices)) return false;

  if (o.choices.length === 0) return false;

  return true;
};

const convertSingleChoiceQuestionResponseToQuestion = (
  o: SingleChoiceQuestionResponse,
): SingleChoiceQuestion => {
  return {
    type: "singleChoice",
    message: o.message,
    choices: o.choices,
  };
};

type MultipleChoiceQuestionResponse = {
  type: "multiple-choice";
  message: string;
  choices: string[];
};

const isMultipleChoiceQuestionResponse = (
  o: any,
): o is MultipleChoiceQuestionResponse => {
  if (typeof o !== "object") return false;
  if (
    !(
      "type" in o &&
      "message" in o &&
      "choices" in o &&
      o.type === "multiple-choice"
    )
  )
    return false;

  if (!Array.isArray(o.choices)) return false;

  if (o.choices.length === 0) return false;

  return true;
};

const convertMultipleChoiceQuestionResponseToQuestion = (
  o: MultipleChoiceQuestionResponse,
): MultipleChoiceQuestion => {
  return {
    type: "multipleChoice",
    message: o.message,
    choices: o.choices,
  };
};

type OpenEndedQuestionResponse = {
  type: "open-ended";
  message: string;
  max_length: number;
};

const isOpenEndedQuestionResponse = (
  o: any,
): o is OpenEndedQuestionResponse => {
  if (typeof o !== "object") return false;
  if (!("type" in o && "message" in o && o.type === "open-ended")) return false;

  return true;
};

const convertOpenEndedQuestionResponseToQuestion = (
  o: OpenEndedQuestionResponse,
): OpenEndedQuestion => {
  return {
    type: "openEnded",
    message: o.message,
  };
};

type AssignmentResponse = {
  id: number;
  welcome_message: string;
  submit_message: string;
  questions: (
    | SingleChoiceQuestionResponse
    | MultipleChoiceQuestionResponse
    | OpenEndedQuestionResponse
  )[];
};

const isAssignmentResponse = (o: any): o is AssignmentResponse => {
  if (typeof o !== "object") return false;
  if (
    !(
      "id" in o &&
      "welcome_message" in o &&
      "submit_message" in o &&
      "questions" in o
    )
  )
    return false;

  if (
    typeof o.id !== "number" ||
    typeof o.welcome_message !== "string" ||
    typeof o.submit_message !== "string"
  )
    return false;

  if (!Array.isArray(o.questions)) return false;

  return o.questions.every(
    (item: any) =>
      isSingleChoiceQuestionResponse(item) ||
      isMultipleChoiceQuestionResponse(item) ||
      isOpenEndedQuestionResponse(item),
  );
};

const convertQuestionResponseToQuestion = (
  o: any,
): SingleChoiceQuestion | MultipleChoiceQuestion | OpenEndedQuestion => {
  if (isSingleChoiceQuestionResponse(o)) {
    return convertSingleChoiceQuestionResponseToQuestion(o);
  } else if (isMultipleChoiceQuestionResponse(o)) {
    return convertMultipleChoiceQuestionResponseToQuestion(o);
  } else if (isOpenEndedQuestionResponse(o)) {
    return convertOpenEndedQuestionResponseToQuestion(o);
  } else {
    throw new Error("Invalid question type");
  }
};

const convertDAOToAssignment = (dao: any): AssignmentType => {
  if (!isAssignmentResponse(dao)) {
    throw new Error("Invalid assignment data");
  }
  try {
    const questions: (
      | SingleChoiceQuestion
      | MultipleChoiceQuestion
      | OpenEndedQuestion
    )[] = dao.questions.map((question) =>
      convertQuestionResponseToQuestion(question),
    );

    return {
      id: dao.id,
      welcomeMessage: dao.welcome_message,
      submitMessage: dao.submit_message,
      questions,
    };
  } catch {
    throw new Error("Failed to convert DAO to assignment");
  }
};

const useFetchAssignment = () => {
  const { data, isLoading, isError: isFetchError, fetchData } = useFetch(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [assignment, setAssignment] = useState<AssignmentType | null>(null);

  const fetchAssignment = useCallback(
    async (assignmentId: number) => {
      setIsError(false);
      const url = buildGetAssignmentURL(assignmentId);
      fetchData(url);
    },
    [fetchData],
  );

  useEffect(() => {
    if (data === null) {
      setAssignment(null);
      return;
    }
    try {
      const convertedData = convertDAOToAssignment(data);
      setAssignment(convertedData);
    } catch {
      setIsError(true);
    }
  }, [data]);

  useEffect(() => {
    setIsError((prev) => prev || isFetchError);
  }, [isFetchError]);

  return {
    assignment,
    fetchAssignment,
    isLoading,
    isError,
  };
};

export default useFetchAssignment;
