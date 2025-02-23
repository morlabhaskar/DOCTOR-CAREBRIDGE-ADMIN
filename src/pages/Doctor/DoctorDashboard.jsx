import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";

const DoctorDashboard = () => {

  const { dToken, getDashData, dashData, setDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-72 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-72 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>

        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        {
          dashData.latestAppointments.length > 0 ?


            <div className='pt-4 border border-t-0'>

              {dashData.latestAppointments.map((item, index) => (
                <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                  <img className='rounded-full w-10' src={item.userData.image} alt="" />
                  <div className='flex-1 text-sm'>
                    <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                    <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                  </div>
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
              ))}

            </div>
            : <div className='flex justify-center items-center'>
              <img className='h-[30vh]' src={assets.nodata} alt="" />
            </div>
        }

      </div>

    </div>
  )
}

export default DoctorDashboard