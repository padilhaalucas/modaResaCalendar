import React, { FormEvent, useState } from 'react'
import { DayValue, Calendar } from 'react-modern-calendar-datepicker'
import { useHistory } from 'react-router'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

import "react-modern-calendar-datepicker/lib/DatePicker.css"
import './styles.css'

export const CreateAppointment = () => {
  const history = useHistory()
  const [body, setBody] = useState<string>('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const [day, setDay] = useState<DayValue>(null)
  const [staffMember, setStaffMember] = useState('')
  const [client, setClient] = useState('')
  const [openStaff, setOpenStaff] = useState(false)
  const [openClient, setOpenClient] = useState(false)

  console.log(day, 'DAY')


  function renderSelectStaff() {
    const handleChange = (event: any) => {
      setStaffMember(event.target.value)
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
          Select Staff Member
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
            <MenuItem value={10}>Philip Jose</MenuItem>
            <MenuItem value={20}>Pedro Marcos</MenuItem>
            <MenuItem value={30}>João Macedo</MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  }

  function renderSelectClient() {
    const handleChange = (event: any) => {
      setStaffMember(event.target.value)
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
            value={staffMember}
            onChange={handleChange}
          >
            <MenuItem value={10}>Philip Jose</MenuItem>
            <MenuItem value={20}>Pedro Marcos</MenuItem>
            <MenuItem value={30}>João Macedo</MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  }

  return (
    <div className={"createAppointmentContainer"}>
      <Calendar value={day} onChange={setDay} calendarClassName={'createAppointmentCalendar'} />
      <div className={'createAppointmentContent'}>
        { renderSelectStaff() }
        { renderSelectClient() }
      </div>
    </div>
  );

  // return (
  //   <div className={"createAppointmentContainer"}>
  //     <button onClick={() => history.push('/')}>Back</button>
  //     <form onSubmit={(event) => handleSubmit(event)}>
  //       <label>Post Body</label>
  //       <input
  //         value={body}
  //         onChange={(change) => setBody(change.target.value)}
  //       ></input>
  //       <button type='submit'>Create Post</button>
  //     </form>
  //   </div>
  // )
}
