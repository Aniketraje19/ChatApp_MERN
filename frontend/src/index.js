import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import {ChakraProvider} from "@chakra-ui/react"

import {RouterProvider,createBrowserRouter} from "react-router-dom"

import {Chats,Home} from "./pages/index.js"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    errorElement:<h1>Page Not Found!</h1>,
  },
  {
    path:"/chats",
    element:<Chats/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>
);

