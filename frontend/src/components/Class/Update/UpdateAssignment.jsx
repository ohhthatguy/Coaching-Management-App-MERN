import { useState,useEffect,useContext } from "react";
import Header from "../../Header/Header";
import {Box, Grid, TextField,TextareaAutosize, Button } from "@mui/material"
import {AttachFile} from '@mui/icons-material';
import { useLocation } from "react-router-dom";
import { API } from "../../../services/Api";
import {Cancel} from '@mui/icons-material';
// import { DataContext } from "../../context/DataProvider";

const UpdateAssignment = ()=>{
    const [data, setData] = useState([])
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');

    const initial= {
        title: '',
        description: '',
        image: [],
        date: '',
        teacher: '',
        shift: '',
        email: ''
    }
    // const [initialData, setInitialData] = useState(initial)
   
    
    useEffect(()=>{
        if(id){
            const getAssignmentsById = async()=>{
                try{
                    let response = await API.getAssignmentById({_id: id})
                   
                    if(response.isSuccess){

                        setData(response.data[0])
                        console.log(response)

    

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

   

  

    console.log(data)
  
    console.log(data.image)
 
  

    // if(data ){
       
    // }

    // if(data.image != []){
    //     let goodImage = Object.values(data.image).filter((item)=>item!=null)
    //     setData({...data, image:[...goodImage]})
    // }
  

    return (<>
        <Header />
{
//    <Box sx={{marginTop: "5rem"}}>
//     {data && Object.entries(data.image).map(([key,value])=>(
        
      
        
//     ))}
//    </Box>
}
     
    

    </>)
}

export default UpdateAssignment




// <Grid container direction="column" rowGap={5}  style={{marginTop: "5rem", padding: '2rem'}}>

// <Grid item style={{ textAlign: "center", fontSize: "2rem"}}>
//     UPDate An Assignment:    
// </Grid>

// <Grid container direction="column"  style={{padding: "1.5rem", display: "flex", gap: "2rem"}} xs={10.5}>
// {/* onChange={(e)=>handleTextInput(e)} */}
//     <TextField name="title" value={data?.title}  variant="standard" fullWidth placeholder="Assignment's Title"/>
//     {/* onChange={(e)=>handleTextInput(e)}  */}
//     <TextareaAutosize name="description" value={data?.description} placeholder="Describe about your Assignment" minRows={15} style={{width: "100%"}} />


//     <Grid container direction="row">
        
//         {
//             (data.image.length > 0) ? 

                
//             data.image.map((e,index)=>(
//                         <Box key={index}  sx={{position: "relative",
//                             ':hover' : {
//                                 cursor: 'pointer',
//                                 transform: 'scale(1.02)',
//                                 transition: '0.4s'
//                             },
//                              transition: '0.4s'
//                         }}>
//                             {/* onClick={()=>handleCancel(e)}  */}
//                             <Box style={{ position: "absolute", right: "0px" }}> <Cancel sx={{
//                                 ':hover' : {
//                                     color: 'red', 
//                                     transition: '0.4s'
//                                 },
//                                 transition: '0.4s'
//                             }} fontSize="small"/>
//                              </Box>

//                             <img  src={e} alt="image here" style={{border: "1px solid black", height: "400px", width: "325px", marginLeft: "20px", objectFit: "cover" }}/>
                        
//                         </Box>
//                     ))
                
//              : "no images"

//         }
            


//     </Grid>



//     {/* BUTTONS */}
//     <Grid item style={{ display: "flex", gap: "1.25rem"}} >
//     {/* onChange={(e)=> handleInputFile(e.target.files)} */}
//         <label>
//             <input multiple  style={{display: "none"}} type="file" id="fileInput" />
        
//         <AttachFile htmlFor="fileInput" fontSize="large" 
        
//         sx={{
//              ':hover':{
//             cursor: 'pointer',
//             transform: 'scale(1.02)',
//             transition: '0.4s'
//         },
       
//         transition: '0.4s' }} />

//         </label>
//         {/* onClick={()=>handleClick()} */}
//         <Button  variant="contained"  >Update</Button>
//     </Grid>


// </Grid>


// </Grid>


