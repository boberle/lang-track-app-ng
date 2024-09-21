import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Logo from "@/components/common/Logo";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import { logout } from "@/actions/firebase";
import Background from "@/components/common/Background";
import { backgroundColor } from "@/const/colors";
import useAuth from "@/hooks/useAuth";
import useChangePassword from "@/hooks/fetch_change_password";
import { router } from "expo-router";

const ChangePasswordPage = () => {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);
  const { user, isLoading: isUserLoading } = useAuth();
  const {
    isLoading: isChangePasswordLoading,
    isError: isChangePasswordError,
    isSuccess: isChangePasswordSuccess,
    changePassword,
  } = useChangePassword();

  const handleChangePassword = async () => {
    if (user == null) return;
    if (password1 === "" || password2 === "") return;
    if (password1 !== password2) return;

    const token = await user.getIdToken();
    await changePassword(password1, token);
    router.replace("/");
  };

  const disabled = password1 === "" || password1 !== password2;

  const credentialsInput = (
    <>
      <View>
        <Text style={styles.message}>
          Before you continue, please change your password:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password1}
          onChangeText={setPassword1}
        />
        <TextInput
          style={styles.input}
          placeholder="Type the password again"
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
        <Text style={styles.buttonText}>Change password</Text>
      </Pressable>
    </>
  );

  useEffect(() => {
    setShowErrorPopup(isChangePasswordError);
  }, [isChangePasswordError]);

  useEffect(() => {
    if (isChangePasswordSuccess) {
      logout();
    }
  }, [isChangePasswordSuccess]);

  return (
    <Background>
      <View style={styles.container}>
        <Logo height={75} />
        <View>
          <Text style={styles.title}>Welcome to the</Text>
          <Text style={styles.title}>Lang Track App NG</Text>
        </View>

        {isChangePasswordLoading || isUserLoading ? (
          <CommonLoadingComponent />
        ) : showErrorPopup ? (
          <ErrorPopup onHide={() => setShowErrorPopup(false)} />
        ) : (
          credentialsInput
        )}
      </View>
    </Background>
  );
};

const ErrorPopup = ({ onHide }: { onHide: () => void }) => {
  return (
    <View>
      <Text style={styles.errorMessage}>
        An error occurred while changing your password. Please try again.
      </Text>
      <Pressable style={styles.button} onPress={onHide}>
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: backgroundColor,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  errorMessage: {
    marginBottom: 20,
  },
});

export default ChangePasswordPage;
