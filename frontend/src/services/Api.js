import axios from 'axios'

const API_OBJECT = {
    createNewAccount: {method: 'post', url: '/create/newAccount'},
    login: {method: 'post', url: '/login'},
    saveImages: {method: 'post', url:'/save/image'},
    saveCreatedAssignment: {method: 'post', url:'/save/Assignment'},
    getAllAssignment: {method: 'get', url: '/class', params: true},
    getAssignmentById: {method: 'get', url: '/class/assignment', params:true},
    updateAssignment: {method: 'put', url: '/class/assignment/update'},
    deleteAssignment: {method: 'delete', url: '/class/assignment/delete'},
    saveStudentAssignmentSubmission: {method: 'post', url: '/save/student/assignment'},
    getStuTeachList: {method: 'get', url:'/list/category', params:true},
    getStudentAssignmentSubmission: {method: 'get', url: '/get/student/assignment', params:true}
    
}


const axiosInstance = axios.create({
    baseURL: 'http://localhost:6969',
    timeout: 10000

})

const getType =(value,body)=>{
    if(value.params){
        // console.log(value)
        // console.log("IM here")
        return {params: body}
    }else if(value.query){
    
        //   if(typeof body == 'object'){
        //     // console.log(body)
          
        //     return {query: body._id}
        // }
        return body

   
    }else{
        return {}
    }

    

}


axiosInstance.interceptors.request.use(
    function (config){ 

        // console.log(config.data)
        
        if(config.TYPE.params){
            config.params = config.TYPE.params
            // console.log(config.params)
        }else if(config.TYPE.query){
            // config.url = config.url + '/' + config.TYPE.query
            // console.log(config.url)
        }

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

for(const [key,value] of Object.entries(API_OBJECT)){
    API[key] = (body) => {
    //  console.log(body)
        return axiosInstance({ 
            method: value.method,
            url: value.url,
            data: body,
            TYPE: getType(value,body)
           
        })
    }
}
                    
export {API}
