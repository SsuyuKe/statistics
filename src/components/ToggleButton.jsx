import React from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'antd'

const ToggleButton = ({ options, onChange, className }) => {
  return (
    <Radio.Group
      className={className}
      buttonStyle="solid"
      defaultValue={options[0].value}
      onChange={onChange}
    >
      {options.map((item) => (
        <Radio.Button key={item.value} value={item.value}>
          {item.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}

export default ToggleButton

ToggleButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
