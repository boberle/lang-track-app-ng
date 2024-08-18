import { Text, StyleSheet, View } from "react-native";
import BaseQuestionLayout, {
  QuestionProps,
} from "@/components/assignment/question/BaseQuestionLayout";
import { useEffect, useState } from "react";
import { Checkbox } from "expo-checkbox";

export type SingleChoiceQuestionProps = QuestionProps & {
  choices: string[];
  initialValue: number | null;
  onChange: (index: number) => void;
};

const SingleChoiceQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  choices,
  initialValue,
  enableNextButton,
}: SingleChoiceQuestionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    initialValue,
  );

  useEffect(() => {
    if (selectedIndex != null) {
      onChange(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <BaseQuestionLayout
      iconType={"single"}
      onNext={onNext}
      onPrevious={onPrevious}
      enableNextButton={enableNextButton}
    >
      <Text style={styles.message}>{message}</Text>
      {choices.map((choice, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <Checkbox
            value={index === selectedIndex}
            onValueChange={() => setSelectedIndex(index)}
            style={styles.checkbox}
          />
          <Text>{choice}</Text>
        </View>
      ))}
    </BaseQuestionLayout>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  message: {
    marginBottom: 20,
  },
});

export default SingleChoiceQuestion;
