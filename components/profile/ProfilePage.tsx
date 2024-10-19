import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { useState } from "react";
import { logout } from "@/actions/firebase";
import useAuth from "@/hooks/useAuth";
import { Redirect, router } from "expo-router";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import useTestNotification from "@/hooks/fetch_test_notification";
import { User } from "@firebase/auth";
import { backgroundColor } from "@/const/colors";

const ProfilePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, isLoading: isUserLoading } = useAuth();

  if (isUserLoading) {
    return <CommonLoadingComponent />;
  }

  if (user == null) {
    return <Redirect href={"/"} />;
  }
  const emailAddress = user.email;

  const handleWantToLogout = () => {
    setModalVisible(true);
  };

  const handleLogoutConfirmed = async () => {
    await logout();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, styles.buttonCancelText]}>
                  Stay logged in
                </Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleLogoutConfirmed}>
                <Text style={styles.buttonText}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.section}>
        <Text style={styles.message}>You are logged in as {emailAddress}.</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleWantToLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </View>
      <TestNotification user={user} />
    </View>
  );
};

const TestNotification = ({ user }: { user: User }) => {
  const {
    sendTestNotification,
    isLoading: isTestNotificationLoading,
    isError: isTestNotificationError,
  } = useTestNotification();

  const handleTestNotification = async () => {
    const token = await user.getIdToken();
    await sendTestNotification(token);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.message}>
        Tap the button to send a test notification:
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.notificationButton]}
          onPress={handleTestNotification}
        >
          <Text style={styles.buttonText}>Send me a test notification</Text>
        </Pressable>
        {isTestNotificationLoading && <CommonLoadingComponent />}
        {isTestNotificationError && (
          <Text>An error occurred while sending the notification.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
  },
  section: {
    margin: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  message: {
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  buttonCancel: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "darkgray",
    marginRight: 10,
  },
  buttonCancelText: {
    color: "black",
  },
});

export default ProfilePage;
