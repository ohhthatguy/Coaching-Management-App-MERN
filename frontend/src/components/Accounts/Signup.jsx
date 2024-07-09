import { useState,useEffect,useContext } from "react"
import {Paper, Button,Grid, Box,styled,Checkbox, Radio, RadioGroup, FormGroup, FormControlLabel, TextField, FormLabel} from "@mui/material"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"
import { API } from "../../services/Api"


const StyledPaper = styled(Paper)`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    
    padding: 2rem;
   
    gap: 2rem;
    
`



const Signup = ()=>{
    const navigate = useNavigate()


        const initial = {
            category: '',
            shift: [],
            name: '',
            email: '',
            password: '',
            date: Date.now()
        }

        const [signUpData, setSignUpData] = useState(initial)
        const [shiftInput, setShiftInput] = useState([])
   
        const handleInput =(e)=>{
        
            if(e.target.type !== undefined){
            setSignUpData({...signUpData, [e.target.name]: e.target.value})
            }

            // console.log(signUpData)
        }
       

        const handleShift = (e)=>{

        
            if( e.target.type == 'checkbox'){

                (e.target.checked) ? setShiftInput((prev)=>[...prev, e.target?.value]) : setShiftInput((prev)=>prev.filter((item)=> (item !== e.target.value)))   
  
            }
            // console.log(shiftInput)     

        }

        useEffect(()=>{
            setSignUpData({...signUpData, shift: [...shiftInput]})
            // console.log(`shiftInpiut: ${shiftInput}`)

        },[shiftInput])

        const handleClick =async()=>{
            // console.log(signUpData)
            
            try{
                let response = await API.createNewAccount(signUpData)
                if(!response.isSuccess){
                    console.log("Server has sent data to frontend but some eroor in frntend")
                }else{
                    console.log("data saved")
             
                    navigate('/')

                }
                

            }catch(err){
                console.log("ERROR: ", err)
            }
          

        }

        // console.log(`shift: ${signUpData.shift}`)
    return (<>
        <Header />
        <Grid container style={{marginTop: '8rem', border: '1px solid black' }}>

            <Grid style={{margin: "auto"}} item>

            <StyledPaper >


            <Box>
                <FormLabel>Category</FormLabel>
                
                <RadioGroup row >
                    <FormControlLabel  value='Teacher' name="category" onClick={(e)=> handleInput(e)} control={<Radio />} label="Teacher" />
                    <FormControlLabel value='Student' name="category" onClick={(e)=> handleInput(e)} control={<Radio />} label="Student" />
                </RadioGroup>
                
            </Box>



            <Box>
                <FormLabel> Shift</FormLabel>
                
                <FormGroup row>
                    <FormControlLabel name="shift"  value="Morning" onClick={(e)=> handleShift(e)} control={<Checkbox  />} label="Morning" />
                    <FormControlLabel name="shift" value="Afternoon" onClick={(e)=> handleShift(e)} control={<Checkbox  />} label="Afternoon" />
                    <FormControlLabel name="shift" value="Evening" onClick={(e)=> handleShift(e)} control={<Checkbox />} label="Evening" />
                </FormGroup>

            </Box>


                <TextField label='Full Name' name="name" onChange={(e)=> handleInput(e)} variant="standard" required />         
                
                <TextField label='Email' name='email' onChange={(e)=> handleInput(e)} variant="standard" required />   

                <TextField label='Password'  name='password' onChange={(e)=> handleInput(e)} type="password" required variant="standard" /> 
                        
                <Button variant="contained" disabled={ (signUpData.name && signUpData.email && signUpData.category &&signUpData.password && signUpData.shift.length >0) ? false : true } onClick={()=> handleClick()}>signup</Button>
                
    
            </StyledPaper>   
            </Grid>    
            </Grid>
    
    
        </>)


}

export default Signup