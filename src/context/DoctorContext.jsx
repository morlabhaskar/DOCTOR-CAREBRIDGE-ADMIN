import { createContext,useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    //api not working when || "http://localhost:4000" is not added
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; 

    const [dToken,setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "")
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData] = useState(false)
    const [docappLoad,setDocappLoad] = useState(true)
    const [doctors,setDoctors] = useState([])

    const getAppointments = async () => {
        if (!dToken) {
            console.warn("No token available");
            return;
        }
        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)
                setDocappLoad(false)
                
            }
            else{
                toast.error(data.message)
                setDocappLoad(false)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()   
            }
            else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()   
            }
            else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{dToken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getAllDoctors = async () => {
        try {
            if (!dToken) {
                console.log("\u274C Missing Admin Token!");
            }
            const {data} = await axios.post(backendUrl + '/api/doctor/all-doctors',{},{headers:{dToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }


    const value = {
        dToken,
        setDToken,
        backendUrl,
        getAppointments,
        appointments,
        setAppointments,
        completeAppointment,
        cancelAppointment,
        getDashData,
        dashData,
        setDashData,
        getProfileData,
        profileData,
        setProfileData,
        docappLoad,
        doctors,
        getAllDoctors

    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider

