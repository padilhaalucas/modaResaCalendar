import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import getAllStaffMembersReducer from './reducers/staff/staffReducers/getAll'
import getAllAppointmentsReducer from './reducers/appointment/appointmentReducers/getAll'
import getAllClientsReducer from './reducers/client/clientReducers/getAll'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const configureStore = () => {

  const reducers = combineReducers({
    getAllStaffMembersService: getAllStaffMembersReducer,
    getAllAppointmentsService: getAllAppointmentsReducer,
    getAllClientsService: getAllClientsReducer
  })

  const middleware = [thunk]

  const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducers,
    enhancers(applyMiddleware(...middleware))
  )

  return store
}
