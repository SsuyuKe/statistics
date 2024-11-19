import React from 'react'
import BarChart from '@/components/BarChart'
import AnimalMap from '@/components/AnimalMap'

const Reporting = () => {
  return (
    <>
      <BarChart className="mb-4" />
      <BarChart className="mb-4" />
      <BarChart className="mb-4" />
      <AnimalMap />
    </>
  )
}

export default Reporting
