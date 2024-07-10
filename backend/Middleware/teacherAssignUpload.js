
const dotenv = require('dotenv').config()
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')

// console.log(process.env.DB_URL);

const storage = new GridFsStorage({
    
    url: process.env.DB_URL,
    file: (req,file)=>{
        // console.log(file.originalname)
        const match = ['image/png', 'image/jpg', 'image/jpeg']
        if(match.indexOf(file.mimetype) == -1){
            return `${Date.now()}-image-${file.originalname}`
        }

        return {
            bucketName: 'image',
            filename: `${Date.now()}-image-${file.originalname}`
        }
    }
})

const teacherAssignUpload = multer({storage})
module.exports = teacherAssignUpload