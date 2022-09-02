import {View, Text, StyleSheet} from "@react-pdf/renderer";

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
        flexGrow: 1,
    },
    tdStyles: {
        width: "30%",
        textAlign: "left"
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
            <Text style={styles.tdStyles}>Status</Text>
            <Text style={styles.tdStyles}>Instruktor</Text>
        </View>
    )
}

export default TableTHead;