import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { appBackgroundColor } from "@/const/colors";

const Background = ({ children }: { children: ReactNode[] | ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.background, { paddingTop: insets.top }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: appBackgroundColor,
  },
});

export default Background;
