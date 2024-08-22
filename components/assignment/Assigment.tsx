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

export type AssignmentProps = {
  assignmentId: number;
  onClose: () => void;
};

const Assigment = ({ assignmentId, onClose }: AssignmentProps) => {
  const { assignment, isError, isLoading, fetchAssignment } =
    useFetchAssignment();

  useEffect(() => {
    fetchAssignment(assignmentId);
  }, [fetchAssignment, assignmentId]);

  if (isLoading) {
    return <CommonLoadingComponent />;
  }

  if (isError || assignment == null) {
    return <CommonErrorComponent />;
  }

  return <_Assigment assignment={assignment} onClose={onClose} />;
};

export type _AssignmentProps = {
  assignment: AssignmentType;
  onClose: () => void;
};

const _Assigment = ({ assignment, onClose }: _AssignmentProps) => {
  const [position, setPosition] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(AnswerType | null)[]>(() =>
    Array(assignment.questions.length).fill(null),
  );

  const handleNext = () => {
    setPosition((v) => (v == null ? null : v + 1));
  };

  const handlePrevious = () => {
    setPosition((v) => (v == null || v === 0 ? null : v - 1));
  };

  const handleChange = (answer: AnswerType | null) => {
    if (position == null) return;
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[position] = answer;
      return newAnswers;
    });
  };

  const isValidAnswer = (index?: number): boolean => {
    if (position == null) {
      return true;
    }
    if (index == null) {
      index = position;
    }
    return answers[index] != null;
  };

  const areValidAnswers = () => {
    return answers.every((answer) => answer != null);
  };

  if (position == null) {
    return (
      <Welcome
        message={assignment.welcomeMessage}
        onClose={onClose}
        onStart={() => setPosition(0)}
      />
    );
  } else if (position >= assignment.questions.length) {
    if (!areValidAnswers()) {
      return (
        <CommonErrorComponent message="An error occurred. Answers are not valid." />
      );
    }
    return (
      <Submit
        message={assignment.submitMessage}
        assignmentId={assignment.id}
        answers={answers as AnswerType[]}
        onSubmit={onClose}
        onPrevious={handlePrevious}
        enableNextButton={areValidAnswers()}
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
          enableNextButton={isValidAnswer()}
          initialValue={answers[position] as number | null}
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
          enableNextButton={isValidAnswer()}
          initialValues={answers[position] as number[] | null}
        />
      );
    } else if (isOpenEndedQuestion(question)) {
      return (
        <OpenEndedQuestion
          key={position}
          message={question.message}
          initialValue={answers[position] as string | null}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isValidAnswer()}
        />
      );
    } else {
      throw new Error("Unknown question type");
    }
  }
};

export default Assigment;
