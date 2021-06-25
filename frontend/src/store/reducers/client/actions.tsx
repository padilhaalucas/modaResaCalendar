import axios from 'axios'
import * as actionTypes from './actionTypes'

const getAllClientsRequest = (data: any) => {

  return (dispatch: any) => {
    dispatch({
      type: actionTypes.GET_ALL_CLIENTS,
      payload: data
    })

    axios.post('http://localhost:4000/graphql', data, {})
      .then((res) => {
        if (res) {
          dispatch({
            type: actionTypes.GET_ALL_CLIENTS_SUCCESS,
            res
          })
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({
            type: actionTypes.GET_ALL_CLIENTS_FAIL,
            error
          })
        }
      })
  }
}

export { getAllClientsRequest }