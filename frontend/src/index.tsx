import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { configureStore } from './store/index'
import { Provider } from 'react-redux'

import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client"

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: "http://localhost:3000",
  cache,
})

const globalStore = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={globalStore}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
