import {Text, View, ViewStyle, StyleSheet} from "react-native";


export type SurveyDonutProps = {
    style?: ViewStyle
    answeredSurveys: number;
    totalSurveys: number;
}


const SurveyDonut = ({style, answeredSurveys, totalSurveys}: SurveyDonutProps) => {
    return (
        <View style={styles.container}>
        <View style={[styles.flexContainer, style]}>
            <Donut proportion={answeredSurveys / totalSurveys} />
            <Message answeredSurveys={answeredSurveys} totalSurveys={totalSurveys} />
        </View>
        </View>
    )
};


type MessageProps = {
    answeredSurveys: number;
    totalSurveys: number;
}

const Message = ({answeredSurveys, totalSurveys}: MessageProps) => {
    return (
        <View style={styles.message}>
            <SmileyFace proportion={answeredSurveys / totalSurveys} />
            <Text>You have answered</Text>
            <Text>{answeredSurveys} of your {totalSurveys}</Text>
            <Text>assigned surveys.</Text>
        </View>
    )
}


type SmileyFaceProps = {
    proportion: number;
}


const SmileyFace = ({proportion}: SmileyFaceProps) => {
    let smiley: string;
    if (proportion >= 0.9) {
        smiley = "🌟";
    } else if (proportion >= 0.8) {
        smiley = "😁";
    } else if (proportion >= 0.5) {
        smiley = "👍";
    } else if (proportion >= 0.25) {
        smiley = "😏";
    } else {
        smiley = "😬";
    }

    return (
        <Text style={styles.smileyFace}>{smiley}</Text>
    )
}


type DonutProps = {
    proportion: number;
}

const Donut = ({proportion}: DonutProps) => {
    return (
        <View style={styles.donutContainer}>
            <View style={styles.donut}>
        <svg style={{borderRadius: "50%"}} viewBox='0 0 32 32'>
            <g strokeWidth='12'>
                <circle transform="rotate(-90 16 16)" fill="transparent" cx='16' cy='16' r='16'
                        strokeDasharray={`${(proportion * 100 + proportion).toFixed(1)} 100`} strokeDashoffset='0'
                        stroke='#6e9650'></circle>
                <circle transform="rotate(-90 16 16) translate(0, 32) scale(1, -1)" fill="transparent" cx='16' cy='16' r='16'
                        strokeDasharray={`${(101 - (proportion * 100 + proportion)).toFixed(1)} 100`} strokeDashoffset='0'
                        stroke='#ddd'></circle>
            </g>
            <text style={svgStyles.text} x="16" y="17" textAnchor="middle">
                <tspan dx="0" dy="0">{(proportion * 100).toFixed(1)}%</tspan>
            </text>
        </svg>
            </View>
        </View>
    )
}

const svgStyles = StyleSheet.create({
    text: {
        fontFamily: "sans-serif",
        fontSize: 4,
        textAlign: "left",
    },
})


const styles = StyleSheet.create({
    container: {
        minHeight: 120,
        backgroundColor: "#f1ece6",
        borderColor: "#a09b97",
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
    },
    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    donutContainer: {
        padding: 5,
        width: "50%",
        resizeMode: "contain",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    donut: {
        width: "75%",
    },
    message: {
        padding: 5,
        width: "50%",
        flex: 1,
        alignItems: 'center',
    },
    smileyFace: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

export default SurveyDonut;
