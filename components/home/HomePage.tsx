import { StyleSheet, View } from "react-native";
import Ribbon from "./Ribbon";
import AssignmentList from "@/components/home/AssignmentList";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Ribbon surveyToAnswer={{ expiredAt: new Date(), id: 567 }} />
      <AssignmentList userId={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
