import {Button, Modal} from "react-bootstrap";
import moment from 'moment';

export const CancelLectureModal = (props) => {
    return (
        <Modal show={props.show}>
            <Modal.Header>Czy napewno chcesz anulować wykład?</Modal.Header>
            <Modal.Body>
                {props.lecture && <>
                    <p>Data: {moment(props.lecture?.date).format("YYYY-MM-DD HH:mm")}</p>
                    <p>Kategoria: {props.lecture?.licenceCategory.name}</p>
                    <p>Prowadzący: {props.lecture?.user.firstName} {props.lecture.user.lastName} </p>
                </>}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.confirmCancelLecture}>Zatwierdz</Button>
                <Button onClick={props.cancel}>Anuluj</Button>
            </Modal.Footer>
        </Modal>
    )
}
