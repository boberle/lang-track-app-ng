import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";
import Logo from "@/components/common/Logo";
import CommonLoadingComponent from "@/components/common/CommonLoadingComponent";
import Background from "@/components/common/Background";
import { backgroundColor } from "@/const/colors";
import { login } from "@/actions/auth";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      await login(username, password);
      router.replace("/");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const credentialsInput = (
    <>
      <View>
        <Text style={styles.message}>
          Entrez vos identifiants pour vous connecter:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </>
  );

  useEffect(() => {
    setShowErrorPopup(isError);
  }, [isError]);

  return (
    <KeyboardAvoidingView behavior="height" enabled={true}>
      <Background>
        <View style={styles.container}>
          <Logo height={75} />
          <View>
            <Text style={styles.title}>Bienvenue sur</Text>
            <Text style={styles.title}>Lang Track App NG</Text>
          </View>

          {isLoading ? (
            <CommonLoadingComponent />
          ) : showErrorPopup ? (
            <ErrorPopup onHide={() => setShowErrorPopup(false)} />
          ) : (
            credentialsInput
          )}
        </View>
      </Background>
    </KeyboardAvoidingView>
  );
};

const ErrorPopup = ({ onHide }: { onHide: () => void }) => {
  return (
    <View>
      <Text style={styles.errorMessage}>
        Erreur lors de la connexion. Veuillez réessayer.
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

export default LoginPage;
