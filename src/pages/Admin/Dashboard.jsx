import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { RxCross1  } from "react-icons/rx";
import { AppContext } from '../../context/AppContext';


const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white dark:bg-dar2 dark:border-[1px] p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-whi'>{dashData.doctors}</p>
            <p className='text-gray-400 dark:text-whi2'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 dark:bg-dar2 dark:border-[1px] bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-whi'>{dashData.appointments}</p>
            <p className='text-gray-400 dark:text-whi2'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 dark:bg-dar2 dark:border-[1px] bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-whi'>{dashData.users}</p>
            <p className='text-gray-400 dark:text-whi2'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white dark:bg-dar'>

        <div className='flex items-center bg-slate-200 dark:bg-dar2 gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold dark:text-whi'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>

          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 dark:hover:bg-dar2' key={index}>
              <img className='rounded-full w-10 dark:border-[1px]' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium dark:text-whi'>{item.docData.name}</p>
                <p className='text-gray-600 dark:text-whi2'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {
                item.cancelled 
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                :<p className='bg-red-50 cursor-pointer p-2 rounded-full w-[38px] border-red-300 border' onClick={() => cancelAppointment(item._id)}><RxCross1 className='text-red-700 text-xl' /></p>
              }
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard