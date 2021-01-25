import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick,text}) => (
  <button onClick={onClick}>
  {text}
  </button>
)

const Statistics = ({text, results}) => (
    <tr>
    <td>{text}</td>
    <td>{results}</td>
    </tr>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const countGood = () => {
    setGood(good+1)
    setTotal(total+1)
  }

  const countNeutral = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
  }

  const countBad = () => {
    setBad(bad+1)
    setTotal(total+1)
  }

  if (total !== 0){
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={countGood} text='good'/>
      <Button onClick={countNeutral} text='neutral'/>
      <Button onClick={countBad} text='bad'/>
      <h1>statistics</h1>
      <table>
      <Statistics text='good' results={good}/>
      <Statistics text='neutral' results={neutral}/>
      <Statistics text='bad' results={bad}/>
      <Statistics text='all' results={total}/>
      <Statistics text='average' results={(good-bad)/total}/>
      <Statistics text='positive' results={good/total+'%'}/>
      </table>
    </div>
    )
  }else{
  return(
    <div>
      <h1>give feedback</h1>
      <Button onClick={countGood} text='good'/>
      <Button onClick={countNeutral} text='neutral'/>
      <Button onClick={countBad} text='bad'/>
      <h1>statistics</h1>
      <p>No feedback Given</p>
    </div>
    )
  }
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
