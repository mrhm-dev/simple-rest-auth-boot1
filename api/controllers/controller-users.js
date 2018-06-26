const User = require('../models/User')
const bcrypt = require('bcrypt')

const signupController = (req, res, next) => {

    User.find({email: req.body.email})
        .then(result => {
            if (result.length > 0) {
                res.json({
                    messaage: 'Signup Failed. Email Alreaady Exist'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            messaage: 'Hash Failed',
                            error: err
                        })
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        })
            
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.json({
                                    messaage: 'User created successfully. Now you can login',
                                    user: result
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.json({
                                    messaage: 'User not created'
                                })
                            })
                    }
                })
            }
        })

    
}

module.exports = {
    signupController
}