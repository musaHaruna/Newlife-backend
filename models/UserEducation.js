const mongoose = require('mongoose')
const EducationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: [true, 'Please provide school name'],
  },
  degree: {
    type: String,
    required: [true, 'Please provide degree'],
  },
  fieldOfStudy: {
    type: String,
    required: [true, 'Please provide course/field of study'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date or expected graduation date'],
  },
  country: {
    type: String,
    required: [true, 'Please provide country'],
  },
  city: {
    type: String,
    required: [true, 'Please provide city'],
  },
})

module.exports = mongoose.model('Education', EducationSchema)
