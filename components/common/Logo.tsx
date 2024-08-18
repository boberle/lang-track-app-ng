import {View, Image, StyleSheet} from "react-native";

export type LogoProps = {
    height?: number;
}

const Logo = ({height=40}: LogoProps) => {
    return (
        <View style={{height: height}}>
            <View style={styles.flexContainer}>
                <Image source={require('./Logo.svg')} style={{height: "100%", resizeMode: "contain"}} />
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Logo;
