const express = require('express')
const router = express.Router()

const userController = require('../controllers/controller-users')

router.post('/signup', userController.signupController)

router.post('/signin', (req, res, next) => {

})

module.exports = router