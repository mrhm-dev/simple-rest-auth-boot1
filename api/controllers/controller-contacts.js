const Contact = require('../models/Contact')

const getContactsController = (req, res, next) => {

    Contact.find()
        .then(contacts => {
            if (contacts.length > 0) {

                res.status(200).json({
                    contacts
                })

            } else {
                res.status(200).json({
                    message: 'There is No Data'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })

}

const postContactController = (req, res, next) => {

    const contact = new Contact({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email || null
    })

    contact.save()
        .then(contacts => {
            console.log(contacts)
            res.status(201).json(contacts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
}

const getSingleContact = (req, res, next) => {
    const id = req.params.id

    Contact.findById(id)
        .then(contact => {
            console.log(contact)
            res.send(contact)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const patchContact = (req, res, next) => {

    const id = req.params.id
    // const updateObject = {}

    // for (let prop in req.body) {
    //     updateObject[prop] = req.body[prop]
    // }

    Contact.findByIdAndUpdate(id, {$set: req.body})
        .then(contact => {
            console.log(contact)
            res.json(contact)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })

}

module.exports = {
    postContactController,
    getContactsController,
    getSingleContact,
    patchContact
}