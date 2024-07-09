const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    shift: [{
        type: String,
        required: true
    }],
    date: {type: Date, required: true}
})

const AccountModel = mongoose.model('account', AccountSchema)
module.exports = AccountModel