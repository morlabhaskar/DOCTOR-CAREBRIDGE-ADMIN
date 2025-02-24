import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { assets } from '../../assets/assets'


const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment,docappLoad } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)


  useEffect(() => {
    if (dToken) {
      getAppointments()
    }

  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      {
        docappLoad
        ? ( <div>Loading...</div>)
        : appointments.length > 0 ?
        (<div className='bg-white dark:bg-dar border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_2.5fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-primary text-white'>
          <p>#</p>
          <p>Patient</p>
          <p>Gender</p>
          <p>Mobile</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => {
            return (
              <div className='flex flex-wrap justify-between max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_2.5fr_1fr_1fr] gap-1 items-center text-gray-500 dark:text-whi2 py-3 px-6 border-b hover:bg-gray-50 dark:hover:bg-dar2' key={index}>
                <p className='max-sm:hidden'>{index + 1}</p>
                <div className='flex items-center gap-2'>
                  <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                  <p>{item.userData.name}</p>
                </div>
                <p className='text-xs'>{item.userData.gender}</p>
                <p className='text-xs'>{item.userData.phone}</p>
                
                <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p>{currency} {item.docData.fees}</p>
                {
                  item.cancelled 
                  ? <p className='text-red-600 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                  ? <p className='text-green-600 text-xs font-medium'>Completed</p>
                  : <div className='flex gap-3'>
                  <p className='border p-1 border-red-500 rounded-full bg-red-50' onClick={() => cancelAppointment(item._id)}>
                    <RxCross1 className='text-2xl cursor-pointer text-red-500' />
                  </p>
                  <p className='border p-1 border-green-500 rounded-full bg-green-50' onClick={() => completeAppointment(item._id)}>
                    <AiOutlineCheck className='text-2xl cursor-pointer text-green-500' />
                  </p>
                </div>
                }
                
              </div>
            )
          })
        }

      </div>)
      :(<div className='min-h-[70vh] max-h-[70vh] flex justify-center items-center'>
                <img className='h-[60vh]' src={assets.nodata} alt="" />
              </div>)
      }


    </div>
  )
}

export default DoctorAppointments