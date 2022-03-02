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
    const changePoints = (pointsToAdd) => {
        setPoints(points + pointsToAdd);
    }
    const setQuestions = (array) => {
        setEndExamQuestions(array);
    }
    const checkAnswers = (array, questionArray) => {
        //dodac correct=true dla konkretnego selected true
        //seleted true i id correct=false
        console.log("ILOSC PYTANI W EXAMPAGE", questionArray.length, questionArray)
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
                table.forEach((item) => {
                    var question = questionArray.find((q) => q.question.id == item.question_id);
                    if (item.answer === true)
                        question.question.answers.map((a) => a.selected ? a.correct = true : a.correct = false)
                    else
                        question.question.answers.map((a) => a.id === item.answer ? a.correct = true : a.correct = false)
                    newArray.push(question);
                })
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
                <Exam changePoints={changePoints} changeTab={changeTab} setQuestions={setQuestions}
                      checkAnswers={checkAnswers}/>}
            {currentTab === "End" &&
                <EndScreen points={points} changeTab={changeTab} questionArray={endExamQuestions}/>}
        </div>

    )
}