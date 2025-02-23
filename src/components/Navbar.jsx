import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken,setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  // const logout = () => {

  //   setAToken("")
  //   localStorage.removeItem('aToken')
  //   navigate('/')

  // }
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
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-sm'>
        {/* <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo} alt="" /> */}
        <a href="#" className="flex items-center mr-2">
          <img className="h-8 me-3 mt-1 border-[2px] border-teal-600 rounded-b-full" src={assets.logo} alt="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">Prescript</span>
        </a>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar