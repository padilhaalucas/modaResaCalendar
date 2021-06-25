import axios from 'axios'
import * as actionTypes from './actionTypes'

const getAllStaffMembersRequest = (data: any) => {

  return (dispatch: any) => {
    dispatch({
      type: actionTypes.GET_ALL_STAFF_MEMBERS,
      payload: data
    })

    axios.post('http://localhost:4000/graphql', data, {})
      .then((res) => {
        if (res) {
          dispatch({
            type: actionTypes.GET_ALL_STAFF_MEMBERS_SUCCESS,
            res
          })
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({
            type: actionTypes.GET_ALL_STAFF_MEMBERS_FAIL,
            error
          })
        }
      })
  }
}

export { getAllStaffMembersRequest }