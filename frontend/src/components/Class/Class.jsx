import {useState, useEffect, useContext} from 'react'
import Header from "../Header/Header"
import { Box,Card, CardHeader,CardContent, Grid } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import {Create, AddCircle} from '@mui/icons-material';

import { API } from '../../services/Api';
import { DataContext } from '../../context/DataProvider';
import Image from './Image';


const Class = ()=>{
    const {assignmentListUpdated, account} = useContext(DataContext)

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

                let response = await API.getAllAssignment({email: email});
                if(!response.data){
                    console.log("there is no data returned by server")
                }else{
                    // console.log(response.data)
                    setAssignments([...response.data])
                }

            }catch(err){
                console.log("SOME ERORR HAPPEEND IN FONTEND WHILE HANDLING ASSIGNMENT FETCHING. ERROR: ",err)

            }
        }

        getAllAssignment()


    },[assignmentListUpdated])


//   console.log(assignments)



    const handleEdit =(e)=>{
        console.log("handle edit", e)
        navigate(`/update/assignment?id=${e._id}`)
    }

    return (<>
    <Header />
        <Grid container style={{marginTop: "5rem", border: "1px solid black"}}>
      
            <Grid item style={{ border: "1px solid red"}} xs={12}>

                    {(category === 'Teacher') && 
                        <Box style={{ border: "1px solid red", display: "flex", justifyContent: "space-around", alignItems: "self"}}>
                                {`Good ${shift}`}
                            <AddCircle onClick={()=> navigateToAssignment()} fontSize="medium"/>
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
                                    <Create onClick={()=> handleEdit(e)} sx={{'&:hover':{
                                        color: 'green'
                                    }}} fontSize='large'/>
                                </Box>

                            <CardHeader onClick={()=> handleAssignmentCard(e)} sx={{'&:hover':{
                                        backgroundColor: 'grey',
                                        transition: '0.4s'
                                    },
                                    transition: '0.4s'}}  title={e.title} subheader={e.date} />

                            
                            <CardContent >
                            
                            {e.description}

                            
                            </CardContent>
                                                                                                                    {/* e.image */}
                            {                                                                                       
                                (e.image.length >0 ) && <Image handleAssignmentCard={handleAssignmentCard} e={e} />
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