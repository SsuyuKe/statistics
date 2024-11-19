import React, { lazy, Suspense } from 'react'
import { useOutletContext } from 'react-router-dom'

const Monitoring = lazy(() => import('./Monitoring.jsx'))
const Reporting = lazy(() => import('./Reporting.jsx'))

const components = {
  Monitoring: <Monitoring />,
  Reporting: <Reporting />
}

const AdministrativeDistrict = () => {
  const { activeComponent } = useOutletContext()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {components[activeComponent] || <div>Component not found</div>}
    </Suspense>
  )
}

export default AdministrativeDistrict
