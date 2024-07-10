import { useContext } from "react"
import Header from "../Header/Header"
import { Box, Card, CardHeader, CardContent, Paper, styled, Grid, FormLabel } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
import { useNavigate } from "react-router-dom"


const StyledCard = styled(Card)`
    border: 1px solid darkgreen;
     margin-top: 1.5rem;
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
    console.log(account.date)

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
        <Grid container style={{marginTop: "5rem", border: "1px solid blue"}} rowSpacing={2}>

            <Grid style={{border: "1px solid black"}} item lg={12} md={12} sd={12} xs={12}>
                <Paper >
                    hello ${account.name}
                </Paper>
            </Grid>
            <FormLabel>Your Classes: </FormLabel>

            <Grid item style={{border: "1px solid red"}} xs={12} sm={10}>
                

                {
                    account.shift.map((e,index)=>(

                        <StyledCard onClick={()=> handleNavigation(e)} key={index}>
                            <CardHeader title='hello'/>
                            <CardContent>
                            { `hello world, ${e}, ${index} `}
                            </CardContent>
                        </StyledCard>
                    ))
                   
                }
               

            </Grid>


{
                (account.category == 'Teacher') ? (

                <Grid item style={{border: "1px solid red"}} xs={12} sm={10}>
                     <FormLabel>Your Teachers: </FormLabel>
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