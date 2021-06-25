import React, { useCallback } from "react"
import "./App.css"

import Router from './router'

import { AllAppointments } from "./pages/allAppointments/index"
import { Home } from "./pages/home/index"
import { CreateAppointment } from "./pages/createAppointment/index"

function App() {
  const paths = {
    home: '/',
    allAppointments: '/allAppointments',
    createAppointment: '/createAppointment',
  };

  const routes = [
    { path: paths.home, component: Home },
    { path: paths.allAppointments, component: AllAppointments },
    { path: paths.createAppointment, component: CreateAppointment },
  ];

  return (
    <Router routes={routes} />
  )
}

export default App