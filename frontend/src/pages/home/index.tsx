import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import { useStaffMembersActions } from 'hooks/staff'
import { useAppointmentActions } from '../../hooks/appointment'
import { useClientActions } from '../../hooks/client'

import './styles.css'

export const Home = () => {
  const history = useHistory()
  
  const { getAllStaffMembers } = useStaffMembersActions()
  const { getAllAppointments } = useAppointmentActions()
  const { getAllClients } = useClientActions()

  const [shouldFetchData, setShouldFetchData] = useState(true)

  const getDataFirstRender = useCallback(() => {
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
  }, [shouldFetchData])

  useEffect(() => {
    if(shouldFetchData) {
      getDataFirstRender()
      setShouldFetchData(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchData])

  const handleAllAppointments = () => {
    
    history.push({
      pathname: '/allAppointments',
      state: {
        fromHome: true
      }
    })
  }

  return (
    <div className={"homeMainContainer"}>
      <h1 className={"title"}>my <br/>agenda</h1>
      <h1 className={'byLucas'}>by <span>lucas padilha</span></h1>
      <div>
        <button
          className={"button"}
          onClick={() => history.push('/createAppointment')}
          >
            Make an appointment
        </button>

        <button
          className={"button"}
          onClick={() => handleAllAppointments()}
          >
            All Appointments
        </button>
      </div>
    </div>
  )
}
