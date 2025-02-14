import axios from "axios";
import { SERVER_URL } from './serverUrl';


export const registerCompany = async(data)=>{
    return await axios.post(`${SERVER_URL}/api/jobfair/companies`, data)
} 

export const getAllCompanies = async()=>{
    return await axios.get(`${SERVER_URL}/api/jobfair/companies`)
}


export const deleteCompanyByID = async (id)=>{
    return await axios.delete(`${SERVER_URL}/api/jobfair/companies/${id}`)
}