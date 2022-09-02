import car from '../assets/car.jpg'
import {Image} from "react-bootstrap";
import {useEffect, useState} from "react";

export const HomePage = () => {
    const [adminInfo, setAdminInfo] = useState({});
    useEffect(() => {
        fetch("http://localhost:8000/adminInfo")
            .then((res) => res.json())
            .then((res) => setAdminInfo(res));
    }, [])
    return (
        <div style={{textAlign: "center"}}>
            <h1 style={{letterSpacing: "5px"}}>OSK Drive</h1>
            <p>
                Jeśli chcesz rozpocząć kurs na prawo jazdy i dołączyć do naszej szkoły skontaktuj sie z
                adminitratorem
            </p>
            <h5>Dane administatora:</h5>
            <p>Imie i nazwisko:<b></b> {adminInfo.firstName} {adminInfo.lastName}</p>
            <p>Numer telefonu: {adminInfo.phoneNumber}</p>
            <p>Email: {adminInfo.email}</p>
            <Image style={{maxHeight: "400px", borderRadius: "20px"}} src={car} class="img-fluid"/>
            <p><a href='https://pl.freepik.com/zdjecia/samochod'>Samochód zdjęcie utworzone przez aleksandarlittlewolf -
                pl.freepik.com</a></p>
        </div>)
}