import { useState,useEffect,useContext } from "react";
import Header from "../Header/Header"
import {Box, Grid, TextField,TextareaAutosize, Button } from "@mui/material"
import {AttachFile} from '@mui/icons-material';
import { useLocation } from "react-router-dom";
import {API} from "../../services/Api"
import {Cancel} from '@mui/icons-material';
import { DataContext } from "../../context/DataProvider";


const Assignment = ()=>{

    const {setAssignmentListUpdated, account} = useContext(DataContext)

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
        shift: shift,
        email: account.email
    }
    
    const [assignmentData, setAssignmentData] = useState(initial)
    const [images,setImages] = useState()
    const [displayImage, setDisplayImage] = useState()
    // console.log(assignmentData)


        //for images
    const handleInputFile = (e)=>{
        setImages([...e])
    }

    useEffect(()=>{
        // console.log(images)

        if(images){
            const saveImage = async()=>{

                const data = new FormData()

                images.map((e)=>{
                    data.append('name', e.name)
                    data.append('image', e)
                })

                try{

                    let response = await API.saveImages(data)
                    console.log(response.data);
                    setAssignmentData({...assignmentData, image: [...response.data]})
                    setDisplayImage(response.data)


                }catch(err){
                    console.log("Some error happend. ERROR: ",err)
                }


            }
            saveImage()
        }else{
            console.log("THere are no images selected")
        }
           
    },[images])

    // console.log(displayImage)


    const handleTextInput =(e)=>{
        setAssignmentData({...assignmentData, [e.target.name]: e.target.value})
        // console.log(assignmentData)
    }

    const handleClick = async()=>{
        setAssignmentData({...assignmentData, date: Date.now()})
        console.log(assignmentData)

        if(assignmentData.date){

            try{
                let response = await API.saveCreatedAssignment(assignmentData)
                if(response.isSuccess){
                    console.log("Data is saved")
                    setAssignmentListUpdated(prev=> !prev)
                }else{
                    console.log("Data is not saved")

                }
                setAssignmentData(initial)

            }catch(err){
                console.log("SOME ERROR HAPENED. ERROR: ", err)

            }
           
        }else{
            console.log("check of date is there or not")
        }
    }

    const handleCancel = (e)=>{
        // console.log(e)
        let Images = [...assignmentData.image]
        let updatedImages = []
        updatedImages = Images.filter((item)=> item != e)
        setAssignmentData({...assignmentData, image: [...updatedImages]})
        setDisplayImage([...updatedImages])

        // console.log(updatedImages)  
    }



    return (<>
    <Header />
       
       <Grid container direction="column" rowGap={5}  style={{marginTop: "5rem", padding: '2rem'}}>

            <Grid item style={{ textAlign: "center", fontSize: "2rem"}}>
                Create An Assignment:    
            </Grid>

            <Grid container direction="column"  style={{padding: "1.5rem", display: "flex", gap: "2rem"}} xs={10.5}>
                
                <TextField name="title" value={assignmentData.title} onChange={(e)=>handleTextInput(e)} variant="standard" fullWidth placeholder="Assignment's Title"/>

                <TextareaAutosize name="description" value={assignmentData.description} onChange={(e)=>handleTextInput(e)} placeholder="Describe about your Assignment" minRows={15} style={{width: "100%"}} />


                <Grid container direction="row">
                    
                    {
                        (displayImage) ? 

                            
                                displayImage.map((e,index)=>(
                                    <Box key={index}  sx={{position: "relative",
                                        ':hover' : {
                                            cursor: 'pointer',
                                            transform: 'scale(1.02)',
                                            transition: '0.4s'
                                        },
                                         transition: '0.4s'
                                    }}>
                                        <Box style={{ position: "absolute", right: "0px" }}> <Cancel onClick={()=>handleCancel(e)} sx={{
                                            ':hover' : {
                                                color: 'red', 
                                                transition: '0.4s'
                                            },
                                            transition: '0.4s'
                                        }} fontSize="small"/>
                                         </Box>

                                        <img  src={e} alt="image here" style={{border: "1px solid black", height: "400px", width: "325px", marginLeft: "20px", objectFit: "cover" }}/>
                                    
                                    </Box>
                                ))
                            
                         : "no images"

                    }
                        


                </Grid>
            


                {/* BUTTONS */}
                <Grid item style={{ display: "flex", gap: "1.25rem"}} >

                    <label>
                        <input multiple onChange={(e)=> handleInputFile(e.target.files)} style={{display: "none"}} type="file" id="fileInput" />
                    
                    <AttachFile htmlFor="fileInput" fontSize="large" 
                    
                    sx={{
                         ':hover':{
                        cursor: 'pointer',
                        transform: 'scale(1.02)',
                        transition: '0.4s'
                    },
                   
                    transition: '0.4s' }} />

                    </label>
                   
                    <Button  variant="contained" onClick={()=>handleClick()} >Create</Button>
                </Grid>


            </Grid>


       </Grid>


    </>)
}

export default Assignment