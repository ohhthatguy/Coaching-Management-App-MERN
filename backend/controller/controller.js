const AccountModel = require('../model/account')
const AssignmentModel = require("../model/assignment")
const studentSubmissionModel  = require("../model/stuSubmision")
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')



const createNewAccount = async(req,res)=>{

        try{
            let response = new AccountModel(req.body)
            let data = await response.save()
            return res.status(200).json({msg: 'data save sucesfully'})

        }catch(err){
            return res.status(500).json({msg: 'data did not save sucesfully. ERROR: ', err})

        }


}

const checkLogIn = async(req,res)=>{
    
    try{
        const response = await AccountModel.findOne({email: req.body.email})

        if(!response){
            return res.status(404).json({msg: "there is no account with such email."})
        }

        // console.log(response)
        if(response.password == req.body.password){
            return res.status(200).json(response)
        }else{
            return res.status(401).json({msg: "INVALID PASSWORD"})

        }
      


    }catch(err){
        return res.status(500).json({msg: "some error occured. ERROR: ", err})
    }
}

const saveAssignmentImage = (req,res)=>{

    if(!req.files){
        return res.status(404).json({msg: "no files were found to upload"})
    }

    let endPoints = [];
    req.files.map((e)=>{
        endPoints = [...endPoints,`http://localhost:6969/file/${e.filename}`]
    })

    return res.status(200).json(endPoints)

}


//////////////////////////////////////////////
let gfs, gridfsbucket
const conn = mongoose.connection

conn.once('open',()=>{
    gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'image'
    })
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('image')
})

const getUploadedImage = async(req,res)=>{
    const filename = req.params.filename

    try{
        const file = await gfs.files.findOne({filename: filename})
        const readStream = gridfsbucket.openDownloadStream(file._id);
        readStream.pipe(res);

    }catch(err){
        return res.status(500).json({msg: `photo's been uploaded but fetching  is showing error.`, err})

    }


}
//////////////////////////////////////////////


const createNewAssignment = async(req,res)=>{

    try{

        const data = new AssignmentModel(req.body)
        const response = await data.save()

        return res.status(200).json({msg: 'data save sucesfully'})

        }catch(err){
            return res.status(500).json({msg: 'data did not save sucesfully. ERROR: ', err})

        }

}

//for teacher
const getAllAssignment = async(req,res)=>{
    // console.log("inside funciton get all assignment")
    // console.log(req.query)

    req.query.shift = req.query.shift.split(',')
    // console.log(req.query)

    try{

     
            const data = await AssignmentModel.find(req.query)
        
        if(!data){
            return res.status(404).json({msg: "There are no assignments"})
        }

        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({msg: "some error occured while fetching aassignments. ERROR: ", err})
    }
}
//for student
const getAllAssignmentStu = async(req,res)=>{
    try{

        const data = await AssignmentModel.find(req.query)
        if(!data){
            return res.status(404).json({msg: "There are no assignments"})
        }

        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({msg: "some error occured while fetching aassignments. ERROR: ", err})
    }
}

const getAssignmentById = async(req,res)=>{

    // console.log(req.query)
    // console.log("im in assignment id func.")

    try{

        let response = await AssignmentModel.find(req.query)
        if(!response){
            return res.status(404).json({msg: 'no assignemnt were found'})
        }

        return res.status(200).json(response)


    }catch(err){
        return res.status(500).json({msg: 'ERROR IN BACKEND IN FETCHING DATA. ERROR: ', err})

    }

}

const updateAssignment = async(req,res)=>{
    // console.log(req.body)

    try{
        await AssignmentModel.findByIdAndUpdate(req.body._id, {
            $set: req.body
        })
        return res.status(200).json({msg: "assignment successfully updated!"})
    }catch(err){
        return res.status(500).json({err: err})
    }
}

const deleteAssignment = async(req,res)=>{
    // console.log(req.body)

    try{
        await AssignmentModel.deleteOne({_id: req.body._id})
        return res.status(200).json({msg: "assignment successfully deleted!"})
    }catch(err){
        return res.status(500).json({err: err})
    }a
}

const saveStudentAssignmentSubmission = async(req,res)=>{
    try{
        let response = new studentSubmissionModel(req.body)
        const data = await response.save() 
        return res.status(200).json({msg: 'data save sucesfully'})

    }catch(err){
        return res.status(500).json({msg: 'data did not save sucesfully. ERROR: ', err})

    }
}



const getStuTeachList = async(req,res)=>{
    // const shift = req.body;
    const account = req.query
    // console.log(account.account)


    try{
        if(account.account.category === 'Student'){
           
                let response = await AccountModel.find( { shift: { $in: account.account.shift },category: 'Teacher' })
                if(!response){
                    return res.status(404).json({msg: "therr is no data in this shift"})
                }
                return res.status(200).json(response)


        }else if(account.account.category === 'Teacher'){
            let response = await AccountModel.find( { shift: { $in: account.account.shift },category: 'Student' })
            if(!response){
                return res.status(404).json({msg: "therr is no data in this shift"})
            }
            return res.status(200).json(response)
        }
    }catch(err){
        return res.status(500).json({err: err})
        
    }
   

}

const getStudentAssignmentSubmission = async(req,res)=>{
    try{

        const data = await studentSubmissionModel.find(req.query)
        if(!data){
            return res.status(404).json({msg: "There are no assignments submissions"})
        }

        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({msg: "some error occured while fetching aassignments submission. ERROR: ", err})
    }
}


module.exports = {createNewAccount,getStudentAssignmentSubmission, getStuTeachList, saveStudentAssignmentSubmission,getAllAssignmentStu,updateAssignment, checkLogIn, saveAssignmentImage,getUploadedImage, createNewAssignment, getAllAssignment, getAssignmentById, deleteAssignment}