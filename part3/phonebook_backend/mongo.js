// const mongoose = require('mongoose')
//
// // const url = process.env.MONGODB_URL
//
// if(process.argv.length < 3){
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }
//
// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]
//
// const url =
//   `mongodb://fullstack:${password}@cluster0-shard-00-00.twkpi.mongodb.net:27017,cluster0-shard-00-01.twkpi.mongodb.net:27017,cluster0-shard-00-02.twkpi.mongodb.net:27017/phonebook-app?ssl=true&replicaSet=atlas-yhi6z9-shard-0&authSource=admin&retryWrites=true&w=majority`
//
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String
// })
//
// const Person = mongoose.model('Person', personSchema)
//
// const newPerson = new Person({
//   name: name,
//   number: number
// })
//
//
// if (process.argv.length === 5){
//   newPerson.save().then(result => {
//     console.log('person saved!')
//     mongoose.connection.close()
//   })
// }
//
// if (process.argv.length === 3){
//   Person.find({}).then(result =>{
//     result.forEach(phoneBook =>{
//       console.log(phoneBook)
//     })
//     mongoose.connection.close()
//   })
// }
