import * as actionTypes from '../actionTypes'
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
  getAllAppointments: {},
  loadedGetAllAppointments: null,
  loadingGetAllAppointments: null,
  errorGetAllAppointments: null,
}

function requestGetAllAppointments(state: any) {
  state.loadedGetAllAppointments = false
  state.loadingGetAllAppointments = true
  state.errorGetAllAppointments = null
}

function requestGetAllAppointmentsError(state: any, action: any ) {
  state.loadedGetAllAppointments = true
  state.loadingGetAllAppointments = false
  state.errorGetAllAppointments = action.error
}

const getAllAppointmentsReducer = createReducer(initialState, {
  [actionTypes.GET_ALL_APPOINTMENTS]: requestGetAllAppointments,
  [actionTypes.GET_ALL_APPOINTMENTS_FAIL]: requestGetAllAppointmentsError,
  [actionTypes.GET_ALL_APPOINTMENTS_SUCCESS]: (state: any, action: any) => {

    state.getAllAppointments = action?.res?.data?.data
    state.loadedGetAllAppointments= true
    state.loadingGetAllAppointments = false
    state.errorGetAllAppointments = false

  },
})

export default function reducer(state = initialState, action: any) {
  return getAllAppointmentsReducer(state, action)
}