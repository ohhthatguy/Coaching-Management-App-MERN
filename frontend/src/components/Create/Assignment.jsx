import { useState } from "react";
import Header from "../Header/Header"
import { Box, Grid, TextField,TextareaAutosize, Button } from "@mui/material"
import {AttachFile} from '@mui/icons-material';
import { useLocation } from "react-router-dom";


const Assignment = ()=>{

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const shift = queryParams.get('shift');
    const name = queryParams.get('name');



    const initial= {
        title: '',
        description: '',
        image: [],
        date: '',
        teacher: name,
        shift: shift
    }
    
    const [assignmentData, setAssignmentData] = useState(initial)
    console.log(assignmentData)

    const handleInputFile = (e)=>{
        console.log(e.target.files)
    }



    return (<>
    <Header />
       
       <Grid container direction="column" rowGap={5}  style={{marginTop: "5rem", padding: '2rem'}}>

            <Grid item style={{ textAlign: "center", fontSize: "2rem"}}>
                Create An Assignment:    
            </Grid>

            <Grid item direction="column" style={{padding: "1.5rem", display: "flex", gap: "2rem"}} xs={10.5}>
                
                <TextField variant="standard" fullWidth placeholder="Assignment's Title"/>

                <TextareaAutosize placeholder="Describe about your Assignment" minRows={15} style={{width: "100%"}} />

                <Grid item style={{ display: "flex", gap: "1.5rem"}} >

                    <label>
                        <input multiple onChange={(e)=> handleInputFile(e)} style={{display: "none"}} type="file" id="fileInput" />
                    
                    <AttachFile htmlFor="fileInput" fontSize="large" 
                    
                    sx={{
                         ':hover':{
                        cursor: 'pointer',
                        transform: 'scale(1.02)',
                        transition: '0.4s'
                    },
                    transition: '0.4s' }} />

                    </label>
                   
                    <Button  variant="contained" >Create</Button>
                </Grid>


            </Grid>


       </Grid>


    </>)
}

export default Assignment