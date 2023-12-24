const express = require('express')
const router = express.Router()
const {
  getProfile,
  updateProfile,
  createOrUpdateAbout,
  getAbout,
  addEducation,
  getAllEducation,
} = require('../controllers/userProfile')
router.get('/details/:userId', getProfile)
router.patch('/details/:userId', updateProfile)
router.patch('/about/:userId', createOrUpdateAbout)
router.get('/about/:userId', getAbout)
router.post('/education/:userId', addEducation)
router.get('/education/:userId', getAllEducation)

module.exports = router
