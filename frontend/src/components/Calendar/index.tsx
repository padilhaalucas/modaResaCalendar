import React, { useState, useEffect, useReducer } from 'react'
import Paper from '@material-ui/core/Paper'
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler'
import {
  AppointmentTooltip,
  DateNavigator,
  Appointments,
  TodayButton,
  MonthView,
  Scheduler,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui'

import { useRefresh } from 'hooks/window'

import './styles.css'

const dragDisableIds = new Set([3, 8, 10, 12])

const allowDrag = ({ id }: any) => !dragDisableIds.has(id)
const appointmentComponent = (props: any) => {
  const appointmentStyle = {
    backgroundColor: 'black',
    fontSize: '14px',
    textAlign: 'center',
    paddingTop: '4px'
  }
  if (allowDrag(props)) {
    return <Appointments.Appointment {...props} style={appointmentStyle} />
  } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed', backgroundColor: 'black' }} />;
}

const CalendarComponent = (): any => {

  const { wasRefreshed } = useRefresh()

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

  const [state, dispatch] = useReducer(reducer, JSON.parse(`${localStorage.getItem('appointmentsScreenState')}`))

  useEffect((): any => {
    if (wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasRefreshed])

  console.log(state, 'ESTADO')

  const appointmentsArray = () => {
    let auxArr: any = []
    state?.allAppointments?.forEach((appointment: any) => (
      state?.allClients?.forEach((client: any): any => {
        state?.allStaffMembers?.forEach((member: any) => {
          if (client?.id === appointment?.clientId && member?.id === appointment?.staffMemberId) {
            auxArr = [...auxArr, {
              title: `
                ${client?.brandName} - ${member?.firstName} ${member?.lastName}
              `,
              startDate: new Date(+appointment?.startAt),
              endDate: new Date(+appointment?.endAt),
              id: appointment?.id,
              staffMemberId: appointment?.staffMemberId,
            }]
          }
        })
      })
      ))
    
    return auxArr
  }
    
  const appointmentsToRender = appointmentsArray()
    
  const initialState = {
    data: appointmentsToRender,
    currentDate: new Date('2021-06-07')
  }

  const [calendarState, setCalendarState] = useState(initialState)

  const onCommitChanges = ({ added, changed, deleted}: any): any => {
    setCalendarState((state): any => {
      let { data } = state
      if (added) {
        const startingAddedId = data?.length > 0 ? data[data.length -1].id +1 : 0
        data = [...data, { id: startingAddedId, ...added}]
      }
      if (changed) {
        data = data.map((appointment: any): any => (
          changed[appointment?.id] ? { ...appointment, ...changed[appointment?.id]} : appointment
        ))
      }
      if (deleted !== undefined) {
        data = data.filter((appointment: any): any => appointment?.id !== deleted)
      }

      return { data }
    })
  }

  const Cell = React.useCallback(
    ({ onDoubleClick, startDate, ...restProps }) => {

      return (
        <MonthView.TimeTableCell
          {...restProps}
          startDate={startDate}
        />
      );
    },
  [])

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November', 
    'December'
  ]

  const { data, currentDate } = calendarState

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <h1 id={'title'}>Check your agenda</h1>
        <h1 id={'monthName'}>{monthNames[currentDate.getMonth()]}</h1>
        <h1 id={'scrollTip'}>scroll to see more →</h1>
      </div>
      <Paper>
        <Scheduler
          data={data}
          height={680}
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <MonthView timeTableCellComponent={Cell} />
          <EditingState
            onCommitChanges={onCommitChanges}
          />

          <Appointments appointmentComponent={appointmentComponent} />
          {/* <DragDropProvider
            allowDrag={allowDrag}
          /> */}
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <AppointmentTooltip />
        </Scheduler>
      </Paper>

    </div>
  )
}

export default CalendarComponent
