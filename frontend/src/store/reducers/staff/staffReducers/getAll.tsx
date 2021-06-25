import * as actionTypes from '../actionTypes'
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
  getAllStaffMembers: {},
  loadedGetAllStaffMembers: null,
  loadingGetAllStaffMembers: null,
  errorGetAllStaffMembers: null,
}

function requestGetAllStaffMembers(state: any) {
  state.loadedGetAllStaffMembers = false
  state.loadingGetAllStaffMembers = true
  state.errorGetAllStaffMembers = null
}

function requestGetAllStaffMembersError(state: any, action: any ) {
  state.loadedGetAllStaffMembers = true
  state.loadingGetAllStaffMembers = false
  state.errorGetAllStaffMembers = action.error
}

const getAllStaffMembersReducer = createReducer(initialState, {
  [actionTypes.GET_ALL_STAFF_MEMBERS]: requestGetAllStaffMembers,
  [actionTypes.GET_ALL_STAFF_MEMBERS_FAIL]: requestGetAllStaffMembersError,
  [actionTypes.GET_ALL_STAFF_MEMBERS_SUCCESS]: (state: any, action: any) => {

    state.getAllStaffMembers = action?.res?.data?.data
    state.loadedGetAllStaffMembers= true
    state.loadingGetAllStaffMembers = false
    state.errorGetAllStaffMembers = false

  },
})

export default function reducer(state = initialState, action: any) {
  return getAllStaffMembersReducer(state, action)
}