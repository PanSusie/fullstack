const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'at least 3 characters long']
  },
  name: String,
  password: {
    type: String,
    required: true,
    minlength: [3, 'at least 3 characters long']
  },
  blogs: [                        //The ids of the notes are stored as an array of Mongo ids
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }
  ]
})

//userSchema.index({ username: 1}, { unique: true});
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})


module.exports = mongoose.model('User', userSchema)
