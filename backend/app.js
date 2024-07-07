const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017/PROJECT1')
const userModel = require('./model/userModel')


app.use(cors())
app.use(express.json())

const userData = require('./Routes/userLogIn')

// app.use('/userData', userData)

app.get('/userData/data', async(req,res)=>{
    const userData = await userModel.find({})
    // const userData = res.body
 
    try{
     res.status(200).json({
         status: 'sucess',
         data: userData
     })
    }catch (err){
     res.status(500).json({
         status:'failed',
         data: err
     })
    }
 })

app.post('/userData/post', async(req,res)=>{
    const userData = new userModel(req.body)

    try{
        await userData.save()
        res.status(200).json({
            status: 'sucessfully saved'
        })
    }catch (err){
        res.status(500).json({
            status: 'failed to post'
        })
    }
})


app.listen(2000, ()=>{
    console.log("server is running at port 2000")
})