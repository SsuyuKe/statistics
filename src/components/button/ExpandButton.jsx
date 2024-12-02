import React from 'react'
import SvgIcon from '@/components/SvgIcon'
import PropTypes from 'prop-types'

const ExpandButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="absolute right-9 bottom-[50px] w-10 h-10 z-[1000] bg-white rounded-full shadow-[0_3.56px_3.56px_0_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      <SvgIcon
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        name="expand"
        width={14}
        color="#374F59"
      />
    </button>
  )
}

export default ExpandButton

ExpandButton.propTypes = {
  onClick: PropTypes.func.isRequired
}
