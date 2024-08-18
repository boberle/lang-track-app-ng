import {Text, View, StyleSheet, ViewStyle, Pressable} from "react-native";
import {Link} from "expo-router";


export type SurveyToAnswer = {
    id: number;
    expiredAt: Date;
}

type SurveyToAnswerButtonProps = {
    surveyToAnswer: SurveyToAnswer;
    style?: ViewStyle;
}


const SurveyToAnswerButton = ({surveyToAnswer, style}: SurveyToAnswerButtonProps) => {

    const remainingTimeMilli = (new Date()).valueOf() - surveyToAnswer.expiredAt.valueOf()
    const remainingTime = Math.floor((remainingTimeMilli / 1000) / 60)

    return (
        <View style={[styles.container, style]}>
            <Link href={{pathname: '/surveys/[id]', params: {id: surveyToAnswer.id}}}>
                <Pressable style={styles.button}>
                        <View style={styles.buttonTextContainer}>
                            <Text style={styles.buttonText}>Survey to answer</Text>
                        </View>
                        <Text style={styles.buttonDate}>
                            Time left: {remainingTime} minutes
                        </Text>
                </Pressable>
            </Link>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    button: {
        backgroundColor: "#709550",
        padding: 10,
        borderRadius: 5,
        flexDirection: "column",
        alignItems: "center",
        height: 100,
        width: "100%",
    },
    buttonTextContainer: {
      flex: 3,
      justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    buttonDate: {
        fontSize: 12,
        color: "lightgray",
        alignSelf: "flex-start"
    },
})

export default SurveyToAnswerButton;
