import React from 'react'
const SvgIcon = (props) => {
  const { name, width = 18, height = 18, color = 'none', className } = props
  const symbolId = `#icon-${name}`
  return (
    <svg
      className={className}
      aria-hidden="true"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <use xlinkHref={symbolId} fill={color}></use>
    </svg>
  )
}

export default SvgIcon
