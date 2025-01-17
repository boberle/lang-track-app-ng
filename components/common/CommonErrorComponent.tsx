import { View, Text, StyleSheet, Pressable } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { logout } from "@/actions/auth";
import { router } from "expo-router";

export type CommonErrorComponentProps = {
  message?: string;
  onRetry?: () => void;
  offerToLogout?: boolean;
};

const CommonErrorComponent = ({
  message,
  onRetry,
  offerToLogout = false,
}: CommonErrorComponentProps) => {
  const msg =
    message || "Une erreur s'est produite. Merci de réessayer plus tard.";

  return (
    <View style={styles.container}>
      <Ionicons name="warning" size={48} color="black" style={styles.icon} />
      <Text>{msg}</Text>
      {onRetry && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onRetry}>
            <Text style={styles.buttonText}>Retry</Text>
          </Pressable>
        </View>
      )}
      {offerToLogout && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.logoutButton]}
            onPress={async () => {
              await logout();
              router.replace("/");
            }}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
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
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: "steelblue",
  },
  logoutButton: {
    backgroundColor: "#f32121",
  },
  notificationButton: {
    backgroundColor: "steelblue",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default CommonErrorComponent;
