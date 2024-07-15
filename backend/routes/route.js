const express = require('express')
const router = express()


//middleware
const teacherAssignUpload = require('../Middleware/teacherAssignUpload')


///////////////////////////////


//import from controller
const {createNewAccount,saveAssignmentImage, saveStudentAssignmentSubmission,updateAssignment, getAllAssignmentStu, checkLogIn, getUploadedImage, createNewAssignment, getAllAssignment, getAssignmentById, deleteAssignment} = require('../controller/controller')

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

//get all for teacher assignmnets
router.get('/class', getAllAssignment);

//get all for student assignmnets
router.get('/class', getAllAssignmentStu );

//get assignemnts by id
router.get('/class/assignment', getAssignmentById)

//update assignemnt 
router.put('/class/assignment/update', updateAssignment)

//delete assignent
router.delete('/class/assignment/delete', deleteAssignment)

//save assignemnt done by student
router.post('/save/student/assignment', saveStudentAssignmentSubmission)


module.exports = router