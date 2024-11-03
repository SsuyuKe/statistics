import React from 'react'
import SvgIcon from '@/components/SvgIcon'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const IconButton = ({
  className,
  name,
  width = 32,
  height = 30,
  bgColor,
  iconSize = 18
}) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor
      }}
      className={clsx('rounded-xl relative', className)}
    >
      <SvgIcon
        name={name}
        width={iconSize}
        height={iconSize}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}

export default IconButton

IconButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  bgColor: PropTypes.string,
  iconSize: PropTypes.number
}
