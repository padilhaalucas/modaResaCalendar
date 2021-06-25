import { createSelector } from 'reselect'

export const getAllAppointmentsLoading = createSelector([
  (state: any) => state?.getAllAppointmentsService?.getAllAppointments?.loadingGetAllAppointments,
],
  (loading: Boolean) => loading
)

export const getAllAppointmentsLoaded = createSelector([
  (state: any) => state?.getAllAppointmentsService?.getAllAppointments?.loadedGetAllAppointments,
],
  (loaded: Boolean) => loaded
)

export const getAllAppointmentsError = createSelector([
  (state: any) => state?.getAllAppointmentsService?.getAllAppointments?.errorGetAllAppointments,
],
  (error: any) => error
)

export const getAllAppointments = createSelector([
  (state: any) => state?.getAllAppointmentsService?.getAllAppointments?.allClients
], 
  (appointments) => appointments
)