import { useEffect, useState, useContext } from "react";
import Header from "../Header/Header"
import { Box, CardHeader, Card, Grid, Paper, CardContent } from "@mui/material"
import { useLocation } from "react-router-dom";
import { API } from "../../services/Api";
import { DataContext } from "../../context/DataProvider";

const Profile = ()=>{

    const {assignmentListUpdated} = useContext(DataContext)

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const email = queryParams.get('email');
    const name = queryParams.get('name');
    const id = queryParams.get('id');
    const shift = queryParams.get('shift')
    const category = queryParams.get('category');

    const [assignments, setAssignments] = useState()
    const [images, setImages] = useState()

    console.log(assignments)
   

    useEffect(()=>{
        
        const getAllAssignment = async()=>{

        

            try{
             

                if(category === 'Teacher'){

                    let response = await API.getAllAssignment({email: email, shift: shift});
                        if(!response.data){
                            console.log("there is no data returned by server")
                        }else{
                            console.log(response.data)
                            setAssignments([...response.data])
                            
                            

                        }
                }else if(category === 'Student'){
                    //find submission done by student
                    console.log("im here")
                    let response = await API.getStudentAssignmentSubmission({email: email});
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

            <Grid item>
                <Paper elevation={9}>

                    <Box sx={{border: '1px solid red'}}>
                        <img src='https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png' alt="entity" height={150} width={150}/>
                    </Box>

                    <Box sx={{border: '1px solid red'}}>

                        name: {name}
                        email: {email}
                        category: {category}

                    </Box>

                </Paper>

            </Grid>

            <Grid item sx={{border: '5px solid black'}} xs={12} sm={10} >
                { 
               
                        assignments && assignments.map((e)=>(
                             
                                <Card sx={{   border: '3px solid red'}}>
                            <CardHeader title={(category === 'Teacher') ? e.title : e.shift} subheader={e.date}/>
                        
                        <CardContent>
                            {(category === 'Teacher') ? e.description : e.text}
                        </CardContent>


                        {
                            (category === 'Teacher')? (
                                (e.image.length >0) ? (
                                    e.image.map((ele,index)=>(
                                        <Box sx={{
                                            '&:hover': {
                                            cursor: 'pointer',
                                            transition: '0.4s',
                                            transform: 'scale(1.01)'
                                        },

                                        '&:active':{
                                            transform: 'scale(1.02)'

                                        },
                                        transition: '0.4s',
                                    
                                        }}>
                                        <img src={ele} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                                        </Box>
                                    ))
                                ):(<Box> </Box>)
                            ):(
                                (e.files.length >0) ? (
                                    e.files.map((ele,index)=>(
                                        <Box sx={{
                                            '&:hover': {
                                            cursor: 'pointer',
                                            transition: '0.4s',
                                            transform: 'scale(1.01)'
                                        },

                                        '&:active':{
                                            transform: 'scale(1.02)'

                                        },
                                        transition: '0.4s',
                                    
                                        }}>
                                        <img src={ele} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                                        </Box>
                                    ))
                                ):(<Box> </Box>)
                            )
                        
                        
                        }


                        </Card>
                    ))
                   
                }
            </Grid>


        </Grid>

       
    </>)
}

export  default Profile