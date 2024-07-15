import {useState, useEffect, useContext} from 'react'
import Header from "../Header/Header"
import { Box,Card, CardActions, Button , CardHeader,CardContent, Grid, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import {Create, AddCircle, Delete} from '@mui/icons-material';

import { API } from '../../services/Api';
import { DataContext } from '../../context/DataProvider';
import Image from './Image';


const Class = ()=>{
    const {assignmentListUpdated,setAssignmentListUpdated, account} = useContext(DataContext)

    const navigate = useNavigate()

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const shift = queryParams.get('shift');
    const category = queryParams.get('category');
    const name = queryParams.get('name');
    const email = queryParams.get('email');

    const handleAssignmentCard = (e)=>{
        // console.log(e)
        navigate(`/class/assignment/?id=${e._id}`)
    }


    const navigateToAssignment = ()=>{
        const query = new URLSearchParams()

        // console.log(e)
        query.append('shift', shift)
        query.append('name', name)

        const queryString = query.toString()
        navigate(`/create/assignment?${queryString}`)
    }

    const [assignments , setAssignments] = useState([]);

    useEffect(()=>{
        
        const getAllAssignment = async()=>{

            // console.log(email)

            try{
                // let response = await API.getAllAssignment({email: email});

                if(category === 'Teacher'){

                    let response = await API.getAllAssignment({email: email, shift: shift});
                        if(!response.data){
                            console.log("there is no data returned by server")
                        }else{
                            // console.log(response.data)
                            setAssignments([...response.data])
                        }
                }else if(category === 'Student'){
                    console.log("im here")
                    let response = await API.getAllAssignment({shift: shift});
                        if(!response.data){
                            console.log("there is no data returned by server")
                        }else{
                            // console.log(response.data)
                            setAssignments([...response.data])
                        }

                }

            }catch(err){
                console.log("SOME ERORR HAPPEEND IN FONTEND WHILE HANDLING ASSIGNMENT FETCHING. ERROR: ",err)

            }
        }

        getAllAssignment()


    },[assignmentListUpdated])


  console.log(assignments)

const handleSubmissionStu = (id)=>{
    console.log("sbumit submission")
    if(assignments){
        navigate(`/assignment/submit?shift=${shift}&category=${category}&name=${name}&email=${email}&id=${id}`)

    }
}

    const handleEdit =(e)=>{
        console.log("handle edit", e)
        // navigate(`/update/assignment?id=${e._id}`)
        navigate(`/update/assignment?id=${e._id}&shift=${shift}&category=${category}&name=${name}&email=${email}`)
    }

    const handleDelete= async(e)=>{
        console.log(e)
        try{
            let response = await API.deleteAssignment(e)
            if(!response.isSuccess){
                console.log("some problem in frontend while delteing assgnemtn")
            }else{
                console.log("succesfully delted")
                setAssignmentListUpdated(prev=> !prev)
            }

        }catch(err){
            console.log("some problem in delting. ERROR: ", err)
        }
    }

    return (<>
    <Header />
        <Grid container style={{marginTop: "5rem", border: "1px solid black"}}>
      
            <Grid item style={{ border: "1px solid red"}} xs={12}>

                    {(category === 'Teacher') && 
                        <Box style={{ border: "1px solid red", display: "flex", justifyContent: "space-around", alignItems: "self"}}>
                                {`Good ${shift}`}
                                {
                                    category === 'Teacher' && 
                                    <AddCircle onClick={()=> navigateToAssignment()} sx={{'&:hover':{
                                        color: 'green',
                                        transition: '0.4s',
                                        translate: 'scale(1.02)',
                                        cursor: 'pointer'
                                    },
                                transition: '0.4s'}} fontSize='large'/> 

                                }
                          
                        </Box>
                    }
         

            </Grid>

            <Grid container rowGap={3} justifyContent="center" alignItems="center" direction="column-reverse" style={{ marginTop: "1.2rem"}} xs={12} >

                {
                    (assignments && assignments.length > 0) ?(
                        assignments.map((e,index)=>(
                            <Grid   key={index} item sx={{
                                border: '5px solid red', 
                                width: "60%", 
                                '&:hover' : {
                                    cursor: 'pointer',
                                    transform: 'scale(1.02)',
                                    transition: '0.4s',
                                    boxShadow: '1px 1px 1px 1px black'

                                },

                                '&:active':{
                                    transform: 'scale(1)',

                                },

                                transition: '0.4s'
                            }} >
                            
                            <Card sx={{height: 'fit-content', position: 'relative'}}>
                                <Box sx={{position: 'absolute', right: 0}}>
                                    {
                                        (category === 'Teacher') &&(<Box>
                                    
                                    <Create onClick={()=> handleEdit(e)} sx={{'&:hover':{
                                        color: 'green'
                                    }}} fontSize='large'/>

                                    <Delete onClick={()=> handleDelete(e)} sx={{'&:hover':{
                                        color: 'red'
                                    }}} fontSize='large'/>

                                </Box>)}
                                    
                                </Box>
<Box onClick={()=> handleAssignmentCard(e)} sx={{display: 'flex', justifyContent: 'space-between','&:hover':{
                                        backgroundColor: 'grey',
                                        transition: '0.4s'
                                    },
                                    transition: '0.4s',}}>
                                        {
                                            category === 'Student' ?
                                            <CardHeader title={e.title} /> : 
                                            category === 'Teacher' && 
                                            <CardHeader title={e.title} subheader={e.date} />
                                        }
                         
                                 
                                 {

                                 (category === 'Student') &&
                                    <Box>
                                        {`${e.teacher} // ${e.shift}`} <br /> 
                                        <Typography variant='caption'>{`${e.date}`}</Typography>
                                    </Box>

                                 }
</Box>

                            
                            <CardContent >
                            
                            {e.description}

                            
                            </CardContent>
                                                                                                                    {/* e.image */}
                            {                                                                                       
                                (e.image.length >0 ) && <Image handleAssignmentCard={handleAssignmentCard} e={e} />
                            }

                            {
                                (category === 'Student' ) &&  
                                
                            <CardActions>
                                <Button onClick={()=>handleSubmissionStu(e._id)}>Submit</Button>
                            </CardActions>
                            }
                          
                           

                        </Card>
                        </Grid>
                        ))
                        
                    ):
                    <Grid item>
                    <Card>
                      
                        <CardContent>
                        This are no assignments made till now !
                        </CardContent>

                    </Card>
                    </Grid>


                }

            </Grid>


        </Grid>
   
    </>)
}

export default Class