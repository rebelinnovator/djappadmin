import axios from "axios";
import authHeader from "./auth-header";
import API_Config from "./config"

const getAllUser = ()=>{
    return axios.get(API_Config.API_URL + "usermanage", { headers:authHeader() });
}
const saveUserInfo = (user)=>{
    console.log(user)
    return axios.post(API_Config.API_URL + "usermanage/save",{
        user
    } ,{headers:authHeader() });
}
export default{
    getAllUser,
    saveUserInfo
}
