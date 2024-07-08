import axios from 'axios'



const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,  

})


axiosInstance.interceptors.request.use(
    function (config){ 
        return config
    },
    function (err){  //this function activates when request( from frontend) fails
        return Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    function (response){ //this function activates when response( from backend) is successful
        return  {isSuccess: true, data: response.data}  
    },
   
    function (error){  //this function activates when response( from backend) fails

        if (error.response) {
            // Server responded with a status other than 2xx
            return Promise.reject({
                isSuccess: false,
                msg: error.response.data.message || 'Error occurred while fetching response from server',
                code: error.response.status,
            });
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                isSuccess: false,
                msg: 'No response received from server',
                code: 500,
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject({
                isSuccess: false,
                msg: error.message,
                code: 500,
            });
        }
    }
    
)


const API = {}

for(const [key,value] of Object.entries(sample_url)){
    API[key] = (body) => {
     
        return axiosInstance({ 
            method: value.method,
            url: value.url,
            data: body,
        })
    }
}
                    
export {API}
