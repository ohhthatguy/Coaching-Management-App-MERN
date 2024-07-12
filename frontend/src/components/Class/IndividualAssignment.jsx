import { useState, useEffect } from "react"
import Header from "../Header/Header"
import { Grid,Box, Card, CardContent, CardHeader } from "@mui/material"
import { API } from "../../services/Api"
import { useNavigate, useLocation } from "react-router-dom"

// import { useLocation } from "react-router-dom"

const IndividualAssignment = ()=>{
    const [assignment, setAssignment] = useState()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');

    const navigate = useNavigate();

    // console.log(id)

    useEffect(()=>{

        if(id){

            const getAssignmentsById = async()=>{


                try{
                    let response = await API.getAssignmentById({_id: id})
                   
                    if(response.isSuccess){
                        // console.log(response.data)
                        setAssignment(response.data)
                    }else{
                        console.log("THe data was fetched and result is sent to frontend by server but it's empty. ", response)
                    }

                }catch(err){
                    console.log("some error occured while fetching assignemnt by id. ERROR: ", err)
                }

            }


            getAssignmentsById()



        }else{
            console.log("There ain't no id of the assignemnts to fetch.")
        }
        

    },[id])

    const showFullImage = (e)=>{

        console.log(e)
        navigate(`/class/assignment/fullimage?imgSrc=${e}`)

    }

    // (assignment && assignment[0].image.filter((items)=>items!==null))

    return (<>
        <Header />

        <Grid container justifyContent="center" alignItems="center" sx={{marginTop: "5rem"}}  xs={12} >


            {
                assignment && (

                    <Grid  item sx={{
                        border: '5px solid red', 
                        width: "80%", 
                        
                    }} >
                    
                    <Card sx={{height: 'fit-content'}}>
                    <CardHeader title={assignment[0].title} subheader={assignment[0].date} />

                    
                    <CardContent>
                    
                    {assignment[0].description}

                    
                    </CardContent>
                    
                    {
                        (assignment[0].image.length >0 ) && (
                            assignment[0].image.map((e,index)=>(
                                <Box onClick={()=>showFullImage(e)} sx={{
                                    '&:hover': {
                                    cursor: 'pointer',
                                    transition: '0.4s',
                                    transform: 'scale(1.01)'
                                },

                                '&:active':{
                                    transform: 'scale(1.02)'

                                },
                                transition: '0.4s'
                                }}>
                                 <img src={e} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                                </Box>
                            ))
                        )
                    }
                  


                </Card>
                </Grid>
                )
            }

        </Grid>
    </>)
}

export default IndividualAssignment