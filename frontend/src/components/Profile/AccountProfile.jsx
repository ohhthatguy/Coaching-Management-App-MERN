import { useEffect, useState, useContext } from "react";
import Header from "../Header/Header"
import { Box, CardHeader, Card, Grid,Typography, Paper, CardContent } from "@mui/material"

import { API } from "../../services/Api";
import { DataContext } from "../../context/DataProvider";

const AccountProfile = ()=>{

    const {assignmentListUpdated, account} = useContext(DataContext)

    console.log(account)
   
    const [assignments, setAssignments] = useState()
 

    console.log(assignments)
   

    useEffect(()=>{
        
        const getAllAssignment = async()=>{

        

            try{
             

                if(account.category === 'Teacher'){
                  

                    let response = await API.getAllAssignment({email: account.email, shift: account.shift});
                        if(!response.data){
                            console.log("there is no data returned by server")
                        }else{
                            console.log(response.data)
                            setAssignments([...response.data])
                            
                            

                        }
                }else if(account.category === 'Student'){
                  
                    let response = await API.getStudentAssignmentSubmission({email: account.email, shift: account.shift});
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


    return (<>

    <Header />
        <Grid container rowGap={3} direction="column" sx={{marginTop: '5rem'}} >

            {/* <Grid item>
                <Paper elevation={9}>

                    <Box sx={{border: '1px solid red'}}>
                        <img src='https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png' alt="entity" height={150} width={150}/>
                    </Box>

                    <Box sx={{border: '1px solid red'}}>

                        name: {account.name}
                        email: {account.email}
                        category: {account.category}

                    </Box>

                </Paper>

            </Grid> */}

<Grid container justifyContent='center' alignItems='center'>
                <Paper elevation={9} sx={{display: 'flex', width: '50%', justifyContent: 'center', alignItems: 'center', gap: '10px',  height: '40vh'}}>

                    <Box>
                        <img src='https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png' alt="entity" height={150} width={150}/>
                    </Box>

                    <Box>

                       <Typography variant="h5"> name: {account.name}</Typography>
                       <Typography variant="h5"> email: {account.email} </Typography>
                       <Typography variant="h5"> category: {account.category} </Typography>

                    </Box>

                </Paper>

            </Grid>
{
    account.category === 'Teacher' ? <Typography variant="h5">Your assignments: </Typography> : <Typography variant="h5">Your submissions: </Typography>
}
            

            {
                (assignments && assignments.length >0) ?

            
            <Grid container direction="column-reverse" rowGap={4} sx={{border: '5px solid black'}} >
                {

                       assignments.map((e)=>(
                        
                        <Grid item >
                            <Card sx={{border: '2px solid red'}}>
                            <CardHeader sx={{background: 'grey'}} title={(account.category === 'Teacher') ? e.title : `${e.student}/ AssignmentId: ${e.assignmentId}`} subheader={e.date}/>
                        
                        <CardContent sx={{background: 'grey'}}>
                            {(account.category === 'Teacher') ? e.description : e.text}
                        </CardContent>

                        {/* sx={{
                                            '&:hover': {
                                            cursor: 'pointer',
                                            transition: '0.4s',
                                            transform: 'scale(1.01)'
                                        },

                                        '&:active':{
                                            transform: 'scale(1.02)'

                                        },
                                        transition: '0.4s',
                                     
                                    
                                        }} */}
                        {
                            (account.category === 'Teacher')? (
                                (e.image.length >0) ? (
                                    e.image.map((ele,index)=>(
                                        <Box >
                                          
                                                <img src={ele} alt={`Image ${index + 1}`} style={{ objectFit: 'contain', width: '100%', height: '50vh' }} />
                                           
                                        </Box>
                                    ))
                                ):(<Box> </Box>)
                            ):(
                                (e.files.length >0) ? (
                                    e.files.map((ele,index)=>(
                                        <Box>
                                        <img src={ele} alt={`Image ${index + 1}`} style={{ objectFit: 'contain', width: '100%', height: '50vh' }} />
                                        </Box>
                                    ))
                                ):(<Box> </Box>)
                            )
                        
                        
                        }

                       
                        </Card>
                        </Grid>
                    ))
                   
                }
            </Grid>

                    : <Grid item xs={12} sm={10} >
                            <Card>
                                <CardHeader sx={{ textAlign: 'center'}} title="No Submission Made till now" />
                            </Card>
                        </Grid>
            
            }


        </Grid>

       
    </>)
}

export  default AccountProfile