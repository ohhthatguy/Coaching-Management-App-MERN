import { useState,useEffect,useRef } from "react";
import Header from "../../Header/Header";
import {Box, Grid,TextareaAutosize, Button, Typography } from "@mui/material"
import {AttachFile} from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../../services/Api";
import {Cancel} from '@mui/icons-material';






// import { DataContext } from "../../../context/DataProvider";


const Submit = ()=>{
    const initial= {
        title: '',
        description: '',
        image: [],
        date: '',
        teacher: '',
        shift: '',
        email: ''
    }

   const isRunningOnPageLoad = useRef(true)
    // const {account} = useContext(DataContext)
    const navigate = useNavigate()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');
    const shift = queryParams.get('shift');
    const category = queryParams.get('category');
    const name = queryParams.get('name');
    const email = queryParams.get('email');
    // console.log(`${shift}, ${category}, ${name}, ${email}`)
    let temp =[]
    const [data, setData] = useState(initial)
   


    const submitInitial = {
        student: `${name}`,
        email: `${email}`,
        shift: `${shift}`,
        text: '',
        files: [],
        date: '',
        assignmentId: ''

    }

 

    const [submissionData, setSubmissionData] = useState(submitInitial)
    const [imageLength, setImageLength] = useState(null)

    const [teacherAssignImg, setTeacherAssignImg] = useState() //current images of teacher assignment from db
    const [images, setImages] = useState([]) //final images, cancel clicking work here
    const [newImages, setNewImages] = useState() //new images that has not been to gridfs
    
    
   
    //get assignemnt using id
    useEffect(()=>{

        if(id){
            const getAssignmentsById = async()=>{
                try{
                    let response = await API.getAssignmentById({_id: id})
                   
                    if(response.isSuccess){

                        // setData(response.data[0])

                        // console.log(response.data[0].image)
                        temp = response.data[0].image.filter((item)=>item!==null)
                        // console.log(temp)
                        // console.log()
                        response.data[0].image = [...temp]
                        // totalImage = temp.length
                        setImageLength(temp.length)
                        setTeacherAssignImg([...temp])
                        // setImages([...temp])
                        setData({...data, ...response.data[0]})
                        submitInitial.assignmentId = (response.data[0]._id)
    

                    }else{
                        console.log("THe data was fetched and result is sent to frontend by server but it's empty. ", response)
                    }

                }catch(err){
                    console.log("some error occured while fetching assignemnt by id. ERROR: ", err)
                }

            }
            getAssignmentsById()

        }else if(!id){
            console.log("There ain't no id of the assignemnts to fetch.")

        
        }
        },[id])

    //for change in images
    const handleInputFile = (e)=>{
        setNewImages([...e])
    }

    //this runs when new images are added
    useEffect(()=>{
        if(newImages){
                //if new images are here sent them to gridfs storage and mongodb. A new URl form, fetch it and save it to [images,setImages]
                    const saveNewImage = async()=>{
    
                        const data1 = new FormData()
    
                        newImages.map((e)=>{
                            data1.append('name', e.name)
                            data1.append('image', e)
                        })
    
                        try{
    
                            let response = await API.saveImages(data1)
                            console.log(response.data);
                            // console.log("im here")
                    
                            setImages([...images,...response.data])
                           
                            // setData({...data, image: [...images,...response.data]})
                            setSubmissionData({...submissionData, files: [...images,...response.data]})
                          


                        }catch(err){
                            console.log("Some error happend. ERROR: ",err)
                        }
    
    
                    }
                saveNewImage()
        }else{
            console.log("NO new images are sekected")
        }

    },[newImages])


    //for submiting useEffect is used because the date updation and API call to send data has to be done simulatenously
    useEffect(()=>{

        //to avoid call to API when on page load as useEffect runs as page load
        if(isRunningOnPageLoad.current){
            isRunningOnPageLoad.current = false
            return
        }

        // console.log("heere in date",submissionData.date )

        const saveSubmission = async()=>{

            try{

                let response = await API.saveStudentAssignmentSubmission(submissionData)
                if(!response.isSuccess){
                    console.log("something wornghas happemed while submiting assignment by student.")
                }else{
                    console.log("successfully submitted assignment by student.")
                navigate(`/class?shift=${shift}&category=${category}&name=${name}&email=${email}`)
       

                }

            }catch(err){
                    console.log("something wornghas happemed while submiting assignment by student. ERROR: ", err)

            }
        }
        saveSubmission()
        
    },[submissionData.date])



    
    const handleTextInput = (e)=>{
        // setData({...data, [e.target.name]: e.target.value})
        setSubmissionData({...submissionData, [e.target.name]: e.target.value})
    }

    const handleCancel = (e)=>{
        // console.log("Clicked cancel in imgae")
        // console.log(e)
        let afterCancel = images.filter((item)=> item !== e)
        setImages([...afterCancel])
        setSubmissionData({...submissionData, files: [...afterCancel]})

    }

  

   

    // const handleUpdate = async()=>{
    //     // console.log("iupdate")

    //     try{

    //         let response = await API.updateAssignment(data)
    //         if(!response.isSuccess){
    //             console.log("Some error happened from backend")
    //         }else{
    //             navigate(`/class?shift=${shift}&category=${category}&name=${name}&email=${email}`)
    //         }

    //     }catch(err){
    //         console.log("ERROR IN FORNTEND WHILE UPDATING ASSIGNEMNT. ERROR", err)
    //     }


    // }
  
  console.log(submissionData)
  console.log(submissionData.text.length)
  console.log(submissionData.files.length)


    return (<>
        <Header />

        {
            (data && 
        
                    
            <Grid container direction="column" rowGap={5}  style={{marginTop: "5rem", padding: '2rem'}}>

            <Grid item style={{ textAlign: "center", fontSize: "2rem"}}>
                <Box>
                    
                        <Typography variant="h4">{data.title}</Typography>
                        <Typography variant="h6">{data.description}</Typography>

                    
                </Box>
            </Grid>

            <Grid container direction="column"  style={{padding: "1.5rem", display: "flex", gap: "2rem"}} xs={10.5}>
            
            {/* These are the images from db given by teacher */}
            <Grid container direction="row">
                    
                    {
                        (imageLength > 0) ? 
                    
                            
                        teacherAssignImg.map((e,index)=>(
                        
                               
                            
                                    <Box key={index}  sx={{position: "relative"}}>
                                     
                                        
                    
                                        <img  src={e} alt="image here" style={{border: "1px solid black", height: "400px", width: "325px", marginLeft: "20px", objectFit: "cover" }}/>
                                    
                                    </Box>
                                )
                            )
                            
                        : "no images"
                    
                    }
                        
                    
                    
                    </Grid> 
                    
               
                
                <TextareaAutosize name="text" onChange={(e)=>handleTextInput(e)} placeholder="Write here..." minRows={15} style={{width: "100%"}} />

                    {/* These are the files uploaded by the student */}
                    <Grid container direction="row">
                    
                    {
                        (images.length > 0) ? 
                    
                            
                        images.map((e,index)=>(
                            <Box key={index}  sx={{position: "relative",
                                ':hover' : {
                                    cursor: 'pointer',
                                    transform: 'scale(1.02)',
                                    transition: '0.4s'
                                },
                                transition: '0.4s'
                            }}>
                             
                                <Box style={{ position: "absolute", right: "0px" }}> <Cancel   onClick={()=>handleCancel(e)}   sx={{
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
                        <input multiple onChange={(e)=> handleInputFile(e.target.files)} style={{display: "none"}} type="file" id="fileInput2" />
                    
                    <AttachFile htmlFor="fileInput2" fontSize="large" 
                    
                    sx={{
                        ':hover':{
                        cursor: 'pointer',
                        transform: 'scale(1.02)',
                        transition: '0.4s'
                    },
                
                    transition: '0.4s' }} />

                    </label>

                    
                    <Button  variant="contained" onClick={()=>setSubmissionData({...submissionData, date: Date.now()})} 
                     disabled={(submissionData.text.length >0 || submissionData.files.length >0)?false :true}   >Submit assignemnt</Button>
                </Grid>


            </Grid>


            </Grid>

                )}
    

    </>)
}

export default Submit


