import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoChevronDownOutline } from "react-icons/io5";

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken, profileData } = useContext(DoctorContext)

  const navigate = useNavigate()

  // const logout = () => {

  //   setAToken("")
  //   localStorage.removeItem('aToken')
  //   navigate('/')
  // }

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  const logout = () => {
    const aToken = localStorage.getItem('aToken');
    const dToken = localStorage.getItem('dToken');

    if (aToken) {
      setAToken("");
      localStorage.removeItem('aToken');
      navigate('/');
    } else if (dToken) {
      setDToken("")
      localStorage.removeItem('dToken');
      navigate('/');
    }
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-2 py-3 border-b-4 border-primary bg-white dark:bg-dar'>
      <div className='flex items-center gap-2 text-sm'>
        {/* <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo} alt="" /> */}
        <a href="#" className="flex items-center mr-2">
          <img className="h-8 me-3 mt-1 border-[2px] border-teal-600 rounded-b-full" src={assets.logo} alt=""/>
          <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">CareBridge</span>
        </a>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 dark:text-whi2 dark:border-whi2'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <div className='flex items-center sm:gap-4 gap-2'>
        {
          dToken
            ?
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              {
                profileData
                ?<img className='w-10 h-10 border border-slate-500 object-contain rounded-full' src={profileData.image} alt="" />
                :<img className='w-10 border border-slate-400 rounded-full' src={assets.upload_area} alt="" />
              }
              <IoChevronDownOutline className='dark:text-whi'/>
              <div className='absolute top-2 -left-24 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block '>
                <div className='bg-gray-100 min-w-44 rounded flex flex-col gap-4 p-4'>
                  <p className='flex gap-2'>
                    <label htmlFor="toggleDarkMode" className="relative inline-block w-12 h-6 cursor-pointer items-center">
                      <input
                        id="toggleDarkMode"
                        type="checkbox"
                        className="sr-only peer"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                      />
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors duration-300"></div>
                      <div className="absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform duration-300 transform peer-checked:translate-x-6"></div>
                    </label>
                    <p>{isDarkMode ? <p className='text-slate-500 hover:text-black'>Light</p> : <p className='text-slate-500 hover:text-black'>Dark</p>}</p>
                  </p>
                  <p onClick={logout} className='text-slate-500 hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <p className='flex gap-2 items-center'>
            <label htmlFor="toggleDarkMode" className="relative inline-block w-12 h-6 cursor-pointer items-center">
              <input
                id="toggleDarkMode"
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform duration-300 transform peer-checked:translate-x-6"></div>
            </label>
            <p>{isDarkMode ? <p className='text-slate-500 hover:text-black'>Light</p> : <p className='text-slate-500 hover:text-black'>Dark</p>}</p>
            <p onClick={logout} className='text-whi hover:text-black cursor-pointer bg-primary px-3 py-1 rounded-full'>Logout</p>
          </p>
        }
      </div>
    </div>
  )
}

export default Navbar