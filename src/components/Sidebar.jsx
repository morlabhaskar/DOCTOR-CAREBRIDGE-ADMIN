import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

  return (
    <div className='min-h-[92vh] bg-white dark:bg-dar border-r border-l '>
        
        {
            aToken && <ul className='text-[#515151]'>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-56 cursor-pointer ${isActive ? 'bg-[#F2F3FF] dark:text-whi2 dark:bg-slate-700 border-r-4 border-primary' : 'dark:text-whi2'}`} to={"/admin-dashboard"}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-56 cursor-pointer ${isActive ? 'bg-[#F2F3FF] dark:text-whi2 dark:bg-slate-700 border-r-4 border-primary' : 'dark:text-whi2'}`} to={"/all-appointments"}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block dark:text-whi2'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-56 cursor-pointer ${isActive ? 'bg-[#F2F3FF] dark:text-whi2 dark:bg-slate-700 border-r-4 border-primary' : 'dark:text-whi2'}`} to={"/add-doctor"}>
                    <img src={assets.add_icon} alt="" />
                    <p className='hidden md:block dark:text-whi2'>Add Doctor</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-56 cursor-pointer ${isActive ? 'bg-[#F2F3FF] dark:text-whi2 dark:bg-slate-700 border-r-4 border-primary' : 'dark:text-whi2'}`} to={"/doctors-list"}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block dark:text-whi2'>Doctors List</p>
                </NavLink>

            </ul>
        }
        {
            dToken && <ul className='text-[#515151] border-r'>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-56 cursor-pointer ${isActive ? 'bg-[#F2F3FF] dark:text-whi2 dark:bg-slate-700 border-r-4 border-primary' : 'dark:text-whi2'}`} to={"/doctor-dashboard"}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block dark:text-whi2'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-56 cursor-pointer ${isActive ? 'bg-[#F2F3FF] dark:text-whi2 dark:bg-slate-700 border-r-4 border-primary' : 'dark:text-whi2'}`} to={"/doctor-appointments"}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block dark:text-whi2'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-56 cursor-pointer ${isActive ? 'bg-[#F2F3FF] dark:text-whi2 dark:bg-slate-700 border-r-4 border-primary' : 'dark:text-whi2'}`} to={"/doctor-profile"}>
                    <img src={assets.add_icon} alt="" />
                    <p className='hidden md:block dark:text-whi2'>Profile</p>
                </NavLink>

            </ul>
        }
    </div>
  )
}

export default Sidebar