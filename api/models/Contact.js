const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const ContactSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    }, 
    phoneNo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^(?:\+88|01)?(?:\d{11}|\d{13})$/.test(v)
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message: '{VALUE} is not a valid Email!'
        }
    }

})
// Name - String - required - trim - minlength - maxlength
// PhoneNo - String - required - trim - validor - unique
// Email - String - trim - validor - minlength
// 

const Contact = mongoose.model('Contact', ContactSchema)
module.exports = Contact