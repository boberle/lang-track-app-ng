import { StyleSheet, View } from "react-native";
import Ribbon from "./Ribbon";
import AssignmentList from "@/components/home/AssignmentList";
import useFetchAssignmentList from "@/hooks/fetch_assigments";
import { useEffect, useState } from "react";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import CommonErrorComponent from "@/components/common/CommonErrorComponent";
import NoAssignmentYet from "@/components/home/NoAssignmentYet";
import useNotificationSubscription from "@/hooks/useNotificationSubscription";
import { backgroundColor } from "@/const/colors";
import useGetIdToken from "@/hooks/useGetIdToken";

const HomePage = () => {
  const { assignmentList, isError, isLoading, fetchAssignmentList } =
    useFetchAssignmentList();
  const { notification } = useNotificationSubscription();
  const { getIdToken } = useGetIdToken();

  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    const f = async () => {
      const token = await getIdToken();
      fetchAssignmentList(token);
    };
    f();
  }, [fetchAssignmentList, notification, key]);

  if (isLoading) {
    return <CommonLoadingComponent message="Loading assignment list..." />;
  }

  if (isError) {
    return <CommonErrorComponent onRetry={() => setKey((v) => v + 1)} />;
  }

  if (
    assignmentList == null ||
    assignmentList.assignments.length === 0 ||
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
    backgroundColor: backgroundColor,
  },
});

export default HomePage;
