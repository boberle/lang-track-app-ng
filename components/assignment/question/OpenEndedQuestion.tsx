import { Text, StyleSheet, TextInput } from "react-native";
import BaseQuestionLayout, {
  QuestionProps,
} from "@/components/assignment/question/BaseQuestionLayout";
import { useEffect, useState } from "react";

export type OpenEndedQuestionProps = QuestionProps & {
  initialValue: string | null;
  onChange: (value: string | null) => void;
  maxLength?: number;
};

const OpenEndedQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  initialValue,
  enableNextButton,
  maxLength = 100,
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
        maxLength={maxLength}
      />
      <Text style={styles.characterCount}>
        {value.length}/{maxLength}
      </Text>
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
    height: 150,
    marginBottom: 5,
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
    alignSelf: "flex-end",
  },
});

export default OpenEndedQuestion;
