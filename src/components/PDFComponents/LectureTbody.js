import {Fragment} from "react";
import {View, Text, StyleSheet} from '@react-pdf/renderer'
import moment from 'moment';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 20,
        // fontStyle: 'bold',
    },

    tdStyles: {
        width: "20%",
        textAlign: "center"
    },
    tdIndex: {
        width: "10%",
        textAlign: "left",
        paddingLeft: 10
    },
    tdTopic: {
        width: "25%",
        textAlign: "center"
    }
});
const TableBody = (props) => {
    const rows = props.data.map((item, index) =>
        <View style={styles.row} key={item.id}>
            <Text style={styles.tdIndex}>{index + 1}</Text>
            <Text style={styles.tdStyles}>{moment(item.lecture.date).format('MM/DD/YYYY HH:MM')}</Text>
            <Text style={styles.tdTopic}>{item.lecture.topic}</Text>
            <Text style={styles.tdStyles}>{item.lecture.duration}</Text>
            <Text style={styles.tdStyles}>{item.isPresent ? "Tak" : "Nie"}</Text>
        </View>)
    return (
        <Fragment>{rows}</Fragment>
    )
}
export default TableBody;