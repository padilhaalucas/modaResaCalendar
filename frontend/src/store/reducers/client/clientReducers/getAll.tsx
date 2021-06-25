import * as actionTypes from '../actionTypes'
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
  getAllClients: {},
  loadedGetAllClients: null,
  loadingGetAllClients: null,
  errorGetAllClients: null,
}

function requestGetAllClients(state: any) {
  state.loadedGetAllClients = false
  state.loadingGetAllClients = true
  state.errorGetAllClients = null
}

function requestGetAllClientsError(state: any, action: any ) {
  state.loadedGetAllClients = true
  state.loadingGetAllClients = false
  state.errorGetAllClients = action.error
}

const getAllClientsReducer = createReducer(initialState, {
  [actionTypes.GET_ALL_CLIENTS]: requestGetAllClients,
  [actionTypes.GET_ALL_CLIENTS_FAIL]: requestGetAllClientsError,
  [actionTypes.GET_ALL_CLIENTS_SUCCESS]: (state: any, action: any) => {

    state.getAllClients = action?.res?.data?.data
    state.loadedGetAllClients= true
    state.loadingGetAllClients = false
    state.errorGetAllClients = false

  },
})

export default function reducer(state = initialState, action: any) {
  return getAllClientsReducer(state, action)
}