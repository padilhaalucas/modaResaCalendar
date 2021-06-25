import React, { useEffect, useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useStaffMembersActions, useStaffMembers } from 'hooks/staff'
import { useAppointmentActions, useAppointment } from '../../hooks/appointment'
import { useClientActions, useClient } from '../../hooks/client'
import { useRefresh } from '../../hooks/window'

import './styles.css'

export const Home = () => {
  const history = useHistory()
  
    const { getAllStaffMembers } = useStaffMembersActions()
    const { allStaffMembers } = useStaffMembers()

  const { getAllAppointments } = useAppointmentActions()
  const { allAppointments } = useAppointment()

  const { getAllClients } = useClientActions()
  const { allClients } = useClient()

  const { wasRefreshed } = useRefresh()

  const [shouldFetchData, setShouldFetchData] = useState(true)



  console.log(allAppointments, 'ALL APPOINTMENTS')
  console.log(allClients, 'ALL CLIENTS')
  console.log(allStaffMembers, 'ALL STAFF MEMBERS')

  const getDataFirstRender = () => {
    const appointmentQuery = "{\n  allAppointments {\n    id: id\n    startAt: startAt\n    endAt: endAt\n    clientId: clientId\n    staffMemberId: staffMemberId\n  }\n}\n"

    const clientQuery = "{\n  allClients {\n    id: id\n    brandName: brandName\n  }\n}\n"
    const staffQuery = "{\n  allStaffMembers {\n    id: id\n    email: email\n    firstName: firstName\n    lastName: lastName\n  }\n}\n"
    const createAppointmentQuery = "mutation CreateAppointment {\n  createAppointment(\n    appointment: {startAt: \"25/06/2021\", endAt: \"27/06/2021\", clientId: \"ckqbhehxt0018rcatmsx74dd9\", staffMemberId: \"ckqbhehx40000rcatmk72cthc\"}\n  ) {\n    startAt\n    endAt\n    clientId\n    client {\n      id\n      brandName\n      appointments {\n        id\n        clientId\n      }\n    }\n    staffMember {\n      id\n      firstName\n      lastName\n      appointments {\n        id\n        staffMemberId\n      }\n    }\n  }\n}\n"
    
    getAllStaffMembers({
      "operationName":null,
      "variables":{},
      "query": staffQuery
    })

    getAllAppointments({
      "operationName":null,
      "variables":{},
      "query": appointmentQuery
    })
  
    getAllClients({
      "operationName":null,
      "variables":{},
      "query": clientQuery
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState = {
    allStaffMembers,
    allAppointments,
    allClients
  }

  useEffect(() => {
    if(!wasRefreshed) {
      if(shouldFetchData) {
        getDataFirstRender()
        localStorage.setItem(
          'appointmentsScreenState',
          JSON.stringify(initialState)
        )
        setShouldFetchData(false)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  console.log(state?.allAppointments, 'ESTADO')
  console.log(localStorage, 'local storage')

  return (
    <div className={"homeMainContainer"}>
      <h1 className={"title"}>your <br/>agenda</h1>
      <div>
        {/* <button
          className={"button"}
          onClick={() => history.push('/createAppointment')}
        >
            Do an appointment
        </button> */}

        <button
          className={"button"}
          onClick={() => history.push({
            pathname: '/allAppointments',
            state: {
              fromHome: true,
              allStaffMembers: state?.allStaffMembers,
              allAppointments: state?.allAppointments,
              allClients: state?.allClients
            }
          })}
          //onClick={() => handleTest()}
        >
            Check All Appointments
        </button>
      </div>
    </div>
  )
}
