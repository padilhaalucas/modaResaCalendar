import React from 'react'

import CalendarComponent from '../../components/Calendar/index'

import './styles.css'

export const AllAppointments = (props: any) => {

  const appointments = props?.location?.state?.allAppointments
  const allStaffMembers = props?.location?.state?.allStaffMembers
  const clients = props?.location?.state?.allClients
  
  return (
    <div className={"desktopMainContainer"}>
      <CalendarComponent appointments={appointments} clients={clients} allStaffMembers={allStaffMembers} />
      <div id={"calendar"}></div>
    </div>
  )
}
