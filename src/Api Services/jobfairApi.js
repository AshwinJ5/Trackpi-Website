import axios from "axios";


export const registerCompany = async(data)=>{
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/jobfair/companies`, data)
} 

export const getAllCompanies = async()=>{
    return await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/jobfair/companies`)
}


export const deleteCompanyByID = async (id)=>{
    return await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/jobfair/companies/${id}`)
}