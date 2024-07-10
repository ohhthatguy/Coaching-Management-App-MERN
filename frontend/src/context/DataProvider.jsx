
import { createContext, useState } from "react";

export const DataContext = createContext(null)

const DataProvider = ({children})=>{
    
    const initial = {
        category: '',
        shift: [],
        name: '',
        email: '',
        password: '',
        date: '',
        id: ''
    }
    const[account, setAccount] = useState(initial)
    const[assignmentListUpdated, setAssignmentListUpdated] = useState(false)
    // console.log(account)

    return (
        <DataContext.Provider value={{setAccount, account, assignmentListUpdated, setAssignmentListUpdated}}>
            {children}
        </DataContext.Provider>
    )


}

export default DataProvider