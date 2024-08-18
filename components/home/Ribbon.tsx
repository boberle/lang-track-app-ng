import {View, StyleSheet} from "react-native";
import SurveyToAnswerButton, {SurveyToAnswer} from "./SurveyToAnswerButton"
import SurveyDonut from "@/components/home/SurveyDonut";

type RibbonProps = {
    surveyToAnswer?: SurveyToAnswer | undefined;
}

const Ribbon = ({surveyToAnswer}: RibbonProps) => {

    // TODO: no survey answered yet
    return (
        <View>
            {surveyToAnswer
                ? <SurveyToAnswerButton surveyToAnswer={surveyToAnswer} />
                : <SurveyDonut style={styles.surveyDonut} answeredSurveys={180} totalSurveys={200} />}
        </View>
    )
};


const styles = StyleSheet.create({
    surveyDonut: {
        padding: 20,
    }
})

export default Ribbon;
