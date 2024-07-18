
import { Box, Card, CardHeader, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const EntityList = ({entity}) =>{

      

     const navigate = useNavigate()
     
    const handleClick =()=>{
        console.log('clicked')
    }


    return (<>

    {                               
            (entity )&& 
            entity.map((e,index)=>(
                <Box key={index} sx={{display: "flex"}}>

                    <Card onClick={()=>handleClick()} sx={{border: '5px solid black', width: "18vw", textAlign: "center", '&:hover':{
                        cursor: 'pointer',
                        transform: 'scale(1.03)',
                        transition: '0.4s'
                    }, '&:active':{
                        cursor: 'pointer',
                        transform: 'scale(1.09)',
                        
                    },
                    transition: '0.4s'}}>

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
                   
                </Box>
            ))   

                                }

    </>)
}

export default EntityList