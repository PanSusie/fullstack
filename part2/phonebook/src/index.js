import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)

promise.then(response => {
  console.log(response)
})

axios.get('http://localhost:3001/persons').then(response => {
  const persons = response.data
  console.log(persons)
  ReactDOM.render(
    <App persons={persons}/>,
    document.getElementById('root')
  )
})
