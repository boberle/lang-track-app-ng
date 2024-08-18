import {View, StyleSheet, Pressable, ViewStyle, Text} from "react-native";


export type FooterProps = {
    mainButtonLabel: string;
    mainButtonPress: () => void;
    secondaryButtonLabel: string;
    secondaryButtonPress: () => void;
    enableMainButton: boolean;
    style?: ViewStyle;
}

const Footer = ({mainButtonLabel, mainButtonPress, secondaryButtonLabel, secondaryButtonPress, enableMainButton, style}: FooterProps) => {
    return (
        <View style={[styles.container, style]}>
            <Pressable
                style={[styles.buttons, styles.secondaryButton]}
                onPress={secondaryButtonPress}
            >
                <Text>{secondaryButtonLabel}</Text>
            </Pressable>
            <Pressable
                style={[styles.buttons, styles.mainButton, enableMainButton? {} : styles.mainButtonDisabled]}
                onPress={mainButtonPress}
                disabled={!enableMainButton}
            >
                <Text>{mainButtonLabel}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttons: {
        borderRadius: 5,
        height: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    mainButton: {
        backgroundColor: 'steelblue',
    },
    mainButtonDisabled: {
        backgroundColor: "gray",
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: 'steelblue',
    }
})

export default Footer;