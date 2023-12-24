const User = require('../models/User')
const AboutUser = require('../models/AboutUser')
const Education = require('../models/UserEducation')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId // Assuming your route has a parameter named userId

    const user = await User.findById(userId)

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
    }

    const userData = { ...user.toObject() }
    delete userData.password

    res.status(StatusCodes.OK).json(userData)
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId // Assuming your route has a parameter named userId

    // Ensure the user making the request is the same as the user being updated

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    })

    if (!updatedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
    }

    const userData = { ...updatedUser.toObject() }
    delete userData.password

    res.status(StatusCodes.OK).json(userData)
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
const createOrUpdateAbout = async (req, res) => {
  try {
    const userId = req.params.userId

    // Check if the user with the given userId exists
    const user = await User.findById(userId)

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
    }

    // Assuming the request body contains a field named 'aboutText'
    const { aboutText } = req.body

    // Create or update the AboutUser document associated with the user
    let aboutUser = await AboutUser.findOne({ user: userId })

    if (!aboutUser) {
      // If AboutUser document doesn't exist, create a new one
      aboutUser = new AboutUser({
        user: userId,
        aboutText,
      })
    } else {
      // If AboutUser document exists, update the aboutText field
      aboutUser.aboutText = aboutText
    }

    // Save the AboutUser document
    await aboutUser.save()

    // Respond with the updated user data
    // const userData = { ...user.toObject() }
    // delete userData.password

    res.status(StatusCodes.OK).json(aboutUser)
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

const getAbout = async (req, res) => {
  try {
    const userId = req.params.userId

    // Check if the user with the given userId exists
    const user = await User.findById(userId)

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
    }

    // Find the AboutUser document associated with the user
    const aboutUser = await AboutUser.findOne({ user: userId })

    if (!aboutUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'About not found' })
    }

    // Respond with the about information
    const aboutData = {
      aboutText: aboutUser.aboutText,
    }

    res.status(StatusCodes.OK).json(aboutData)
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

const addEducation = async (req, res) => {
  try {
    const userId = req.params.userId

    // Check if the user with the given userId exists
    const userExists = await User.exists({ _id: userId })

    if (!userExists) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
    }

    // Add the user reference to the education record
    const educationRecord = {
      user: userId,
      ...req.body,
    }

    // Insert the education record into the database
    const addedEducation = await Education.create(educationRecord)

    res.status(StatusCodes.CREATED).json(addedEducation)
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

const getAllEducation = async (req, res) => {
  try {
    const userId = req.params.userId

    // Check if the user with the given userId exists
    const userExists = await User.exists({ _id: userId })

    if (!userExists) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
    }

    // Retrieve all education records for the user
    const educationRecords = await Education.find({ user: userId })
    console.log(educationRecords)

    res.status(StatusCodes.OK).json(educationRecords)
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
module.exports = {
  getProfile,
  updateProfile,
  createOrUpdateAbout,
  getAbout,
  addEducation,
  getAllEducation,
}
