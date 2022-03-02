import {Form, Button, FormGroup, Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import styles from './AddEditQuestion.module.scss'
import {useParams} from "react-router-dom";

export const AddEditQuestion = (props) => {
    const [abc, setAbc] = useState(false)
    const {id} = useParams();
    const [formData, setFormData] = useState({
        question: "",
        type: "",
        answers: [{content: "", correct: false}, {content: "", correct: false}, {content: "", correct: false}],
        points: 1,
        cattegory_question: []
    })
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            });
        if (id) {
            fetch("http://localhost:8000/getSIngleQuestion/3165")
                .then((res) => res.json())
                .then((res) => {
                    var tmp = res.question;
                    tmp.cattegory_question = res.cattegory_question;
                    setFormData(tmp)
                });
        }

    }, [])
    const doAction = async (event) => {
        event.preventDefault()
        var formDataValues = new FormData()
        formDataValues.append("file", file);
        for (let name in formData) {
            if (Array.isArray(formData[name])) {
                formData[name].forEach((object, index) => formDataValues.append(name, JSON.stringify(object)))
            } else {
                formDataValues.append(name, formData[name]);
            }
        }


        fetch("http://localhost:8000/addQuestion", {
            method: "POST",
            body: formDataValues,
            headers: {
                Accept: "application/form-data",
            }
        })


    }
    const change = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }
    const answerChange = (index, event) => {
        let temp = formData.answers;
        temp[index] = {...temp[index], "content": event.target.value};
        setFormData({
            ...formData,
            answers: temp
        });
    }
    const choseCorrectRadio = (index, event) => {
        let temp = formData.answers;
        temp.map(a => a.correct = false);
        temp[index] = {...temp[index], "correct": event.target.checked};
        setFormData({
            ...formData,
            answers: temp
        });
    }

    const checkbox = (event) => {
        let catId = parseInt(event.target.id)
        let newArray = [...formData.cattegory_question, {"licenceCategoryId": catId}];
        if (formData.cattegory_question.includes({"licenceCategoryId": catId})) {
            newArray = newArray.filter(object => object.id !== catId);
        }
        setFormData({
            ...formData,
            cattegory_question: newArray
        });
    }

    return (
        <div className={styles.editQuestionContainer}>
            <h2>Formularz {id ? "edycji" : "dodawania"} pytania</h2>
            <Form onSubmit={doAction}>
                <Form.Group className="mb-1">
                    <Form.Label>Treść pytania</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Wprowadz pytanie" name="question"
                                  value={formData.question}
                                  onChange={change}/>
                </Form.Group>

                <Form.Group className="mb-1 mt-3">
                    <Form.Label>Odpowiedzi</Form.Label>
                    <AnswerInput choseCorrectRadio={choseCorrectRadio} answerChange={answerChange} index={0}
                                 placeHolderText={"A"}
                                 answer={formData.answers[0]}
                    />
                    <AnswerInput choseCorrectRadio={choseCorrectRadio} answerChange={answerChange} index={1}
                                 placeHolderText={"B"}
                                 answer={formData.answers[1]}
                    />

                    {abc || (id && formData.answers.length === 3 ? true : false) &&
                        <AnswerInput choseCorrectRadio={choseCorrectRadio} answerChange={answerChange} index={2}
                                     answer={formData.answers[2]}
                                     placeHolderText={"C"}/>}
                    {!abc || (id && formData.answers.length === 3 ? false : true) &&
                        <Button onClick={() => setAbc(true)}>Dodaj kolejną odpowiedz</Button>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Typ pytania</Form.Label>
                    <Form.Control
                        as="select"
                        value={formData.type}
                        name="type"
                        onChange={change}
                    >
                        <option value="">Wybierz rodzaj pytania</option>
                        <option value="SPECJALISTYCZNY">Specjalistyczny</option>
                        <option value="PODSTAWOWY">Podstawowy</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Liczba punktów</Form.Label>
                    <Form.Control
                        as="select"
                        value={formData.points}
                        name="points"
                        onChange={change}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Control>
                </Form.Group>
                <input className={"form-control mt-4 mb-3"} type="file" onChange={(e) => {
                    setFile(e.target.files[0])
                }}/>


                <Form.Group className="mb-1">
                    <Form.Label>Wybierz kategorie pytania</Form.Label>
                    <Row>
                        {categories.map((c) => (
                            <Col sm={4} lg={1} key={c.id}>
                                <Form.Check type="checkbox"
                                            checked={formData.cattegory_question.some((item) => item === c.id)}
                                            nome="cattegory_question"
                                            label={c.name}
                                            id={c.id}

                                            onChange={checkbox}/>
                            </Col>))}
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? "Edytuj" : "Dodaj"}
                </Button>
            </Form>


        </div>)
}

const AnswerInput = (props) => {
    return (
        <div style={{display: "flex", marginBottom: "1rem"}}>
            <input name="correct" style={{marginRight: "1rem"}} type={"radio"}
                   checked={props.answer.correct}
                   onClick={(e) => props.choseCorrectRadio(props.index, e)}/>
            <Form.Control type="text"
                          placeholder={props.placeHolderText}
                          value={props.answer.content}
                          name="answer"
                          onChange={(e) => props.answerChange(props.index, e)}/>
        </div>
    )
}

