import { StyleSheet, View } from "react-native";
import Ribbon from "./Ribbon";
import AssignmentList from "@/components/home/AssignmentList";
import useFetchAssignmentList from "@/hooks/fetch_assigments";
import { useEffect } from "react";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import CommonErrorComponent from "@/components/common/CommonErrorComponent";
import NoAssignmentYet from "@/components/home/NoAssignmentYet";
import useAuth from "@/hooks/useAuth";

const HomePage = () => {
  const { assignmentList, isError, isLoading, fetchAssignmentList } =
    useFetchAssignmentList();

  const { user, isLoading: isUserLoading } = useAuth();

  useEffect(() => {
    const f = async () => {
      if (user == null) return;
      const token = await user.getIdToken();
      fetchAssignmentList(token);
    };
    f();
  }, [fetchAssignmentList, user]);

  if (isLoading || isUserLoading) {
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
