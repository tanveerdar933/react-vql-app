import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.jsx'
import { RouterProvider } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import DataContextProvider from "./contexts/dataContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  </React.StrictMode>,
)
