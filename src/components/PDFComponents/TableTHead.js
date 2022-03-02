import {View, Text, StyleSheet} from "@react-pdf/renderer";

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#0026d3',
        borderBottomWidth: 1,
        color: '#ffffff',
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '15%'
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
const TableTHead = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.tdIndex}>Lp.</Text>
            <Text style={styles.tdStyles}>Data</Text>
            <Text style={styles.tdStyles}>Godzina</Text>
            <Text style={styles.tdStyles}>Status</Text>
            <Text style={styles.tdStyles}>Podpis</Text>
        </View>
    )
}

export default TableTHead;