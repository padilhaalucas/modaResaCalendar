import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import getAllAppointmentsReducer from './reducers/appointment/appointmentReducers/getAll'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const configureStore = () => {

  const reducers = combineReducers({
    getAllAppointmentsService: getAllAppointmentsReducer
  })

  const middleware = [thunk]

  const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducers,
    enhancers(applyMiddleware(...middleware))
  )

  return store
}
