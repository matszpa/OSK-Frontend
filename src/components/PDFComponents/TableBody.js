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
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    tdStyles: {
        width: "20%",
        textAlign: "center"
    },
    tdIndex: {
        width: "10%",
        textAlign: "left",
        paddingLeft: 10
    }
});
const TableBody = (props) => {
    const rows = props.data.map((item, index) =>
        <View style={styles.row} key={item.id}>
            <Text style={styles.tdIndex}>{index + 1}</Text>
            <Text style={styles.tdStyles}>{moment(item.day).format('MM/DD/YYYY')}</Text>
            <Text style={styles.tdStyles}>{item.hour}</Text>
            <Text style={styles.tdStyles}>{item.status}</Text>
            <Text style={styles.tdStyles}></Text>
        </View>)
    return (
        <Fragment>{rows}</Fragment>
    )
}
export default TableBody;