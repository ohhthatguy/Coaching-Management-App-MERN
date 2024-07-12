const AccountModel = require('../model/account')
const AssignmentModel = require("../model/assignment")
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

const getAllAssignment = async(req,res)=>{
    // console.log("inside funciton get all assignment")
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


module.exports = {createNewAccount, checkLogIn, saveAssignmentImage,getUploadedImage, createNewAssignment, getAllAssignment, getAssignmentById}