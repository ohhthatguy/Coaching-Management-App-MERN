
import { Paper, Box } from "@mui/material"

import {useLocation } from "react-router-dom"

   

const Fullimage = ()=>{
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const src = queryParams.get('imgSrc');


    return (<>


<Paper elevation={3} sx={{ padding: 2 }}>
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={src}
          alt='image'
          sx={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
          }}
        />
      </Box>
    </Paper>


    </>)
}

export default Fullimage