import { useContext, useEffect, useState } from "react"
import Header from "../Header/Header"
import { Button,Box,Typography, Card, CardHeader, CardContent, Paper, styled, Grid, FormLabel } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
import { useNavigate } from "react-router-dom"
import { API } from "../../services/Api"
import EntityList from "./EntityList/EntityList"



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
    const [entityList, setEntityList] = useState()
    const {account} = useContext(DataContext)
    console.log(account)

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
    console.log(entityList)
    if(entityList){
        entityList.map((e)=>{
            console.log(e._id)
        })
        
    }
   
    useEffect(()=>{
        const getListOfTeacherOrStudent = async()=>{
            try{
               console.log(account)
                    let response = await API.getStuTeachList({account: account})
                    if(!response.isSuccess){
                        console.log("some error on frontend side in getting list")
                    }else{
                        console.log("getting student  / teacher list is successfulll. DATA: ", response.data)
                        setEntityList(response.data)
                    }
    
                
    
    
            }catch(err){
                console.log("ERROR: ",err)
            }
    
        }
        getListOfTeacherOrStudent()

    },[account._id])

   

    return (<>
    <Header />
        <Grid container direction="column" style={{marginTop: "5rem", border: "1px solid blue"}} rowSpacing={2}>

            <Grid style={{border: "1px solid black"}} item lg={12} md={12} sd={12} xs={12}>
                <Paper >
                    <Typography variant="h5"> hello {account.name} </Typography>
                    {/* <Button onClick={()=>getListOfTeacherOrStudent()}>CALL API TEST</Button> */}
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
                {
                    account.category === 'Teacher' ? 
                    <FormLabel>Your Student: </FormLabel> :
            <FormLabel>Your Teacher: </FormLabel>


                }

                            
                    

                            <Grid item style={{ display: "flex", justifyContent: "space-around"}} xs={12} sm={10}>
                              
                                {
                                    (entityList )&& <EntityList entity={entityList} />
                                

                                }

                            </Grid>

        </Grid>
    </>)
}

export default Home