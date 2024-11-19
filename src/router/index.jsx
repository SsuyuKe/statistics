import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AdministrativeDistrict, Waters, NotFound } from '@/pages'
import Layout from '@/components/Layout'
import LayoutWithToggle from '@/components/LayoutWithToggle'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithToggle />,
    children: [
      {
        path: '/',
        element: <AdministrativeDistrict />
      }
    ]
  },
  {
    path: '/waters',
    element: <Layout />,
    children: [
      {
        path: '/waters',
        element: <Waters />
      }
    ]
  },
  {
    path: '*',
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router
