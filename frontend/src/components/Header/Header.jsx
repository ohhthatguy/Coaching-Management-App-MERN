// import { useContext } from "react"
import { AppBar,Box, Toolbar } from "@mui/material"
import { useNavigate } from "react-router-dom"
// import { DataContext } from "../../context/DataProvider"

const Header =()=>{

const navigate = useNavigate()

const homeNavigation=()=>{
    navigate('/home')
}

// const {account} = useContext(DataContext)
// console.log(account.date)

// const classNavigation=()=>{
//     const query = new URLSearchParams()

//     // console.log(e)
//     query.append('shift', e)
//     query.append('category', account.category)
//     query.append('name', account.name)
//     query.append('email', account.email)


    
//     const queryString = query.toString()
//     navigate(`/class?${queryString}`)
// }
    return (<>
       <AppBar>
        <Box sx={{display: "flex"}}>
        <Toolbar>Hello</Toolbar>
        <Toolbar sx={{'&:hover':{
            cursor: 'pointer',
            transform: 'Scale(1.02)',
            transition: '0.3s'
        },'&:active':{
            cursor: 'pointer',
            transform: 'Scale(1.04)',
           
        },
        transition: '0.3s'}} onClick={()=>homeNavigation()}>Home</Toolbar>
        {/* <Toolbar onClick={()=>classNavigation()}>Class</Toolbar> */}

        </Box>
       
       </AppBar>
    </>)
}

export default Header