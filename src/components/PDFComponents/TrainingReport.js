import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import TableTHead from "./TableTHead";
import TableBody from "./TableBody";
import moment from 'moment';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
    },
    student: {
        marginBottom: 5,
        marginTop: 5,
    }
});


const TrainingReport = (props) => {
    return (<>
            {props.data &&
                <Document>
                    <Page size="A4" style={styles.page}>

                        <View>
                            <Text style={styles.header}>Raport szkolenia</Text>
                            <Text
                                style={styles.student}>Kursant: {props.data.user.firstName} {props.data.user.lastName} Kategoria:{props.data.licenceCategory.name}</Text>
                            <Text>Data rozpoczecia szkolenia:{moment(props.data.startDate).format('MM/DD/YYYY')}</Text>
                            <Text>Data zakonczenia szkolenia:{moment(props.data.endDate).format('MM/DD/YYYY')}</Text>
                            <TableTHead/>
                            <TableBody data={props.data?.drivings}/>

                        </View>

                    </Page>
                </Document>
            }</>
    )

}


export default TrainingReport;