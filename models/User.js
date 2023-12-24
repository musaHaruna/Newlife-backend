const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },

  fullName: {
    type: String,
    required: [true, 'Please provide full name'],
  },
  phone: {
    type: String,
    // You may want to add additional validation for phone numbers
  },
  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
  },
  levelOfEducation: {
    type: String,
    enum: [
      'No previous qualification',
      'High school/ SSCE',
      'College/ Diploma',
      'BSc',
      'MSc',
      'PhD',
    ],
    required: [true, 'Please provide a valid level of education'],
  },
  dateOfBirth: {
    type: Date,
    // You can add additional validation for date of birth
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Please provide a valid gender'],
  },
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}






module.exports = mongoose.model('User', UserSchema)
