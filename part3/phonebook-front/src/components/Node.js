import React from 'react'


const Filter = ({value, onChange}) => (
  <Input label='filter shown with:' value={value} onChange={onChange}/>
)

const Input = ({label, value, onChange}) => (
  <div>{label}<input value={value} onChange={onChange}/></div>
)

const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <Input label='name:' value={props.newName} onChange={props.handleNameChange}/>
    <Input label='number:' value={props.newNumber} onChange={props.handleNumberChange} />
    <button type="submit" >add</button>
  </form>
)

const Persons = ({person, onClick}) => (
  <div>
  <form onClick={onClick}>
  <p key={person.id}> {person.name} {person.number}
  <button type='button' value={person.id}>delete</button>
  </p>
  </form>
  </div>
)

export {Filter, PersonForm, Persons}
