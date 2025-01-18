import { Text, StyleSheet, View, TextInput, Pressable } from "react-native";
import BaseQuestionLayout, {
  QuestionProps,
} from "@/components/assignment/question/BaseQuestionLayout";
import React, { useEffect, useState } from "react";
import { Checkbox } from "expo-checkbox";

export type MultipleChoicesQuestionProps = QuestionProps & {
  choices: string[];
  initialValues: MultipleChoiceAnswer | null;
  onChange: (indices: MultipleChoiceAnswer | null) => void;
  lastIsSpecify: boolean;
};

const MultipleChoiceQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  choices,
  initialValues,
  enableNextButton,
  lastIsSpecify,
}: MultipleChoicesQuestionProps) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>(
    initialValues?.selectedIndices ?? [],
  );
  const [specifiedAnswer, setSpecifiedAnswer] = useState<string>(
    initialValues?.specify ?? "",
  );

  const isLastQuestion = (index: number) => index === choices.length - 1;

  useEffect(() => {
    const buildAnswer = (): MultipleChoiceAnswer | null => {
      if (selectedIndices.length === 0) return null;
      if (lastIsSpecify && selectedIndices.some((v) => isLastQuestion(v))) {
        if (!specifiedAnswer) return null;
        return {
          type: "multipleChoice",
          selectedIndices,
          specify: specifiedAnswer.trim(),
        };
      }
      return {
        type: "multipleChoice",
        selectedIndices,
        specify: null,
      };
    };

    onChange(buildAnswer());
  }, [selectedIndices, specifiedAnswer]);

  return (
    <BaseQuestionLayout
      iconType={"multiple"}
      onNext={onNext}
      onPrevious={onPrevious}
      enableNextButton={enableNextButton}
    >
      <Text style={styles.message}>{message}</Text>
      {choices.map((choice, index) => (
        <View key={index}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={selectedIndices.includes(index)}
              onValueChange={(checked) =>
                setSelectedIndices((prev) => {
                  if (checked) {
                    if (!selectedIndices.includes(index))
                      return [...prev, index];
                  }
                  return prev.filter((v) => v !== index);
                })
              }
              style={styles.checkbox}
            />
            <Pressable
              onPress={() => {
                const checked = !selectedIndices.includes(index);
                setSelectedIndices((prev) => {
                  if (checked) {
                    if (!selectedIndices.includes(index))
                      return [...prev, index];
                  }
                  return prev.filter((v) => v !== index);
                });
              }}
            >
              <Text>{choice}</Text>
            </Pressable>
          </View>
          {lastIsSpecify && isLastQuestion(index) && (
            <TextInput
              style={styles.specifyInput}
              value={specifiedAnswer}
              onChangeText={setSpecifiedAnswer}
              editable={
                selectedIndices.length !== 0 && selectedIndices.includes(index)
              }
              maxLength={30}
            />
          )}
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
  specifyInput: {
    marginLeft: 10,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default MultipleChoiceQuestion;
