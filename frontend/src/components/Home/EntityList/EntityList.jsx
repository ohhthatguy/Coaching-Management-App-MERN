
import { Box, Card,Grid , CardHeader, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const EntityList = ({entity}) =>{

      

     const navigate = useNavigate()
     
    const handleClick =(e)=>{
        console.log(e)
            navigate(`/profile?name=${e.name}&email=${e.email}&id=${e._id}&category=${e.category}&shift=${e.shift}`)

      
    }


    return (<>

    {                               
            (entity )&& 
            entity.map((e,index)=>(
                <Grid sx={{paddingLeft: '10px'}} item key={index}  lg={3} md={4} sm={5} xs={12}>

                    <Card onClick={()=>handleClick(e)} sx={{border: '5px solid black', textAlign: "center", '&:hover':{
                        cursor: 'pointer',
                        transform: 'scale(1.03)',
                        transition: '0.4s'
                    }, '&:active':{
                        cursor: 'pointer',
                        transform: 'scale(1.09)',
                        
                    },
                    transition: '0.4s'
                    
                    
                    }}>

                       <Box sx={{border: '1px solid red'}}>
                            <img src='https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png' alt="entity" height={150} width={150}/>
                       </Box>

                       <CardHeader title={e.name} />
                      <Box sx={{display: "flex", gap: "10px", justifyContent: 'center', alignItems: 'center'}}> 
                        {
                            e.shift.map((k)=>(
                                <Typography> {k} </Typography>
                            ))
                        }
                        </Box>
                      

                    </Card>
                   
                </Grid>
            ))   

                                }

    </>)
}

export default EntityList