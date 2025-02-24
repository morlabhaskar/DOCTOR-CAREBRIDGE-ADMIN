import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='font-medium text-2xl dark:text-whi'>All Doctors</h1>
        <div className='w-full flex flex-wrap gap-8 pt-5 gap-y-6'>
        {/* <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 bg-red-100'> */}
          {
            doctors.map((item, index) => (
              <div className='border border-indigo-200 rounded-xl max-w-60 min-w-56 overflow-hidden group dark:border-slate-500 hover:translate-y-[-10px] transition-all duration-500 ' key={index}>
                <img className='bg-indigo-50 dark:bg-dar2 max-h-56 min-h-56 w-full object-contain' src={item.image} alt="" />
                <div className='p-4'>
                  <p className='text-neutral-800 text-lg font-medium dark:text-whi'>{item.name}</p>
                  <p className='text-zinc-600 text-sm dark:text-whi2'>{item.speciality}</p>
                  <div className='mt-2 flex items-center gap-1 text-sm'>
                    <input className='h-[30px] cursor-pointer' onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                    <p className='dark:text-whi2'>Available</p>
                  </div>
                  <button onClick={() => deleteDoctor(item._id)} className='border w-full mt-2 text-red-600 border-red-400 rounded-2xl cursor-pointer hover:bg-red-50 dark:hover:bg-dar2'>Detete</button>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default DoctorsList