import React from 'react'

const Course = ({course}) =>(
    <div>
    <Header course={course}/>
    <Part part={course.parts}/>
    <Total part={course.parts}/>
    </div>
)

const Header = ({course}) => (<h2> {course.name}</h2>)

const Part = ({part}) => (
    <div>
    {part.map(part => <p key={part.id}> {part.name} {part.exercises}</p>)}
    </div>
)

const Total = ({part}) => {
  const total = part.reduce((sum, part) => sum + part.exercises,0)
  return(
    <b>total of {total} exercises</b>
  )
}


export default Course
