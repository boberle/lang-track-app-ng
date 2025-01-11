import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { useState, useContext } from "react";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import useTestNotification from "@/hooks/fetch_test_notification";
import { User } from "@firebase/auth";
import { backgroundColor } from "@/const/colors";
import useTestSurvey from "@/hooks/fetch_test_survey";
import { logout } from "@/actions/auth";
import AuthContext from "@/store/auth";

const ProfilePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const ctx = useContext(AuthContext);

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
              Êtes-vous sûr de vouloir vous déconnecter?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, styles.buttonCancelText]}>
                  Rester connecté
                </Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleLogoutConfirmed}>
                <Text style={styles.buttonText}>Se déconnecter</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.section}>
        <Text style={styles.message}>
          Vous êtes connecté en tant que {ctx.user!.email}.
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleWantToLogout}>
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </Pressable>
        </View>
      </View>
      <TestNotification user={ctx.user!} />
      <TestSurvey user={ctx.user!} />
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
        Appuyer sur le bouton pour envoyer une notification de test:
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.notificationButton]}
          onPress={handleTestNotification}
        >
          <Text style={styles.buttonText}>
            Envoyer une notification de test
          </Text>
        </Pressable>
        {isTestNotificationLoading && <CommonLoadingComponent />}
        {isTestNotificationError && (
          <Text>
            Une erreur s'est produite lors de l'envoi de la notification
          </Text>
        )}
      </View>
    </View>
  );
};

const TestSurvey = ({ user }: { user: User }) => {
  const {
    sendTestSurvey,
    isLoading: isTestSurveyLoading,
    isError: isTestSurveyError,
  } = useTestSurvey();

  const handleTestSurvey = async () => {
    const token = await user.getIdToken();
    await sendTestSurvey(token);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.message}>
        Appuyer sur le bouton pour envoi un sondage de test:
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.notificationButton]}
          onPress={handleTestSurvey}
        >
          <Text style={styles.buttonText}>Envoyer un sondage de test</Text>
        </Pressable>
        {isTestSurveyLoading && <CommonLoadingComponent />}
        {isTestSurveyError && (
          <Text>Une erreur s'est produite lors de l'envoi du sondage</Text>
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
