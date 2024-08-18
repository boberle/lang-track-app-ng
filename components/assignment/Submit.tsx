import { Text, StyleSheet } from "react-native";
import BaseQuestionLayout, {
  QuestionProps,
} from "@/components/assignment/question/BaseQuestionLayout";

const Submit = ({
  message,
  onNext,
  onPrevious,
  enableNextButton,
}: QuestionProps) => {
  return (
    <BaseQuestionLayout
      iconType={"done"}
      onNext={onNext}
      onPrevious={onPrevious}
      nextButtonLabel="Submit"
      enableNextButton={enableNextButton}
    >
      <Text style={styles.message}>{message}</Text>
    </BaseQuestionLayout>
  );
};

const styles = StyleSheet.create({
  message: {
    marginBottom: 20,
  },
});

export default Submit;
