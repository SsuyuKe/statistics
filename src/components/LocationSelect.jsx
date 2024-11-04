import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import SvgIcon from '@/components/SvgIcon'
import { Select } from 'antd'

const LocationSelect = ({ className, onChange, options }) => {
  const optionsWithIcon = options.map((item) => ({
    ...item,
    label: (
      <div className="flex items-center">
        <SvgIcon className="mr-2" name="location" width={12} color="#7C7C7C" />
        {item.label}
      </div>
    )
  }))
  return (
    <Select
      defaultValue={optionsWithIcon[0].value}
      className={clsx(className, 'w-[148px]')}
      onChange={onChange}
      options={optionsWithIcon}
    />
  )
}

export default LocationSelect

LocationSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
