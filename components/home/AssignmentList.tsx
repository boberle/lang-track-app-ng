import { FlatList, StyleSheet, Text, View } from "react-native";
import AssignmentListItem, { Assignment } from "./AssignmentListItem";

export type AssignmentListProps = {
  assignments: Assignment[];
};

const AssignmentList = ({ assignments }: AssignmentListProps) => {
  if (!assignments.length) {
    return <NoAssignment />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assignments}
        renderItem={({ item }) => <AssignmentListItem assignment={item} />}
        keyExtractor={(item: Assignment) => item.id.toString()}
      />
    </View>
  );
};

const NoAssignment = () => {
  return (
    <View>
      <Text>No assignment yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AssignmentList;
