import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const renderRings = (grade, colorType) => {
  const colors = {
    red: [
      'rgba(255, 108, 108, 1)',
      'rgba(255, 0, 0, 0.4)',
      'rgba(255, 0, 0, 0.3)'
    ],
    green: [
      'rgba(68, 184, 42, 1)',
      'rgba(68, 184, 42, 0.8)',
      'rgba(68, 184, 42, 0.5)'
    ]
  }
  const baseSize = 60
  const ringThickness = 8
  // 设置每一环的颜色
  return Array.from({ length: grade }).map((_, index) => {
    const size = baseSize + (index + 1) * ringThickness * 2
    const offset = (size - baseSize) / 2
    return (
      <div
        key={index}
        style={{
          position: 'absolute',
          top: `-${offset}px`,
          left: `-${offset}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: colors[colorType][grade - 1]
        }}
      />
    )
  })
}

const MapIcon = ({ image, className, grade, number, colorType }) => {
  return (
    <div
      className={clsx(
        'w-[60px] h-[60px] rounded-full relative flex items-center justify-center',
        className
      )}
    >
      {renderRings(grade, colorType)}
      <div className="relative">
        <img src={image} alt="image" className="w-full h-full object-contain" />
        <div className="absolute right-0 -top-1 w-6 h-6 border border-solid border-[rgba(177,177,177,1)] rounded-full bg-white text-center">
          <span className="text-[rgba(255,67,67,1)] font-bold leading-6">
            {number > 99 ? '99+' : number}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MapIcon

MapIcon.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  grade: PropTypes.number,
  number: PropTypes.number,
  colorType: PropTypes.string
}
