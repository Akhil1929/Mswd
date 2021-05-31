import React, { useState } from "react";

const Heading = (props) => <h1>{props.text}</h1>;


const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Strict = (props) => {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.value}</td>
      </tr>
    )
  }

const Statistics = (props) =>{
    if (!props.hasFeedback) {
        return <p>No feedback given</p>
    }

    return(
        <div>
            <h1>statistics</h1>
            <table>
                <Strict name="good" value={props.good} />

                <Strict name="neutral" value={props.neutral} />

                <Strict name="bad" value={props.bad} />

                <Strict name="all" value={props.total}/>

                <Strict name="average" value={props.average}/>

                <Strict name="positive" value={props.Positive_percent+"%"}/>

            </table>
        </div>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [hasFeedback, setHasFeedback] = useState(false)


    const total = good + neutral + bad

    const getPercent = (x, totalAmount) => {
        let result = (x / totalAmount) * 100;
    
        if (Number.isNaN(result)) return 0
    
            return Math.round(result * 1000) / 1000
    }
    
    const Positive_percent = getPercent(good, total);
    
    const getWeightedAvg = (weightsArr, total) => {
        const weights = weightsArr.reduce((acc, item) => {
            return acc + item.number * item.weight;
        }, 0)
    
        let result = weights / total;
    
        if (Number.isNaN(result)) return 0;
    
        return Math.round(result * 1000) / 1000;
    }
    
    const average = getWeightedAvg(
        [
          { number: good, weight: 1 },
          { number: neutral, weight: 0 },
          { number: bad, weight: -1 },
        ],
        total
    )


    const Click_Buttom = (type) => {
        setHasFeedback(true)
    
        switch (type) {
            case "good":
                setGood(good + 1)
                break;
            case "neutral":
                setNeutral(neutral + 1)
                break;
            case "bad":
                setBad(bad + 1)
                break;
            default:
                break;
        }
    }

    const  Statistics_val = {
        hasFeedback: hasFeedback,
        good: good,
        neutral: neutral,
        bad: bad,
        total: total,
        average: average,
        Positive_percent: Positive_percent,
    }

    return (
        <div>
            <Heading text="give feedback" />
            <Button onClick={() => Click_Buttom("good")} text="good" />
            <Button onClick={() => Click_Buttom("neutral")} text="neutral" />
            <Button onClick={() => Click_Buttom("bad")} text="bad" />
            <Statistics {...Statistics_val}/>
        </div>
    );
};



export default App