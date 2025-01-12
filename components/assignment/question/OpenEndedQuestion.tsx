import { Text, StyleSheet, TextInput } from "react-native";
import BaseQuestionLayout, {
  QuestionProps,
} from "@/components/assignment/question/BaseQuestionLayout";
import { useEffect, useState } from "react";

export type OpenEndedQuestionProps = QuestionProps & {
  initialValue: OpenEndedAnswer | null;
  onChange: (value: OpenEndedAnswer | null) => void;
  maxLength?: number;
  optional: boolean;
};

const OpenEndedQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  initialValue,
  enableNextButton,
  maxLength = 100,
  optional,
}: OpenEndedQuestionProps) => {
  const [value, setValue] = useState<string>(initialValue?.value ?? "");

  useEffect(() => {
    let answer: OpenEndedAnswer | null;
    const v = value.trim();
    if (!optional && v.length === 0) {
      answer = null;
    } else {
      answer = { type: "openEnded", value: v };
    }
    onChange(answer);
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
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    height: 150,
    marginBottom: 5,
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    marginBottom: 0,
    alignSelf: "flex-end",
  },
});

export default OpenEndedQuestion;
