import {FlatList, StyleSheet, Text, View} from "react-native";
import SurveyListItem, {Survey} from "./SurveyListItem";

export type SurveyListProps = {
    surveys: Survey[]
}

const SurveyList = ({surveys}: SurveyListProps) => {

    if (!surveys.length) {
        return <NoSurvey />
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={surveys}
                renderItem={({item}) => <SurveyListItem survey={item} />}
                keyExtractor={(item: Survey) => item.id.toString()}
            />
        </View>
    )
};

const NoSurvey = () => {
    return (
        <View>
            <Text>No survey yet.</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default SurveyList;
