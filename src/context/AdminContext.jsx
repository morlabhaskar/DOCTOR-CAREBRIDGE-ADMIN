import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "")
    const [doctors,setDoctors] = useState([])
    const [appointments,setAppointments] = useState([]) 
    const [dashData,setDashData] = useState(false)
    

    // const backendUrl = import.meta.env.VITE_BACKEND_URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const getAllDoctors = async () => {
        try {
            if (!aToken) {
                console.log("\u274C Missing Admin Token!");
            }
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{aToken}})
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

    // const getAllDoctors = async () => {
    //     try {
    //         if (!aToken) {
    //             console.error("❌ Missing Admin Token!");
    //             return;
    //         }
    
    //         const { data } = await axios.post(
    //             backendUrl + "/api/admin/all-doctors",
    //             {}, // Empty body if no payload is needed
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${aToken}`, // ✅ Correct token format
    //                 },
    //             }
    //         );
    
    //         if (data.success) {
    //             setDoctors(data.doctors);
    //             console.log(data.doctors);
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || "Error fetching doctors");
    //     }
    // };
    

    const changeAvailability = async (docId) => {
        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteDoctor = async (docId) => {
        try {
            
            // const {data} = await axios.delete(backendUrl + '/api/admin/delete-doctor',{docId},{headers:{aToken}})
            const { data } = await axios.delete(backendUrl + '/api/admin/delete-doctor', {
                headers: { aToken }, 
                data: { docId } // ✅ Correct way to send a body in DELETE request
            });
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    // const deleteDoctor = async (docId) => {
    //     try {
    //         const { data } = await axios.delete(`${backendUrl}/api/admin/delete-doctor`, {
    //             headers: {
    //                 Authorization: `Bearer ${aToken}` // ✅ Correct header format
    //             },
    //             data: { docId } // ✅ Send docId correctly
    //         });
    
    //         console.log("🟢 Server Response:", data);
    
    //         if (data.success) {
    //             toast.success(data.message);
    //             getAllDoctors(); // Refresh list after deletion
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         console.log("🔴 Axios Error:", error.response?.data?.message);
    //         toast.error(error.response?.data?.message || "Error deleting doctor");
    //     }
    // };
    
    

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}})
            if (data.success) {
                console.log(data.appointments)
                setAppointments(data.appointments)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
            if (data.success) {
                console.log(data.dashData)
                setDashData(data.dashData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        getDashData,
        dashData,
        deleteDoctor
        

    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider
