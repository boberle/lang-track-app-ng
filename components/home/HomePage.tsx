import {StyleSheet, View} from "react-native";
import Ribbon from "./Ribbon";
import SurveyList from "@/components/home/SurveyList";

const HomePage = () => {

    const surveys = [
        {id: 1, title: "dlfj  lkjdf", answered: true, date: new Date()},
        {id: 2, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 3, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 4, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 5, title: "dlfj  lkjdf", answered: true, date: new Date()},
        {id: 6, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 7, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 8, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 9, title: "dlfj  lkjdf", answered: true, date: new Date()},
        {id: 10, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 11, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 12, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 13, title: "dlfj  lkjdf", answered: true, date: new Date()},
        {id: 14, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 15, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 16, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 17, title: "dlfj  lkjdf", answered: true, date: new Date()},
        {id: 18, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 19, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 20, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 21, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 22, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 23, title: "dlfj  lkjdf", answered: true, date: new Date()},
        {id: 24, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 25, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 26, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 27, title: "dlfj  lkjdf", answered: true, date: new Date()},
        {id: 28, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 29, title: "dfdf  dfdf", answered: false, date: new Date()},
        {id: 30, title: "dfdf  dfdf", answered: false, date: new Date()},
    ];

    return (
        <View style={styles.container}>
            <Ribbon surveyToAnswer={{expiredAt: new Date(), id: 567}} />
            <SurveyList surveys={surveys} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default HomePage;
