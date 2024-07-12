const express = require('express')
const router = express()


//middleware
const teacherAssignUpload = require('../Middleware/teacherAssignUpload')


///////////////////////////////


//import from controller
const {createNewAccount,saveAssignmentImage, checkLogIn, getUploadedImage, createNewAssignment, getAllAssignment, getAssignmentById} = require('../controller/controller')

//create a new account
router.post('/create/newAccount', createNewAccount)

//login
router.post('/login', checkLogIn)

//save Assignment image(s)
router.post('/save/image', teacherAssignUpload.array('image') ,saveAssignmentImage)

//get Assignmnet image(s)
router.get('/file/:filename', getUploadedImage)

//create a new assignment
router.post('/save/Assignment', createNewAssignment)

//get all assignmnets
router.get('/class', getAllAssignment);

//get assignemnts by id
router.get('/class/assignment', getAssignmentById)


module.exports = router