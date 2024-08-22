import { Text, StyleSheet } from "react-native";
import useSubmitAssignment from "@/hooks/fetch_submit";
import BaseQuestionLayout from "@/components/assignment/question/BaseQuestionLayout";
import { ReactElement, useEffect } from "react";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";

export type SubmitProps = {
  message: string;
  assignmentId: number;
  answers: AnswerType[];
  onSubmit: () => void;
  onPrevious: () => void;
  enableNextButton: boolean;
};

const Submit = ({
  message,
  assignmentId,
  answers,
  onSubmit,
  onPrevious,
  enableNextButton,
}: SubmitProps) => {
  const { submitAssignment, isLoading, isError, isTooLate, isSubmitted } =
    useSubmitAssignment();

  const handleSubmit = () => {
    submitAssignment(assignmentId, answers);
  };

  useEffect(() => {
    if (isSubmitted) {
      onSubmit();
    }
  }, [isSubmitted]);

  let messageElement: ReactElement = (
    <Text style={styles.message}>{message}</Text>
  );

  if (isLoading) {
    messageElement = <CommonLoadingComponent />;
  }

  let nextHandler = handleSubmit;
  let nextButtonLabel = "Submit";

  if (isError) {
    messageElement = (
      <Text style={styles.message}>
        An error occurred while submitting your answers. Please try again later.
      </Text>
    );
    nextButtonLabel = "Retry";
  }

  if (isTooLate) {
    messageElement = (
      <Text style={styles.message}>
        Oops.... This assignment is too late to submit.
      </Text>
    );
    nextButtonLabel = "Close";
    nextHandler = onSubmit;
  }

  return (
    <BaseQuestionLayout
      iconType={"done"}
      onNext={nextHandler}
      onPrevious={onPrevious}
      nextButtonLabel={nextButtonLabel}
      enableNextButton={enableNextButton}
    >
      {messageElement}
    </BaseQuestionLayout>
  );
};

const styles = StyleSheet.create({
  message: {
    marginBottom: 20,
  },
});

export default Submit;
