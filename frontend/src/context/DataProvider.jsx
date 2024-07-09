
import { createContext, useState } from "react";

export const DataContext = createContext(null)

const DataProvider = ({children})=>{
    
    const initial = {
        category: '',
        shift: [],
        name: '',
        email: '',
        password: '',
        date: ''
    }
    const[account, setAccount] = useState(initial)

    return (
        <DataContext.Provider value={{setAccount, account}}>
            {children}
        </DataContext.Provider>
    )


}

export default DataProvider