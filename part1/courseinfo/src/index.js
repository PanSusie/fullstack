import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
    <h1>
     {props.course}
     </h1>
     </div>
   )
}

const Content = (props) => {
  const part1 = props.parts[0];
  const part2 = props.parts[1];
  const part3 = props.parts[2];

  return(
    <div>
    <Part part={part1.name} exercise={part1.exercises}/>
    <Part part={part2.name} exercise={part2.exercises}/>
    <Part part={part3.name} exercise={part3.exercises}/>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
    <p>
    {props.part} {props.exercise}
    </p>
    </div>
  )
}

const Total = (props) => {
  const exercises1 = props.parts[0].exercises;
  const exercises2 = props.parts[1].exercises;
  const exercises3 = props.parts[2].exercises;

  return(
    <div>
    <p>
    {exercises1 + exercises2 + exercises3}
    </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
  ]
}

  return (
    <div>
    <Header course = {course.name}/>
    <Content parts = {course.parts}/>
    <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
