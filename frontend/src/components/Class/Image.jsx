
import { Box, CardMedia } from "@mui/material"
import {ReadMoreOutlined} from '@mui/icons-material';



const Image=({e,handleAssignmentCard})=>{

    let image = e.image.filter((ele)=> ele!== null)
    let numberOfImage = image.length



    return (<>
 

       
     {       
        (numberOfImage== 1) ?

            <CardMedia
            onClick={()=> handleAssignmentCard(e)} 

                 sx={{ height: 400,objectFit: 'contain', border: "1px solid blue", backgroundSize: 'cover', '&:hover':{
                backgroundColor: 'grey',
                transition: '0.4s'
            },
            transition: '0.4s'}}
                image={image[0]}
                title="assignment img"
                
            /> :
             

            <Box sx={{position: 'relative' }}>
                <Box sx={{position: 'absolute', display: "flex",right: "0", top: '50%'}}>
                  
                    <ReadMoreOutlined fontSize="large"  onClick={()=> handleAssignmentCard(e)}  sx={{'&:hover':{
                        color: 'yellow',
                       
                    }}}/>
                </Box>
              
                <CardMedia 
                 onClick={()=> handleAssignmentCard(e)} 

            
                sx={{ height: 400, objectFit: 'contain' ,border: "1px solid blue", backgroundSize: 'cover',height: 400, border: "1px solid blue", backgroundSize: 'cover', '&:hover':{
                    backgroundColor: 'grey',
                    transition: '0.4s'
                },
                transition: '0.4s' }}
                image={image[0]}
                title="assignment img"
                />
            </Box>

   
    }
    


    
    {/* {
        image.map((e,index)=>(
            (e !== null) &&
            <CardMedia key={index}
                 sx={{ height: 100, border: "1px solid blue", backgroundSize: 'contain' }}
                image={e}
                title="assignment img"
                
            />
        ))
    } */}



    </>)
}

export default Image