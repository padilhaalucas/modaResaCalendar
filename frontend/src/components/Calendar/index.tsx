import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler'
import { Appointments, MonthView, Scheduler } from '@devexpress/dx-react-scheduler-material-ui'

import './styles.css'

const dragDisableIds = new Set([3, 8, 10, 12])

const allowDrag = ({ id }: any) => !dragDisableIds.has(id)
const appointmentComponent = (props: any) => {
  if (allowDrag(props)) {
    return <Appointments.Appointment {...props} />
  } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
}

type CalendarProps = {
  allStaffMembers: any,
  appointments: any,
  clients: any
}

const CalendarComponent = ({allStaffMembers, appointments, clients}: CalendarProps): any => {

  const test = document.createElement('div')
  test.appendChild(document.createTextNode('TESTEZAAAAAO'))

  console.log(allStaffMembers, 'TESTE')

  const appointmentsArray = () => {
    let auxArr: any = []
    appointments?.forEach((appointment: any) => (
      clients?.forEach((client: any): any => {
        allStaffMembers?.forEach((member: any) => {
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
  
  console.log(appointmentsToRender, 'TESTINHO')
    
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

  console.log(monthNames[currentDate.getMonth()], 'DTA')


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
          height={660}
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
        </Scheduler>
      </Paper>

    </div>
  )
}

export default CalendarComponent
