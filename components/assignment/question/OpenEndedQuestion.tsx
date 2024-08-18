import { Text, StyleSheet, TextInput } from "react-native";
import BaseQuestionLayout, {
  QuestionProps,
} from "@/components/assignment/question/BaseQuestionLayout";
import { useEffect, useState } from "react";

export type OpenEndedQuestionProps = QuestionProps & {
  initialValue: string | null;
  onChange: (value: string | null) => void;
};

const OpenEndedQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  initialValue,
  enableNextButton,
}: OpenEndedQuestionProps) => {
  const [value, setValue] = useState<string>(initialValue || "");

  useEffect(() => {
    onChange(value.length === 0 ? null : value);
  }, [value]);

  return (
    <BaseQuestionLayout
      iconType="open-ended"
      onNext={onNext}
      onPrevious={onPrevious}
      enableNextButton={enableNextButton}
    >
      <Text style={styles.message}>{message}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        multiline={true}
      />
    </BaseQuestionLayout>
  );
};

const styles = StyleSheet.create({
  message: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    height: 150,
  },
});

export default OpenEndedQuestion;
