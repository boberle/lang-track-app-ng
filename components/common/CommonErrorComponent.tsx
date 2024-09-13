import { View, Text, StyleSheet, Button } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export type CommonErrorComponentProps = {
  message?: string;
  onRetry?: () => void;
};

const CommonErrorComponent = ({
  message,
  onRetry,
}: CommonErrorComponentProps) => {
  const msg = message || "Something went wrong. Please try again later.";

  return (
    <View style={styles.container}>
      <Ionicons name="warning" size={48} color="black" style={styles.icon} />
      <Text>{msg}</Text>
      {onRetry && (
        <View style={styles.button}>
          <Button title="Retry" onPress={onRetry} />
        </View>
      )}
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
  button: {
    marginTop: 20,
  },
});

export default CommonErrorComponent;
