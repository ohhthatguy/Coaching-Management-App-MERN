const mongoose = require('mongoose')

const AssignmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: [{
        type: String,
       
    }],
    date: {
        type: Date,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    
})

const AssignmentModel = mongoose.model('Assignment', AssignmentSchema)
module.exports = AssignmentModel