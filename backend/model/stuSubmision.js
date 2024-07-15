const mongoose = require('mongoose')

const studentSubmissionSchema = mongoose.Schema({
    student: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
     text: {
        type: String,
        
    },
    files: [{
        type: String
        
    }],
    date: {
        required: true,
        type: String
    },
    assignmentId:{
        required: true,
        type:String
    }
})

const studentSubmissionModel = mongoose.model('submissions', studentSubmissionSchema)
module.exports = studentSubmissionModel