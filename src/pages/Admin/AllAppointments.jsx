import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { RxCross1  } from "react-icons/rx";

const AllAppointments = () => {

  const {aToken,appointments,getAllAppointments,cancelAppointment} = useContext(AdminContext)
  const {calculateAge,slotDateFormat,currency} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  },[aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white dark:bg-dar dark:text-whi border rounded text-sm max-h-[80vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-teal-700 text-white'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item,index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b hover:bg-gray-50 dark:hover:bg-dar2'>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 object-contain border border-slate-300 rounded-full' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency} {item.docData.fees}</p>
            {
              item.cancelled 
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted 
              ? <p className='text-green-500 text-xs font-medium'>Completed</p>
              :<p className='bg-red-50 cursor-pointer p-2 rounded-full w-[38px] border-red-300 border' onClick={()=>cancelAppointment(item._id)}><RxCross1  className='text-red-700 text-xl' /></p>
            }
            
          </div>
        ))}

      </div>
    </div>
  )
}

export default AllAppointments