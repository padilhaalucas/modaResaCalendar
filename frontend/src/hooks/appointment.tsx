import { useMemo, useCallback } from 'react'
import { actions as appointmentActions, selectors as appointmentSelectors } from '../store/reducers/appointment/index'

import { useDispatch, useSelector } from 'react-redux' 
import { bindActionCreators } from 'redux'

export const useAppointmentActions = () => {
  const dispatch = useDispatch()

  const actions = useMemo(
    () => bindActionCreators(
      {
        getAllAppointments: appointmentActions.getAllAppointmentsRequest
      },
      dispatch
    ), [dispatch]
  )

  const getAllAppointments = useCallback((data) => {
    actions.getAllAppointments(data)
  }, [actions])

  return { getAllAppointments }
}

export const useAppointment = () => {

  const allAppointmentsLoading = useSelector((state: any) => appointmentSelectors.getAllAppointmentsLoading(state))
  const allAppointmentsLoaded = useSelector((state: any) => appointmentSelectors.getAllAppointmentsLoaded(state))
  const allAppointmentsError = useSelector((state: any) => appointmentSelectors.getAllAppointmentsError(state))
  const allAppointments = useSelector((state: any) => appointmentSelectors.getAllAppointments(state))

  return {
    allAppointmentsLoading,
    allAppointmentsLoaded,
    allAppointmentsError,
    allAppointments
  }
}
