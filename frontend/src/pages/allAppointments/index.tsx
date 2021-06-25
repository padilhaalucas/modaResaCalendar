import React from 'react'

import CalendarComponent from '../../components/Calendar/index'

import './styles.css'

export const AllAppointments = () => {

  return (
    <div className={"desktopMainContainer"}>
      <CalendarComponent />
      <div id={"calendar"}></div>
    </div>
  )
}
