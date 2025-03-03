import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { PieChart } from '@mui/x-charts/PieChart';
// import { AdminContext } from '../../context/AdminContext';

const DoctorDashboard = () => {

  const { dToken, getDashData, dashData, cancelAppointment, completeAppointment, appointments, getAppointments,doctors,getAllDoctors } = useContext(DoctorContext)
  const { slotDateFormat } = useContext(AppContext)
  // const { doctors,getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
      getAppointments()
      
      console.log("DashData :",dashData)
      console.log("Latest :",dashData.latestAppointments)
      console.log("Appoi :",appointments)
      
    }
  }, [dToken])

  //For Charts
  const [cancelledCount, setCancelledCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const countAppointments = (appointments) => {
    let cancelled = 0;
    let completed = 0;

    appointments.forEach((appointment) => {
      if (appointment.cancelled) cancelled++;
      if (appointment.isCompleted) completed++;
    });

    setCancelledCount(cancelled);
    setCompletedCount(completed);
  };

  useEffect(() => {
      countAppointments(appointments);
      console.log("cancelledCount :",cancelledCount)
      console.log("completedCount :",completedCount)
      getAllDoctors()
      console.log("TotalDoc :",doctors)
      console.log(doctors.length)
  }, [appointments]);



  return dashData && (
    <div className='m-5 flex flex-col-reverse md:flex md:flex-row w-full'>
      <div className='md:w-2/3'>
        {/* <div className='flex flex-wrap gap-3 items-center justify-center '>

          <div className='flex items-center gap-2 bg-white dark:bg-dar dark:border-[1px] p-4 min-w-72 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.appointments_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600 dark:text-whi'>{dashData.appointments}</p>
              <p className='text-gray-400 dark:text-whi2'>Appointments</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-white dark:bg-dar dark:border-[1px] p-4 min-w-72 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.patients_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600 dark:text-whi'>{dashData.patients}</p>
              <p className='text-gray-400 dark:text-whi2'>Patients</p>
            </div>
          </div>

        </div> */}

        <div className='bg-white dark:bg-dar '>

          <div className='flex dark:text-whi dark:bg-dar2 items-center gap-2.5 px-4 py-4 mt-5 rounded-t border bg-slate-200'>
            <img src={assets.list_icon} alt="" />
            <p className='font-semibold'>Latest Bookings</p>
          </div>
          {
            dashData.latestAppointments.length > 0 ?


              <div className=' border border-t-0'>

                {dashData.latestAppointments.map((item, index) => (
                  <div className='flex items-center px-6 py-3 border border-slate-100 border-b-[0.5px] gap-3 hover:bg-gray-100 dark:hover:bg-dar2' key={index}>
                    <img className='w-9 h-9 object-contain border border-slate-300 rounded-full' src={item.userData.image} alt="" />
                    <div className='flex-1 text-sm'>
                      <p className='text-gray-800 font-medium dark:text-whi'>{item.userData.name}</p>
                      <p className='text-gray-600 dark:text-whi2'>{slotDateFormat(item.slotDate)}</p>
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

      <div className='md:w-1/3 flex flex-col items-center'>
        <div className='flex items-center justify-center w-[250px] h-[150px] '>
          <PieChart
            series={[
              {
                innerRadius: 30, // Donut effect
                outerRadius: 100, // Controls pie size
                labelPosition: "none", // Ensures labels don't take up space
                labelLine: false, // Removes label connector lines
                paddingAngle: 3, // Avoid unnecessary spacing between slices
                startAngle: -90,
                endAngle: 90,
                data: [
                  { id: 0, value: dashData.appointments,color:'#2501FF' },
                  { id: 1, value: dashData.patients ,color:"#12F917"},
                  { id: 2, value: (dashData.appointments)-(completedCount+cancelledCount) ,color:"#CFE511"},
                  { id: 3, value: completedCount,color:"#499B9B" },
                  { id: 4, value: cancelledCount ,color:"#F6170C"},
                  { id: 5, value: doctors.length,color:"#9D4EED" }
                ]
              },
            ]}
            margin={{ top: 130, bottom: 0, left: 0, right: 0 }} // Remove extra space
          />
        </div>
        <div className='flex justify-center pb-3'>
              <p className=''>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#2501FF] w-[3px] px-[8px] '></span><span>My Appointments : </span><span>{dashData.appointments}</span></p>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#12F917] w-[3px] px-[8px] '></span><span>My Patients : </span><span>{dashData.patients}</span></p>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#9D4EED] w-[3px] px-[8px] '></span><span>Doctors : </span><span>{doctors.length}</span></p>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#CFE511] w-[3px] px-[8px] '></span><span>Pending : </span><span>{(dashData.appointments)-(completedCount+cancelledCount)}</span></p>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#499B9B] w-[3px] px-[8px] '></span><span>Completed : </span><span>{completedCount}</span></p>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#F6170C] w-[3px] px-[8px] '></span><span>Cancelled : </span><span>{cancelledCount}</span></p>
              </p>
            </div>
      </div>

    </div>
  )
}

export default DoctorDashboard