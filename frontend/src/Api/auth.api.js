import axios from "../utils/axiosInstance.js"

const sigup = async(name,email,password) => {
    try{
        const response = await axios.post("/user/signup",{name,email,password})
        // console.log(response.data)
        return response.data
    }catch (error){
        throw error.response.data
    }
}

const sigin = async(email,password) => {
    try{
        const response = await axios.post("/user/signin",{email,password},{withCredentials: true,})
        return response.data
    }catch (error){
        throw error.response.data
    }
}

const getAccessToken = async() =>{
    try{
        const response = await axios.post("/user/refresh-token")
        return response.data
    }catch(error){
        throw error.response.data
    }
}

const logout = async() => {
    try{
        const response = await axios.post("/user/logout",{},{withCredentials: true,})
        return response.data
    }
    catch(error){
        throw error.response.data
    }
}

export {sigup,sigin,getAccessToken,logout}
