const express = require('express')
const router = express.Router()
const contactController = require('../controllers/controller-contacts')

// Get All Contacts
router.get('/', contactController.getContactsController)

// Post a New Contact
router.post('/', contactController.postContactController)

router.get('/:id', contactController.getSingleContact)

router.patch('/:id', contactController.patchContact)

router.delete('/', (req, res, next) => {
    
})

module.exports = router