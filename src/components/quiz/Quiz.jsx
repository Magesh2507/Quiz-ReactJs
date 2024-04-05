import React, { useState } from 'react'
import './quiz.css'
import { useEffect } from 'react';

const quizdata = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java",
            "C",
            "Python",
            "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "CSS used to ___ the web page?",
        options: ["Style",
            "Create",
            "Layout",
            "Change"],
        answer: "Style"
    },
    {
        question: "What is the most popular Javascript Library?",
        options: ["JQuery",
            "Vue",
            "React",
            "None of the above"],
        answer: "React"
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996",
            "1995",
            "1994",
            "none of the above"],
        answer: "1995"
    }];


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [timer, setTimer] = useState(10)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)

    const checkAnswer = (value, answer) => {
        if (value == answer) {
            setScore(pre => pre + 1)             
        }        
        if (currentQuestion < quizdata.length-1 ) {
            setCurrentQuestion(pre => pre + 1)
            setTimer(10)
            
        }       
        else{
            setShowResult(true)
        }
    }

    const restart = () =>{
        setCurrentQuestion(0)
        setScore(0)
        setShowResult(false)
        setTimer(10)        
    }

    useEffect(()=>{
        let interval;
        if(!showResult && timer){
            interval = setInterval(()=>{
                setTimer(pre =>pre - 1)
            },1000)
        }
        else if (!timer && currentQuestion === quizdata.length-1){
            setShowResult(true)            
        }
        else{
            setCurrentQuestion(pre => pre + 1)
            setTimer(10)
        }
        return () =>{
            clearInterval(interval)
        }
    },[timer, showResult])

    return (
        <div className='container'>
            {showResult ? (<div className='result-container'>
                <h3>Your Score is <span className='score'>{score}/{quizdata.length}</span></h3>
                <div>
                    <button className='restart-btn' onClick={()=> restart()}>Restart</button>
                </div>
            </div>) : (<>
                <h3 className='question'>Question - {currentQuestion + 1}</h3>
                <p>{quizdata[currentQuestion].question}</p>
                <div className='btn-container'>
                    {quizdata[currentQuestion].options.map((option, index) =>
                        <button key={index} onClick={() => checkAnswer(option, quizdata[currentQuestion].answer)}>{option}</button>)}
                </div>
                <div className='timer'>
                    <p >Time Left : <span>{timer}s</span></p>
                </div></>)}
        </div>
    )
}

export default Quiz