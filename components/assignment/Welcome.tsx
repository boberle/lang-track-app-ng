import { View, Text, StyleSheet } from "react-native";
import Logo from "@/components/common/Logo";
import Footer from "@/components/assignment/common/Footer";
import { backgroundColor } from "@/const/colors";
import Background from "@/components/common/Background";

export type WelcomeProps = {
  message: string;
  onClose: () => void;
  onStart: () => void;
};

const Welcome = ({ message, onClose, onStart }: WelcomeProps) => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.heading}>
            Bienvenue à cette enquête sur Lang Track App!
          </Text>
          <View style={styles.logo}>
            <Logo height={30} />
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={styles.footer}>
          <Footer
            mainButtonLabel={"Commencer"}
            mainButtonPress={onStart}
            secondaryButtonLabel={"Fermer"}
            secondaryButtonPress={onClose}
            enableMainButton={true}
          />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: backgroundColor,
  },
  body: {
    marginBottom: "auto",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    marginBottom: 50,
    marginTop: 20,
  },
  message: {
    padding: 25,
  },
  footer: {
    margin: 10,
    marginBottom: 30,
  },
});

export default Welcome;
