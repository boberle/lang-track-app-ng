import { View, Text, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export type CommonErrorComponentProps = {
  message?: string;
};

const CommonErrorComponent = ({ message }: CommonErrorComponentProps) => {
  const msg = message || "Something went wrong. Please try again later.";

  return (
    <View style={styles.container}>
      <Ionicons name="warning" size={48} color="black" style={styles.icon} />
      <Text>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 20,
  },
});

export default CommonErrorComponent;
