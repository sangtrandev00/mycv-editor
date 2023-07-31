import { Row } from 'antd'
import { useState } from 'react'
import RootLayout from './components/RootLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from './pages/Admin';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <RootLayout />
      },
      {
        path: ":userId",
        element: <RootLayout />
      }
    ],
  },
  {
    path: "/admin",
    element: <Admin/>
  }
]);


function App() {

   return <RouterProvider router={router} />;

}

export default App
