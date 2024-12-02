import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from '@/components/SvgIcon'

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div className="flex">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className="bg-white rounded-full relative w-8 h-8 mr-2"
      >
        <SvgIcon
          name="arrow-left"
          width={10}
          height={8}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      </button>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className="bg-white rounded-full relative w-8 h-8"
      >
        <SvgIcon
          name="arrow-right"
          width={10}
          height={8}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      </button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
}

export default Pagination
