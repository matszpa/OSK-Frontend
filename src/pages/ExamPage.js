import {useEffect, useState} from "react";
import {StartExam} from "../components/ExamComponents/StartExam";
import {Exam} from "../components/ExamComponents/Exam";
import {EndScreen} from "../components/ExamComponents/EndScreen";

export const ExamPage = () => {
    const [currentTab, setCurrentTab] = useState("Start");
    const [points, setPoints] = useState(0);
    const [endExamQuestions, setEndExamQuestions] = useState([])
    useEffect(() => {

    }, [setEndExamQuestions])


    const changeTab = (tab) => {
        setCurrentTab(tab);
    }
    const setQuestions = (array) => {
        setEndExamQuestions(array);
    }
    const checkAnswers = (array, questionArray) => {
        fetch("http://localhost:8000/checkExam", {
            method: "POST",
            body: JSON.stringify(array),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((table) => {
                var newArray = [];
                var examPoints = 0;
                table.forEach((item) => {
                    var question = questionArray.find((q) => q.question.id === item.question_id);
                    var questionPoints = question.question.points;
                    if (item.answer === true) {
                        examPoints += questionPoints;
                        question.question.answers.map((a) => a.selected ? a.correct = true : a.correct = false)
                    } else
                        question.question.answers.map((a) => a.id === item.answer ? a.correct = true : a.correct = false)
                    newArray.push(question);
                })
                setPoints(examPoints)
                setEndExamQuestions(newArray)
            }).then(() => {
            changeTab("End")
        })

    }

    return (
        <div style={{
            width: "80%",
            margin: "auto"
        }}>
            {currentTab === "Start" && <StartExam changeTab={changeTab}/>}
            {currentTab === "StartExam" &&
                <Exam changeTab={changeTab} setQuestions={setQuestions}
                      checkAnswers={checkAnswers}/>}
            {currentTab === "End" &&
                <EndScreen points={points} changeTab={changeTab} questionArray={endExamQuestions}/>}
        </div>

    )
}