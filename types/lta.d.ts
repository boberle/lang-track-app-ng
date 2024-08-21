type AssignmentListItemType = {
  id: number;
  title: string;
  answered: boolean;
  date: Date;
};

type PendingAssignmentType = {
  id: number;
  expiredAt: Date;
};

type AssignmentListType = {
  assignments: AssignmentListItemType[];
  totalAssignments: number;
  answeredAssignments: number;
  pendingAssignment: PendingAssignmentType | null;
};

type AnswerType = string | number | number[];

type BaseQuestionType = {
  message: string;
};

type SingleChoiceQuestion = BaseQuestionType & {
  type: "singleChoice";
  values: string[];
};

type MultipleChoiceQuestion = BaseQuestionType & {
  type: "multipleChoice";
  values: string[];
};

type OpenEndedQuestion = BaseQuestionType & {
  type: "openEnded";
  maxLength?: number;
};

type AssignmentType = {
  id: number;
  welcomeMessage: string;
  submitMessage: string;
  questions: (
    | SingleChoiceQuestion
    | MultipleChoiceQuestion
    | OpenEndedQuestion
  )[];
};
