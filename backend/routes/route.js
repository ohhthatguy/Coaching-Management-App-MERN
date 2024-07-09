const express = require('express')
const router = express()


//import from controller
const {createNewAccount, checkLogIn} = require('../controller/controller')

//create a new account
router.post('/create/newAccount', createNewAccount)

//login
router.post('/login', checkLogIn)


module.exports = router