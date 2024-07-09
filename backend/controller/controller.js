const AccountModel = require('../model/account')



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


module.exports = {createNewAccount, checkLogIn}