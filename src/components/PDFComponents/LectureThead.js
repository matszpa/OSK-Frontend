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
        flexGrow: 1,
        marginTop: 10
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
    }
});
const LectureThead = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.tdIndex}>Lp.</Text>
            <Text style={styles.tdStyles}>Data</Text>
            <Text style={styles.tdTopic}>Temat</Text>
            <Text style={styles.tdStyles}>Czas trwania</Text>
            <Text style={styles.tdStyles}>Czy obecny</Text>
        </View>
    )
}

export default LectureThead;