import { Text, StyleSheet } from "react-native";
import useSubmitAssignment from "@/hooks/fetch_submit";
import BaseQuestionLayout from "@/components/assignment/question/BaseQuestionLayout";
import { ReactElement, useEffect } from "react";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import useGetIdToken from "@/hooks/useGetIdToken";

export type SubmitProps = {
  message: string;
  assignmentId: string;
  answers: (
    | SingleChoiceAnswer
    | MultipleChoiceAnswer
    | OpenEndedAnswer
    | null
  )[];
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
  const { getIdToken } = useGetIdToken();

  const handleSubmit = async () => {
    const token = await getIdToken();
    submitAssignment(assignmentId, answers, token);
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
    messageElement = (
      <CommonLoadingComponent message="Sending the answers..." />
    );
  }

  let nextHandler: () => void | Promise<void> = handleSubmit;
  let nextButtonLabel = "Envoyer";

  if (isError) {
    messageElement = (
      <Text style={styles.message}>
        An error occurred while submitting your answers. Please try again later.
      </Text>
    );
    nextButtonLabel = "Réessayer";
  }

  if (isTooLate) {
    messageElement = (
      <Text style={styles.message}>
        Oops.... This assignment is too late to submit.
      </Text>
    );
    nextButtonLabel = "Fermer";
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
