import { ReactElement, useState } from "react";
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

export type AssignmentProps = {
  assignment: AssignmentType;
  onSubmit: (answers: AnswerType[]) => void;
  onClose: () => void;
};

const Assigment = ({ assignment, onSubmit, onClose }: AssignmentProps) => {
  const [position, setPosition] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(AnswerType | null)[]>(() =>
    Array(assignment.questions.length).fill(null),
  );

  let element: ReactElement;

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

  const handleSubmit = () => {
    if (!areValidAnswers()) {
      return;
    }
    onSubmit(answers as AnswerType[]);
  };

  if (position == null) {
    element = (
      <Welcome
        message={assignment.welcomeMessage}
        onClose={onClose}
        onStart={() => setPosition(0)}
      />
    );
  } else if (position >= assignment.questions.length) {
    element = (
      <Submit
        message={assignment.submitMessage}
        onNext={handleSubmit}
        onPrevious={handlePrevious}
        enableNextButton={areValidAnswers()}
      />
    );
  } else {
    const question = assignment.questions[position];
    if (isSingleChoiceQuestion(question)) {
      element = (
        <SingleChoiceQuestion
          key={position}
          message={question.message}
          choices={question.values!}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isValidAnswer()}
          initialValue={answers[position] as number | null}
        />
      );
    } else if (isMultipleChoiceQuestion(question)) {
      element = (
        <MultipleChoiceQuestion
          key={position}
          message={question.message}
          choices={question.values!}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isValidAnswer()}
          initialValues={answers[position] as number[] | null}
        />
      );
    } else if (isOpenEndedQuestion(question)) {
      element = (
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

  return element;
};

export default Assigment;
