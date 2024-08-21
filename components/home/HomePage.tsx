import { StyleSheet, View } from "react-native";
import Ribbon from "./Ribbon";
import AssignmentList from "@/components/home/AssignmentList";
import useFetchAssignmentList from "@/hooks/fetch_assigments";
import { useEffect } from "react";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import CommonErrorComponent from "@/components/common/CommonErrorComponent";
import NoAssignmentYet from "@/components/home/NoAssignmentYet";

export type HomePageProps = {
  userId: number;
};

const HomePage = ({ userId }: HomePageProps) => {
  const { assignmentList, isError, isLoading, fetchAssignmentList } =
    useFetchAssignmentList();

  useEffect(() => {
    fetchAssignmentList(userId);
  }, [fetchAssignmentList, userId]);

  if (isLoading) {
    return <CommonLoadingComponent />;
  }

  if (isError) {
    return <CommonErrorComponent />;
  }

  if (
    assignmentList == null ||
    !assignmentList.assignments.length ||
    assignmentList.totalAssignments === 0
  ) {
    return <NoAssignmentYet />;
  }

  return (
    <View style={styles.container}>
      <Ribbon
        surveyToAnswer={assignmentList.pendingAssignment}
        answeredAssignments={assignmentList.answeredAssignments}
        totalAssignments={assignmentList.totalAssignments}
      />
      <AssignmentList assignments={assignmentList.assignments} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
