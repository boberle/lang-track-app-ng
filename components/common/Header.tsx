import {Text, View, StyleSheet} from "react-native";
import Logo from "@/components/common/Logo";

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.flexContainer}>
                <Text style={styles.title}>Lang App Track NG</Text>
                <Logo height={40} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        minHeight: 100,
    },
    flexContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Header;