import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Logo from "@/components/common/Logo";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import Background from "@/components/common/Background";
import { backgroundColor } from "@/const/colors";
import useAuth from "@/hooks/useAuth";
import useChangePassword from "@/hooks/fetch_change_password";
import { router } from "expo-router";
import { logout } from "@/actions/auth";

const ChangePasswordPage = () => {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);
  const { user, isLoading: isUserLoading } = useAuth();
  const { isLoading, isError, isSuccess, changePassword } = useChangePassword();

  const isCompliant = (password1: string, password2: string) => {
    if (password1 === "" || password2 === "") return;
    if (password1 !== password2) return;

    const password = password1;
    if (!/[a-z]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[@#$%^&+=!]/.test(password)) return false;
    if (password.length < 8) return false;

    return true;
  };

  const handleChangePassword = async () => {
    if (user == null) return;
    if (!isCompliant(password1, password2)) return;

    const token = await user.getIdToken();
    await changePassword(password1, token);
  };

  const disabled = !isCompliant(password1, password2);

  const credentialsInput = (
    <>
      <View>
        <View style={styles.message}>
          <Text>
            Avant de continuer, veuillez modifier votre mot de passe. Il doit
            contenir:
          </Text>
          <Text style={styles.policyPoint}>- au moins 8 caractères,</Text>
          <Text style={styles.policyPoint}>- au moins une minuscule</Text>
          <Text style={styles.policyPoint}>- au moins une majuscule</Text>
          <Text style={styles.policyPoint}>- au moins un chiffre</Text>
          <Text style={styles.policyPoint}>
            - au moins un symbole (@#$%^&+=!)
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password1}
          onChangeText={setPassword1}
        />
        <TextInput
          style={styles.input}
          placeholder="Veuillez retaper votre mot de passe"
          secureTextEntry
          value={password2}
          onChangeText={setPassword2}
        />
      </View>

      <Pressable
        style={[styles.button, disabled ? styles.disabled : null]}
        onPress={handleChangePassword}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>Modifier le mot de passe</Text>
      </Pressable>
    </>
  );

  useEffect(() => {
    setShowErrorPopup(isError);
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      logout();
      router.replace("/");
    }
  }, [isSuccess]);

  return (
    <KeyboardAvoidingView behavior="height" enabled={true}>
      <Background>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Logo height={75} />
          </View>
          <ScrollView>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Bienvenue sur</Text>
              <Text style={styles.title}>Lang Track App NG</Text>
            </View>

            {isLoading ? (
              <CommonLoadingComponent message="Setting up new password..." />
            ) : isUserLoading ? (
              <CommonLoadingComponent message="Loading user information..." />
            ) : showErrorPopup ? (
              <ErrorPopup onHide={() => setShowErrorPopup(false)} />
            ) : (
              credentialsInput
            )}
          </ScrollView>
        </View>
      </Background>
    </KeyboardAvoidingView>
  );
};

const ErrorPopup = ({ onHide }: { onHide: () => void }) => {
  return (
    <View>
      <Text style={styles.errorMessage}>
        Une erreur s'est produite lors de la modification du mot de passe.
        Veuillez réessayer.
      </Text>
      <Pressable style={styles.button} onPress={onHide}>
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: backgroundColor,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  titleContainer: {
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "steelblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  disabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    marginBottom: 20,
  },
  policyPoint: {
    paddingLeft: 5,
  },
  errorMessage: {
    marginBottom: 20,
  },
  logo: {
    marginBottom: 50,
  },
});

export default ChangePasswordPage;
