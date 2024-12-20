import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const TSelect = ({ className, onChange, options }) => {
  return (
    <Select
      defaultValue={options[0].value}
      className={clsx('w-[148px] t-select', className)}
      popupClassName="dark-dropdown"
      onChange={onChange}
      options={options}
    />
  )
}

export default TSelect

TSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  ).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
