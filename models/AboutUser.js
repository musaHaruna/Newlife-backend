const mongoose = require('mongoose')
const AboutUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  aboutText: {
    type: String,
    required: [true, 'Please provide about text'],
  },
})
module.exports = mongoose.model('AboutUser', AboutUserSchema)
