import {StyleSheet, Text, View} from "react-native";


export type Survey = {
    id: number;
    title: string;
    answered: boolean;
    date: Date;
}

export type SurveyListItemProps = {
    survey: Survey;
}


const SurveyListItem = ({survey}: SurveyListItemProps) => {
    return (
        <View style={styles.flexContainer}>
            <Text style={styles.title}>{survey.title}</Text>
            <View style={styles.footer}>
                {survey.answered
                    ? <Answered />
                    : <UnAnswered />}
                <Text>{survey.date.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })}</Text>
            </View>
        </View>
    )
};

const Answered = () => {
    return (
        <>
            <Text><Text style={styles.answered}>&#x25cf;</Text> Answered</Text>
        </>
    )
}


const UnAnswered = () => {
    return (
        <>
            <Text><Text style={styles.unanswered}>&#x25cf;</Text> Unanswered</Text>
        </>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    answered: {
        color: 'green',
    },
    unanswered: {
        color: 'gray',
    }

})

export default SurveyListItem;
