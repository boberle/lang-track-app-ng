import { useEffect, useState } from "react";
import Welcome from "@/components/assignment/Welcome";
import SingleChoiceQuestion from "@/components/assignment/question/SingleChoiceQuestion";
import Submit from "@/components/assignment/Submit";
import MultipleChoiceQuestion from "@/components/assignment/question/MultipleChoiceQuestion";
import OpenEndedQuestion from "@/components/assignment/question/OpenEndedQuestion";
import {
  isMultipleChoiceQuestion,
  isOpenEndedQuestion,
  isSingleChoiceQuestion,
} from "@/types/guards";
import useFetchAssignment from "@/hooks/fetch_assigment";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import CommonErrorComponent from "@/components/common/CommonErrorComponent";
import useGetIdToken from "@/hooks/useGetIdToken";
import { usePreventRemove } from "@react-navigation/native";

export type AssignmentProps = {
  assignmentId: string;
  onClose: () => void;
};

const Assigment = ({ assignmentId, onClose }: AssignmentProps) => {
  const { assignment, isError, isLoading, fetchAssignment } =
    useFetchAssignment();
  const { getIdToken } = useGetIdToken();

  useEffect(() => {
    const f = async () => {
      const token = await getIdToken();
      fetchAssignment(assignmentId, token);
    };
    f();
  }, [fetchAssignment, assignmentId]);

  if (isLoading) {
    return <CommonLoadingComponent message="Loading assignment..." />;
  }

  if (isError || assignment == null) {
    return <CommonErrorComponent message="Unable to load the assignment." />;
  }

  if (assignment.expiredAt < new Date()) {
    return <CommonErrorComponent message="This assignment has expired." />;
  }

  return <Assigment_ assignment={assignment} onClose={onClose} />;
};

export type _AssignmentProps = {
  assignment: AssignmentType;
  onClose: () => void;
};

const Assigment_ = ({ assignment, onClose }: _AssignmentProps) => {
  const [answers, setAnswers] = useState<
    (SingleChoiceAnswer | MultipleChoiceAnswer | OpenEndedAnswer | null)[]
  >(() => Array(assignment.questions.length).fill(null));
  const [history, setHistory] = useState<(number | null)[]>([null]);
  const [shouldClose, setShouldClose] = useState<boolean>(false);

  usePreventRemove(!shouldClose, () => {});

  useEffect(() => {
    if (shouldClose) {
      onClose();
    }
  }, [shouldClose]);

  const handleNext = () => {
    setHistory((prevHistory) => {
      const getNextPosition = () => {
        const v = prevHistory[prevHistory.length - 1];
        if (v == null) return null;
        const answer = answers[v];
        if (answer == null) return v;

        const question = assignment.questions[v];

        const getNextPositionFromConditions = (index: number) => {
          if (question.conditions[index] == null) {
            return answers.length;
          } else {
            return question.conditions[index];
          }
        };

        if (answer.type === "singleChoice") {
          if (answer.selectedIndex in question.conditions) {
            return getNextPositionFromConditions(answer.selectedIndex);
          }
        } else if (answer.type === "multipleChoice") {
          for (const index of answer.selectedIndices) {
            if (index in question.conditions) {
              return getNextPositionFromConditions(index);
            }
          }
        }

        return v + 1;
      };
      const nextPosition = getNextPosition();
      return [...prevHistory, nextPosition];
    });
  };

  const handlePrevious = () => {
    setHistory((prevHistory) => prevHistory.slice(0, -1));
  };

  const handleChange = (
    answer: SingleChoiceAnswer | MultipleChoiceAnswer | OpenEndedAnswer | null,
  ) => {
    const position = history[history.length - 1];
    if (position == null) return;
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[position] = answer;
      return newAnswers;
    });
  };

  const isAnswerValid = (index?: number): boolean => {
    const position = history[history.length - 1];
    if (position == null) {
      return true;
    }
    if (index == null) {
      index = position;
    }
    return answers[index] != null;
  };

  const position = history[history.length - 1];

  if (position == null) {
    return (
      <Welcome
        message={assignment.welcomeMessage}
        onClose={() => setShouldClose(true)}
        onStart={() => setHistory([null, 0])}
      />
    );
  } else if (position >= assignment.questions.length) {
    return (
      <Submit
        message={assignment.submitMessage}
        assignmentId={assignment.id}
        answers={
          answers as (
            | SingleChoiceAnswer
            | MultipleChoiceAnswer
            | OpenEndedAnswer
            | null
          )[]
        }
        onSubmit={() => setShouldClose(true)}
        onPrevious={handlePrevious}
        enableNextButton={true}
      />
    );
  } else {
    const question = assignment.questions[position];
    if (isSingleChoiceQuestion(question)) {
      return (
        <SingleChoiceQuestion
          key={position}
          message={question.message}
          choices={question.choices!}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isAnswerValid()}
          initialValue={answers[position] as SingleChoiceAnswer | null}
          lastIsSpecify={question.lastIsSpecify}
        />
      );
    } else if (isMultipleChoiceQuestion(question)) {
      return (
        <MultipleChoiceQuestion
          key={position}
          message={question.message}
          choices={question.choices!}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isAnswerValid()}
          initialValues={answers[position] as MultipleChoiceAnswer | null}
          lastIsSpecify={question.lastIsSpecify}
        />
      );
    } else if (isOpenEndedQuestion(question)) {
      return (
        <OpenEndedQuestion
          key={position}
          message={question.message}
          initialValue={answers[position] as OpenEndedAnswer | null}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isAnswerValid()}
          maxLength={question.maxLength}
          optional={question.optional}
        />
      );
    } else {
      throw new Error("Unknown question type");
    }
  }
};

export default Assigment;
