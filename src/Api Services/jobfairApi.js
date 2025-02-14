import axios from "axios";
import { SERVER_URL } from './serverUrl';


export const registerCompany = async(data)=>{
    return await axios.post(`${SERVER_URL}/api/jobfair/companies`, data)
} 