import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export type AssignmentToComplete = {
  id: string;
  expiredAt: Date;
};

type AssignmentToCompleteButtonProps = {
  assignmentToComplete: AssignmentToComplete;
  style?: ViewStyle;
};

const AssignmentToCompleteButton = ({
  assignmentToComplete,
  style,
}: AssignmentToCompleteButtonProps) => {
  const computeRemainingTime = (): number => {
    const remainingTimeMilli =
      assignmentToComplete.expiredAt.valueOf() - new Date().valueOf();
    return Math.floor(remainingTimeMilli / 1000 / 60);
  };

  const [remainingTime, setRemainingTime] =
    useState<number>(computeRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(computeRemainingTime);
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePress = () => {
    router.push({
      pathname: "/assignments/[id]",
      params: { id: assignmentToComplete.id },
    });
  };

  const remainingTimeString =
    remainingTime >= 60
      ? `${Math.floor(remainingTime / 60)} hour(s)`
      : `${remainingTime} minute(s)`;

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.button} onPress={handlePress}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>Survey to answer</Text>
        </View>
        <Text style={styles.buttonDate}>Time left: {remainingTimeString}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    backgroundColor: "#709550",
    padding: 10,
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    height: 100,
    width: "100%",
  },
  buttonTextContainer: {
    flex: 3,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonDate: {
    fontSize: 12,
    color: "lightgray",
    alignSelf: "flex-start",
  },
});

export default AssignmentToCompleteButton;
