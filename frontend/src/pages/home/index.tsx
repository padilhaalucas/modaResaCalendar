import React from 'react'
import { useHistory } from 'react-router-dom'

import { useAppointmentActions, useAppointment } from '../../hooks/appointment'

import './styles.css'

export const Home = () => {
  const history = useHistory()

  const { getAllAppointments } = useAppointmentActions()
  const { allAppointments } = useAppointment()

  console.log(allAppointments, 'ALL APPOINTMENTS')

  const handleTest = () => {
    const clientQuery = "{\n  allClients {\n    id: id\n    brandName: brandName\n appointments: appointments\n  }\n}\n"
    const staffQuery = "{\n  allStaffMembers {\n    id: id\n    email: email\n    firstName: firstName\n    lastName: lastName\n  }\n}\n"

    getAllAppointments({
      "operationName":null,
      "variables":{},
      "query": clientQuery
    })
    // axios.post('http://localhost:4000/graphql', {
    //   "operationName":null,"variables":{},"query":"{\n  allClients {\n    id: id\n    brandName: brandName\n  }\n}\n"
    // })

    // axios.post('http://localhost:4000/graphql', 
    //   {"operationName":null,"variables":{},"query":"{\n  allStaffMembers {\n    id: id\n    email: email\n    firstName: firstName\n    lastName: lastName\n  }\n}\n"}
    // )
  }

  return (
    <div className={"homeMainContainer"}>
      <h1 className={"title"}>Welcome</h1>
      <div>
        <button
          className={"button"}
          onClick={() => history.push('/createAppointment')}
        >
            Do an appointment
        </button>

        <button
          className={"button"}
          //onClick={() => history.push('/allAppointments')}
          onClick={() => handleTest()}
        >
            Check All Appointments
        </button>
      </div>
    </div>
  )
}
