import { StyleSheet, Text, View } from "react-native";
import {backgroundColor} from "@/const/colors";

const NoAssignmentYet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Lang Track App!</Text>
      <Text style={styles.text}>You don't have any assignment yet.</Text>
      <Text style={styles.icon}>😴</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor,
  },
  text: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 48,
  },
});

export default NoAssignmentYet;
