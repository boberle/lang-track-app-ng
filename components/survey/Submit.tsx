import {Text, StyleSheet} from "react-native";
import BaseSurveyLayout, {QuestionProps} from "@/components/survey/question/BaseSurveyLayout";


const Submit = ({message, onNext, onPrevious, enableNextButton}: QuestionProps) => {

    return (
        <BaseSurveyLayout
            iconType={'done'}
            onNext={onNext}
            onPrevious={onPrevious}
            nextButtonLabel="Submit"
            enableNextButton={enableNextButton}
        >
            <Text style={styles.message}>{message}</Text>
        </BaseSurveyLayout>
    )
}

const styles = StyleSheet.create({
    message: {
        marginBottom: 20,
    }
})

export default Submit;
