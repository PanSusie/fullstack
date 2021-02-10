require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('content', (request) => (
  JSON.stringify(request.body)
))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


// get all persons
app.get('/api/persons/',(request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info',(request,response) => {
  const countPersons = phoneBook.length
  const date = new Date()
  response.write(`<p>Phonebook has info for ${countPersons} people<p>`)
  response.write(`${date}`)
  response.end()
})



app.get('/api/persons/:id',(request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id',(request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons',(request, response, next) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'The name or number is missing'
    })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })


  newPerson.save()
    .then(savedPerson => (response.json(savedPerson)))
  // .then(savedAndFormattedPerson => {
  //   response.json(savedAndFormattedPerson)
  // })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new:true })
    .then(updated => {
      response.json(updated)
      console.log(updated)
    })
    .catch(error => next(error))

})


//Express error handler middleware
const errorHandler = (error, request, response, next) => {
  //console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
