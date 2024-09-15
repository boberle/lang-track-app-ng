import { Text, View, StyleSheet } from "react-native";
import Logo from "@/components/common/Logo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "@/components/common/Background";
import { backgroundColor } from "@/const/colors";

const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <Background>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.flexContainer}>
          <Text style={styles.title}>Lang Track App NG</Text>
          <Logo height={40} />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 110,
    backgroundColor: backgroundColor,
    paddingBottom: 10,
  },
  flexContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Header;
