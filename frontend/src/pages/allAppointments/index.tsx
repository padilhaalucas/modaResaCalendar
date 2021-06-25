import React, { useEffect, useReducer } from 'react'

import { useRefresh } from '../../hooks/window'
import { useStaffMembers } from 'hooks/staff'
import { useAppointment } from '../../hooks/appointment'
import { useClient } from '../../hooks/client'

import CalendarComponent from '../../components/Calendar/index'

import './styles.css'

export const AllAppointments = (props: any) => {

  const { wasRefreshed } = useRefresh()

  const { allStaffMembers } = useStaffMembers()
  const { allAppointments} = useAppointment()
  const { allClients } = useClient()

  const fromHome = props?.location?.state?.fromHome

  const initialState = {
    allStaffMembers,
    allAppointments,
    allClients
  }

  useEffect(() => {
    if(!wasRefreshed) {
      if(fromHome) {
        localStorage.setItem(
          'appointmentsScreenState',
          JSON.stringify(initialState)
        )
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromHome])

  const reducer = (firstState: any, action: string) => {
    let reducerState: any = {}

    let auxStateOnRAM = localStorage.getItem('appointmentsScreenState')
    const stateOnRAM = JSON.parse(`${auxStateOnRAM}`)

    switch (action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM
    }

    localStorage.removeItem('appointmentsScreenState')
    localStorage.setItem('appointmentsScreenState', JSON.stringify(reducerState))

    return reducerState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect((): any => {
    if (wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasRefreshed])
  
  return (
    <div className={"desktopMainContainer"}>
      <CalendarComponent />
      <div id={"calendar"}></div>
    </div>
  )
}
