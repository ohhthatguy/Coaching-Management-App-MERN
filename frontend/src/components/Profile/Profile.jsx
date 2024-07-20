import { useEffect, useState, useContext } from "react";
import Header from "../Header/Header"
import { Box, CardHeader, Card, Grid, Paper, CardContent, Typography } from "@mui/material"
import { useLocation } from "react-router-dom";
import { API } from "../../services/Api";
import { DataContext } from "../../context/DataProvider";

const Profile = ()=>{

    const {assignmentListUpdated, account} = useContext(DataContext)

    console.log(account)
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const email = queryParams.get('email');
    const name = queryParams.get('name');
    // const id = queryParams.get('id');
    const shift = queryParams.get('shift')
    const category = queryParams.get('category');

    const [assignments, setAssignments] = useState()
 

    console.log(assignments)
   

    useEffect(()=>{
        
        const getAllAssignment = async()=>{

        

            try{
             

                if(category === 'Teacher'){
                    let commonShift = shift.split(',').filter(element => account.shift.includes(element));

                    let response = await API.getAllAssignment({email: email, shift: commonShift});
                        if(!response.data){
                            console.log("there is no data returned by server")
                        }else{
                            console.log(response.data)
                            setAssignments([...response.data])
                            
                            

                        }
                }else if(category === 'Student'){
                    //find submission done by student
                    // console.log(email)
                    let commonShift = shift.split(',').filter(element => account.shift.includes(element));
                    // console.log(commonShift)
                    let response = await API.getStudentAssignmentSubmission({email: email, shift: commonShift});
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
        <Grid container rowGap={3} direction="column" sx={{marginTop: '5rem'}}>

            <Grid container justifyContent='center' alignItems='center'>
                <Paper elevation={9} sx={{display: 'flex', width: '50%', justifyContent: 'center', alignItems: 'center', gap: '10px',  height: '40vh'}}>

                    <Box>
                        <img src='https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png' alt="entity" height={150} width={150}/>
                    </Box>

                    <Box >

                       <Typography variant="h5"> name: {name}</Typography>
                       <Typography variant="h5"> email: {email} </Typography>
                       <Typography variant="h5"> category: {category} </Typography>

                    </Box>

                </Paper>

            </Grid>

            {
    category === 'Teacher' ? <Typography variant="h5"> assignments: </Typography> : <Typography variant="h5"> submissions: </Typography>
}

            {
                (assignments && assignments.length >0) ?

            
            <Grid container rowGap={4} direction="column-reverse" sx={{border: '5px solid black'}} xs={12} >
                {

                       assignments.map((e)=>(
                             
                            <Card>
                            <CardHeader sx={{background: 'grey'}} title={(category === 'Teacher') ? e.title : `${e.student}/ ${e.shift}`} subheader={e.date}/>
                        
                        <CardContent sx={{background: 'grey'}}>
                            {(category === 'Teacher') ? e.description : e.text}
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
                            (category === 'Teacher')? (
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

export  default Profile