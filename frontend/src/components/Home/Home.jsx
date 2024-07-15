import { useContext } from "react"
import Header from "../Header/Header"
import { Box,Typography, Card, CardHeader, CardContent, Paper, styled, Grid, FormLabel } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
import { useNavigate } from "react-router-dom"


const StyledCard = styled(Card)`
    border: 1px solid darkgreen;
    //  margin-top: 1.25rem;
     height: 15rem;
    //  text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
     width: 30%;
      background-color: #FEAE6F;
      &:hover {
        cursor: pointer;
        transform: scale(1.02);
        transition: 0.5s;
      }
            transition: 0.5s;
`

const Home = ()=>{
    const navigate = useNavigate()
    const {account} = useContext(DataContext)
    // console.log(account.date)

    const handleNavigation=(e)=>{
        const query = new URLSearchParams()

        // console.log(e)
        query.append('shift', e)
        query.append('category', account.category)
        query.append('name', account.name)
        query.append('email', account.email)


        
        const queryString = query.toString()
        navigate(`/class?${queryString}`)
    }
    
    // console.log(account)

    return (<>
    <Header />
        <Grid container direction="column" style={{marginTop: "5rem", border: "1px solid blue"}} rowSpacing={2}>

            <Grid style={{border: "1px solid black"}} item lg={12} md={12} sd={12} xs={12}>
                <Paper >
                    <Typography variant="h5"> hello {account.name} </Typography>
                </Paper>
            </Grid>

            <FormLabel>Your Classes: </FormLabel>

            {/* style={{border: "10px solid red"}} */}
            <Grid container sx={{padding: '3rem'}} justifyContent="space-between" direction="row" alignItems="center"  xs={12} >
                

                {
                    account.shift.map((e,index)=>(

                        <StyledCard onClick={()=> handleNavigation(e)} key={index}>
                            <CardHeader title={e}/>
                            
                        </StyledCard>
                    ))
                   
                }
               

            </Grid>

            <FormLabel>Your Teachers: </FormLabel>
{
                (account.category == 'Teacher') ? (

                <Grid item style={{border: "1px solid red"}} xs={12} sm={10}>
                    
                    teacher area
                    </Grid>
                      
                ) : 

                <Grid item style={{border: "1px solid red"}} xs={12} sm={10}>
                    <FormLabel>Your Students: </FormLabel>
                    student area
                    </Grid>
                
            }
            

            

            
        </Grid>
    </>)
}

export default Home