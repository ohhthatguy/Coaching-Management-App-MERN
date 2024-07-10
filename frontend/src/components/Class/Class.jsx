import {useState, useEffect, useContext} from 'react'
import Header from "../Header/Header"
import { Box,Paper, FormLabel, Grid } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import {Create} from '@mui/icons-material';
import { API } from '../../services/Api';
import { DataContext } from '../../context/DataProvider';


const Class = ()=>{
    const {assignmentListUpdated, account} = useContext(DataContext)

    const navigate = useNavigate()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const shift = queryParams.get('shift');
    const category = queryParams.get('category');
    const name = queryParams.get('name');
    const email = queryParams.get('email');


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

            // console.log(account.email)

            try{

                let response = await API.getAllAssignment();
                if(!response.data){
                    console.log("there is no data returned by server")
                }else{
                    console.log(response.data)
                    setAssignments([...response.data])
                }

            }catch(err){
                console.log("SOME ERORR HAPPEEND IN FONTEND WHILE HANDLING ASSIGNMENT FETCHING. ERROR: ",err)

            }
        }

        getAllAssignment()


    },[assignmentListUpdated])


  console.log(assignments)


    return (<>
    <Header />
        <Grid container style={{marginTop: "5rem", border: "1px solid black"}}>
      
            <Grid item style={{ border: "1px solid red"}} xs={12}>

                    {(category === 'Teacher') && 
                        <Box style={{ border: "1px solid red", display: "flex", justifyContent: "space-around", alignItems: "self"}}>
                                {`Good ${shift}`}
                            <Create onClick={()=> navigateToAssignment()} fontSize="medium"/>
                        </Box>
                    }
         

            </Grid>

            <Grid container style={{border: '1px solid red'}}>
                <FormLabel>Date</FormLabel>
                    <Grid item>
                        <Paper>
                            This is for Assignment content
                        </Paper>
                    </Grid>


            </Grid>


        </Grid>
   
    </>)
}

export default Class