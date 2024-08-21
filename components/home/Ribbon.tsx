import { View, StyleSheet } from "react-native";
import AssignmentToCompleteButton, {
  AssignmentToComplete,
} from "./AssignmentToCompleteButton";
import AssignmentDonut from "@/components/home/AssignmentDonut";

type RibbonProps = {
  answeredAssignments: number;
  totalAssignments: number;
  surveyToAnswer: AssignmentToComplete | null;
};

const Ribbon = ({
  answeredAssignments,
  totalAssignments,
  surveyToAnswer,
}: RibbonProps) => {
  return (
    <View>
      {surveyToAnswer ? (
        <AssignmentToCompleteButton assignmentToComplete={surveyToAnswer} />
      ) : (
        <AssignmentDonut
          style={styles.surveyDonut}
          answeredAssignments={answeredAssignments}
          totalAssignments={totalAssignments}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  surveyDonut: {
    padding: 20,
  },
});

export default Ribbon;
