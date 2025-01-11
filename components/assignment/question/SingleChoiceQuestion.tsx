import { Text, StyleSheet, View, TextInput, Pressable } from "react-native";
import BaseQuestionLayout, {
  QuestionProps,
} from "@/components/assignment/question/BaseQuestionLayout";
import React, { useEffect, useState } from "react";
import { Checkbox } from "expo-checkbox";

export type SingleChoiceQuestionProps = QuestionProps & {
  choices: string[];
  initialValue: SingleChoiceAnswer | null;
  onChange: (answer: SingleChoiceAnswer | null) => void;
  lastIsSpecify: boolean;
};

const SingleChoiceQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  choices,
  initialValue,
  enableNextButton,
  lastIsSpecify,
}: SingleChoiceQuestionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    initialValue?.selectedIndex ?? null,
  );
  const [specifiedAnswer, setSpecifiedAnswer] = useState<string>(
    initialValue?.specify ?? "",
  );

  const isLastQuestion = (index: number) => index === choices.length - 1;

  useEffect(() => {
    const buildAnswer = (): SingleChoiceAnswer | null => {
      if (selectedIndex == null) return null;

      if (lastIsSpecify && isLastQuestion(selectedIndex)) {
        if (!specifiedAnswer) return null;
        return {
          type: "singleChoice",
          selectedIndex,
          specify: specifiedAnswer.trim(),
        };
      }
      return {
        type: "singleChoice",
        selectedIndex,
        specify: null,
      };
    };
    onChange(buildAnswer());
  }, [selectedIndex, specifiedAnswer]);

  return (
    <BaseQuestionLayout
      iconType={"single"}
      onNext={onNext}
      onPrevious={onPrevious}
      enableNextButton={enableNextButton}
    >
      <Text style={styles.message}>{message}</Text>
      {choices.map((choice, index) => (
        <View key={index}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={index === selectedIndex}
              onValueChange={() => setSelectedIndex(index)}
              style={styles.checkbox}
            />
            <Pressable onPress={() => setSelectedIndex(index)}>
              <Text>{choice}</Text>
            </Pressable>
          </View>
          {lastIsSpecify && isLastQuestion(index) && (
            <TextInput
              style={styles.specifyInput}
              value={specifiedAnswer}
              onChangeText={setSpecifiedAnswer}
              editable={selectedIndex != null && isLastQuestion(selectedIndex)}
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

export default SingleChoiceQuestion;
