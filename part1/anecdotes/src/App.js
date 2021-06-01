import React, { useState } from "react"

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code Anecounts for the first 90 percent of the development time...The remaining 10 percent of the code Anecounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

const Heading = (props) => <h2>{props.text}</h2>

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}<br />
      has {props.votes} votes</p>
    </div>
  )
}

const MostVotes = (props) => {
  return (
    <div>
      <Heading text="Anecdote with Most Votes" />
      {!props.hasVotes && <>No anecdotes have been voted on yet.</>}
      {props.hasVotes && (
        <Anecdote anecdote={props.anecdote} votes={props.votes} />
      )}
    </div>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [hasVotes, setHasVotes] = useState(false)

  const Randoms = (length) => {
    return Math.floor(Math.random() * length)
  }

  const next_Anecdote = () => {
    let random_Anecdote_num;

    do {
      random_Anecdote_num = Randoms(anecdotes.length)
    } 
    while (random_Anecdote_num === selected)

    setSelected(random_Anecdote_num)
  }

  const incrementVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1;
    setVotes(newVotes)
    setHasVotes(true)
  }

  const Click_Button = (type) => {
    switch (type) {
      case "next":
        next_Anecdote();
        break;
      case "vote":
        incrementVote();
        break;
      default:
        break;
    }
  }

  const Votes_gained = votes.reduce(
    (Anec, number, Anc_num) => {
      if (number > Anec.number) {
        Anec.number = number;
        Anec.Anc_num = Anc_num;
      }

      return Anec;
    },
    { number: 0 }
  )

  const max_votes = anecdotes[Votes_gained.Anc_num]

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={() => Click_Button("vote")} text="vote" />
      <Button onClick={() => Click_Button("next")} text="next anecdote" />
      <MostVotes hasVotes={hasVotes} anecdote={max_votes} votes={Votes_gained.number} />
    </div>
  )
}

export default App