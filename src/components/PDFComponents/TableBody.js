import {Fragment} from "react";
import {View, Text, StyleSheet} from '@react-pdf/renderer'
import moment from 'moment';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 20,
    },
    tdStyles: {
        width: "30%",
        textAlign: "left"
    },
    tdIndex: {
        width: "10%",
        textAlign: "left",
        paddingLeft: 10
    },
    tdInstructor: {
        width: "25%",
        textAlign: "left",
    }
});
const TableBody = (props) => {
    const rows = props.data.map((item, index) =>
        <View style={styles.row} key={item.id}>
            <Text style={styles.tdIndex}>{index + 1}</Text>
            <Text style={styles.tdStyles}>{moment(item.day).format('MM/DD/YYYY')} {item.hour}:00</Text>
            <Text style={styles.tdStyles}>{item.status}</Text>
            <Text style={styles.tdStyles}>{item.user.firstName} {item.user.LastName}</Text>
        </View>)
    return (
        <Fragment>{rows}</Fragment>
    )
}
export default TableBody;