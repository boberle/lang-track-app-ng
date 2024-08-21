import { FlatList, StyleSheet, View } from "react-native";
import AssignmentListItem from "./AssignmentListItem";

export type AssignmentListProps = {
  assignments: AssignmentListItemType[];
};

const AssignmentList = ({ assignments }: AssignmentListProps) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AssignmentList;
