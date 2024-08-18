import { View, StyleSheet } from "react-native";
import AssignmentToCompleteButton, {
  AssignmentToComplete,
} from "./AssignmentToCompleteButton";
import AssignmentDonut from "@/components/home/AssignmentDonut";

type RibbonProps = {
  surveyToAnswer?: AssignmentToComplete | undefined;
};

const Ribbon = ({ surveyToAnswer }: RibbonProps) => {
  // TODO: no survey answered yet
  return (
    <View>
      {surveyToAnswer ? (
        <AssignmentToCompleteButton assignmentToComplete={surveyToAnswer} />
      ) : (
        <AssignmentDonut
          style={styles.surveyDonut}
          answeredAssignments={180}
          totalAssignments={200}
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
