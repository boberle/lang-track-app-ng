import { FlatList, StyleSheet, Text, View } from "react-native";
import AssignmentListItem from "./AssignmentListItem";
import useFetchAssignmentList from "@/hooks/fetch_assigments";
import { useEffect } from "react";
import CommonErrorComponent from "@/components/common/CommonErrorComponent";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";

export type AssignmentListProps = {
  userId: number;
};

const AssignmentList = ({ userId }: AssignmentListProps) => {
  const { assignmentList, isError, isLoading, fetchAssignmentList } =
    useFetchAssignmentList();

  useEffect(() => {
    fetchAssignmentList(userId);
  }, [fetchAssignmentList]);

  if (isLoading) {
    return <CommonLoadingComponent />;
  }

  if (isError) {
    return <CommonErrorComponent />;
  }

  if (assignmentList == null || !assignmentList.assignments.length) {
    return <NoAssignment />;
  }

  return <_AssignmentList assignments={assignmentList.assignments} />;
};

const _AssignmentList = ({
  assignments,
}: {
  assignments: AssignmentListItemType[];
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={assignments}
        renderItem={({ item }) => <AssignmentListItem assignment={item} />}
        keyExtractor={(item: AssignmentListItemType) => item.id.toString()}
      />
    </View>
  );
};

const NoAssignment = () => {
  return (
    <View style={styles.noAssignmentYetContainer}>
      <Text>No assignment yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noAssignmentYetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AssignmentList;
