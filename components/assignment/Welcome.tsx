import { View, Text, StyleSheet } from "react-native";
import Logo from "@/components/common/Logo";
import Footer from "@/components/assignment/common/Footer";

export type WelcomeProps = {
  message: string;
  onClose: () => void;
  onStart: () => void;
};

const Welcome = ({ message, onClose, onStart }: WelcomeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.heading}>Survey time!</Text>
        <View style={styles.logo}>
          <Logo height={30} />
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.footer}>
        <Footer
          mainButtonLabel={"Start"}
          mainButtonPress={onStart}
          secondaryButtonLabel={"Close"}
          secondaryButtonPress={onClose}
          enableMainButton={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
  },
});

export default Welcome;
