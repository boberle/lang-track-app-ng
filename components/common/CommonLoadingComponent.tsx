import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

const CommonLoadingComponent = ({ message }: { message?: string }) => {
  return (
    <View style={styles.container}>
      {message && <Text>{message}</Text>}
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommonLoadingComponent;
