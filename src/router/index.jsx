import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home, NotFound } from '@/pages'
import Layout from '@/components/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router
