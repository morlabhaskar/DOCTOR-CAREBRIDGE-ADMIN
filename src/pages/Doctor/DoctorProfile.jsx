import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const { dToken, getProfileData, profileData, setProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='w-full'>

      <div className='flex flex-col gap-4 m-5 '>

        <div className='md:flex'>
          <img className='dark:border-[1px] dark:border-slate-300 min-w-56 min-h-60 max-w-56 max-h-60 border border-dar object-contain sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
          <div className=' p-2'>
            <p className='flex items-center gap-2 text-3xl font-medium text-fray-700 dark:text-whi'>{profileData.name}</p>
            <div className='flex items-center gap-2 mt-1 text-gray-600 dark:text-whi2'>
              <p>{profileData.degree} - {profileData.speciality}</p>
              <button className='py-0.5 px-1 border text-xs rounded-full min-w-20 max-w-20'>{profileData.experience}</button>
            </div>
          </div>
        </div>

        {/* Doc Info : name,degree,experience */}
        <div className='flex-1 border border-stone-300 rounded-lg p-8 py-7 bg-white dark:bg-dar'>


          {/* Doc About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3 dark:text-whi'>About :</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1 dark:text-whi2'>
              {profileData.about}
            </p>
          </div>

          <p className='text-gray-600 font-medium mt-4 dark:text-whi2'>
            <span className='dark:text-whi'>Appointment fee :</span> <span>{currency} {isEdit ? <input type='number' className='dark:bg-dar2 outline-none pl-2' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
          </p>

          <div className='flex gap-2 py-2'>
            <p className='dark:text-whi'>Address :</p>
            <p className='text-sm dark:text-whi2'>
              {isEdit ? <input type='text' className='dark:bg-dar2 outline-none pl-2' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type='text' className='dark:bg-dar2 outline-none pl-2' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2 dark:text-whi2'>
            <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} name="" id="" />
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
              ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all dark:text-whi'>Save Changes</button>
              : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all dark:text-whi'>Edit</button>
          }

        </div>


      </div>

    </div>
  )
}

export default DoctorProfile