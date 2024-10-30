import { createBrowserRouter } from 'react-router-dom'
import { Home, NotFound } from '@/pages'
import React from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
