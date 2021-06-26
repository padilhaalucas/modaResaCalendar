import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Swal from 'sweetalert2'

import { useStaffMembers } from 'hooks/staff'
import { useAppointment } from 'hooks/appointment'
import { useClient } from 'hooks/client'
import { useRefresh } from 'hooks/window'

import "react-modern-calendar-datepicker/lib/DatePicker.css"
import './styles.css'

export const CreateAppointment = (props: any) => {
  const [body, setBody] = useState<any>({})
  const [day, setDay] = useState<any>(null)
  const [staffMember, setStaffMember] = useState('')
  const [client, setClient] = useState('')
  const [openStaff, setOpenStaff] = useState(false)
  const [openClient, setOpenClient] = useState(false)

  const pickedDay = new Date(day?.year, day?.month - 1, day?.day)

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
  
  const handleSubmit = () => {
    setBody({ staffMember, client, pickedDay })
  }

  useEffect(() => {
    if ((body?.staffMember !== undefined && body?.client !== undefined && body?.pickedDay !== undefined)) {
      handleAlert()
    }
  }, [body])

  function renderSelectStaff() {
    const handleChange = (event: any) => {
      setStaffMember(event?.target?.value)
    }

    const handleClose = () => {
      setOpenStaff(false)
    }
  
    const handleOpen = () => {
      setOpenStaff(true)
    }
  
    return (
      <div className={'selectContainer'}>
        <Button className={'buttonMaterialUI'} onClick={handleOpen}>
          Staff Member
        </Button>
        <FormControl className={'formControl'}>
          <InputLabel id="demo-controlled-open-select-label"></InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openStaff}
            onClose={handleClose}
            onOpen={handleOpen}
            value={staffMember}
            onChange={handleChange}
          >
            {
              state?.allStaffMembers?.map((member: any) => {
                return <MenuItem value={member?.id}>{`${member?.firstName} ${member?.lastName}`}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </div>
    )
  }

  function renderSelectClient() {
    const handleChange = (event: any) => {
      setClient(event?.target?.value)
    }
  
    const handleClose = () => {
      setOpenClient(false)
    }
  
    const handleOpen = () => {
      setOpenClient(true)
    }
  
    return (
      <div className={'selectContainer'}>
        <Button className={'buttonMaterialUI'} onClick={handleOpen}>
          Select Client
        </Button>
        <FormControl className={'formControl'}>
          <InputLabel id="demo-controlled-open-select-label"></InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openClient}
            onClose={handleClose}
            onOpen={handleOpen}
            value={client}
            onChange={handleChange}
          >
            {
              state?.allClients?.map((client: any) => {
                return <MenuItem value={client?.id}>{`${client?.brandName}`}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </div>
    )
  }

  const handleAlert = useCallback(() => {
    Swal.fire({
      title: '<strong>Scheduled!</strong>',
      icon: 'success',
      html:
        `Client ID: ${body?.client} <br/> ` +
        `Staff Member ID: ${body?.staffMember} <br/>` +
        `Date: ${day?.day}/${day?.month}/${day?.year}`,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
  }, [body])

  return (
    <div className={"createAppointmentContainer"}>
      <Calendar value={day} onChange={setDay} calendarClassName={'createAppointmentCalendar'} />
      <div className={'createAppointmentContent'}>
        <div className={'selectAppointment'}>
          { renderSelectStaff() }
          { renderSelectClient() }
        </div>
        <button onClick={() => handleSubmit()} className={'button'}>Schedule!</button>
      </div>

    </div>
  )
}
