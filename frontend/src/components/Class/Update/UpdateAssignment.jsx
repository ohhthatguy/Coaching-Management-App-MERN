import { useState,useEffect,useContext } from "react";
import Header from "../../Header/Header";
import {Box, Grid, TextField,TextareaAutosize, Button } from "@mui/material"
import {AttachFile} from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../../services/Api";
import {Cancel} from '@mui/icons-material';
// import { DataContext } from "../../../context/DataProvider";


const UpdateAssignment = ()=>{
    const initial= {
        title: '',
        description: '',
        image: [],
        date: '',
        teacher: '',
        shift: '',
        email: ''
    }
    // const {account} = useContext(DataContext)
    const navigate = useNavigate()

  
   

    const [data, setData] = useState(initial)
    const [imageLength, setImageLength] = useState(null)

    const [images, setImages] = useState(null) //current and final images, cancel clicking work here
    const [newImages, setNewImages] = useState() //new images that has not been to gridfs
    
    
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');
    const shift = queryParams.get('shift');
    const category = queryParams.get('category');
    const name = queryParams.get('name');
    const email = queryParams.get('email');
    // console.log(`${shift}, ${category}, ${name}, ${email}`)
    let temp =[]
    


  
   
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
                        setImages([...temp])
                        setData({...data, ...response.data[0]})

    

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
                           
                            setData({...data, image: [...images,...response.data]})
                          


                        }catch(err){
                            console.log("Some error happend. ERROR: ",err)
                        }
    
    
                    }
                saveNewImage()
        }else{
            console.log("NO new images are sekected")
        }

    },[newImages])



    
    const handleTextInput = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleCancel = (e)=>{
        // console.log("Clicked cancel in imgae")
        // console.log(e)
        let afterCancel = images.filter((item)=> item !== e)
        setImages([...afterCancel])
        setData({...data, image: [...afterCancel]})

    }

    const handleInputFile = (e)=>{
        setNewImages([...e])
    }

   

    const handleUpdate = async()=>{
        // console.log("iupdate")

        try{

            let response = await API.updateAssignment(data)
            if(!response.isSuccess){
                console.log("Some error happened from backend")
            }else{
                navigate(`/class?shift=${shift}&category=${category}&name=${name}&email=${email}`)
            }

        }catch(err){
            console.log("ERROR IN FORNTEND WHILE UPDATING ASSIGNEMNT. ERROR", err)
        }


    }
  
  

    return (<>
        <Header />

        {
            (data && 
        
                    
            <Grid container direction="column" rowGap={5}  style={{marginTop: "5rem", padding: '2rem'}}>

            <Grid item style={{ textAlign: "center", fontSize: "2rem"}}>
                UPDate An Assignment:    
            </Grid>

            <Grid container direction="column"  style={{padding: "1.5rem", display: "flex", gap: "2rem"}} xs={10.5}>
            
                <TextField name="title" value={data?.title} onChange={(e)=>handleTextInput(e)}  variant="standard" fullWidth placeholder="Assignment's Title"/>
                    
                
                <TextareaAutosize name="description" onChange={(e)=>handleTextInput(e)}  value={data?.description} placeholder="Describe about your Assignment" minRows={15} style={{width: "100%"}} />


                <Grid container direction="row">
                    
                    {
                        (imageLength > 0) ? 
                    
                            
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
                  
                    <Button  variant="contained"   onClick={()=>handleUpdate()}  >Update</Button>
                </Grid>


            </Grid>


            </Grid>

                )}
    

    </>)
}

export default UpdateAssignment


