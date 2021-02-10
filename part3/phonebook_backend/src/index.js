import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'

const url = '/api/persons'

const promise = axios.get(url)
console.log(promise)

promise.then(response => {
  console.log(response)
 })


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
