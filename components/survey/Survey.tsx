import {ReactElement, useState} from "react";
import Welcome from "@/components/survey/Welcome";
import SingleChoiceQuestion from "@/components/survey/question/SingleChoiceQuestion";
import Submit from "@/components/survey/Submit";
import MultipleChoiceQuestion from "@/components/survey/question/MultipleChoiceQuestion";
import OpenEndedQuestion from "@/components/survey/question/OpenEndedQuestion";

export type QuestionType = 'singleChoice' | 'multipleChoice' | 'openEnded';
export type AnswerType = string | number | number[];


export type Question = {
    message: string;
    type: QuestionType;
    values?: string[];
}

export type Assignment = {
    id: number;
    welcomeMessage: string;
    submitMessage: string;
    questions: Question[];
}

export type SurveyProps = {
    assignment: Assignment;
    onSubmit: (answers: AnswerType[]) => void;
    onClose: () => void;
}

const Survey = ({assignment, onSubmit, onClose}: SurveyProps) => {
    const [position, setPosition] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(AnswerType | null)[]>(() => Array(assignment.questions.length).fill(null));

    let element: ReactElement;

    const handleNext = () => {
        setPosition(v => v == null ? null : v + 1)
    }

    const handlePrevious = () => {
        setPosition(v => v == null || v === 0? null : v - 1)
    }

    const handleChange = (answer: AnswerType | null) => {
        if (position == null) return;
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[position] = answer;
            return newAnswers;
        })
    }

    const isValidAnswer = (index?: number): boolean => {
        if (position == null) {
            return true;
        }
        if (index == null) {
            index = position;
        }
        return answers[index]!= null;
    }

    const areValidAnswers = () => {
        return answers.every(answer => answer!= null);
    }

    const handleSubmit = () => {
        if (!areValidAnswers()) {
            return;
        }
        onSubmit(answers as AnswerType[]);
    }

    if (position == null) {
        element = <Welcome
            message={assignment.welcomeMessage}
            onClose={onClose}
            onStart={() => setPosition(0)}
        />;
    } else if (position >= assignment.questions.length) {
        element = <Submit
            message={assignment.submitMessage}
            onNext={handleSubmit}
            onPrevious={handlePrevious}
            enableNextButton={areValidAnswers()}
        />
    } else {
        const question = assignment.questions[position];
        switch (question.type) {
            case 'singleChoice':
                element = <SingleChoiceQuestion
                    key={position}
                    message={question.message}
                    choices={question.values!}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onChange={handleChange}
                    enableNextButton={isValidAnswer()}
                    initialValue={answers[position] as number | null}
                />
                break;
            case 'multipleChoice':
                element = <MultipleChoiceQuestion
                    key={position}
                    message={question.message}
                    choices={question.values!}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onChange={handleChange}
                    enableNextButton={isValidAnswer()}
                    initialValues={answers[position] as number[] | null}
                />
                break;
            case 'openEnded':
                element = <OpenEndedQuestion
                    key={position}
                    message={question.message}
                    initialValue={answers[position] as string | null}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onChange={handleChange}
                    enableNextButton={isValidAnswer()}
                />
                break;
            default:
                throw new Error(`Unknown question type: ${question.type}`);
        }
    }

    return (
        element
    )

}

export default Survey;