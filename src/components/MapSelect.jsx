import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const MapSelect = ({ className, onChange, options, darkMode }) => {
  return (
    <Select
      defaultValue={options[0].value}
      className={clsx(
        'w-[148px]',
        `${darkMode ? 'map-select-dark' : 'map-select'}`,
        className
      )}
      popupClassName={`${darkMode ? 'dark-dropdown' : 'map-dropdown'}`}
      onChange={onChange}
      options={options}
    />
  )
}

export default MapSelect

MapSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  ).isRequired,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}
