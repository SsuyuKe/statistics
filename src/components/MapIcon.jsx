import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Iguana from '@/assets/images/iguana.png'
import Catch from '@/assets/images/catch.png'

// color => red | green
const renderRings = (ringAmount, color) => {
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
  // 設置每一環的顏色
  return Array.from({ length: ringAmount }).map((_, index) => {
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
          backgroundColor: colors[color][ringAmount - 1]
        }}
      />
    )
  })
}
const calculateGrade = (amount) => {
  const grade = Math.ceil(amount / 10)
  return grade > 10 ? 10 : grade
}

const MapIcon = ({
  image,
  className,
  amount,
  color = 'red',
  type = 'grade'
}) => {
  // TODO: icon暫時先這樣寫！
  const icon = image === 'Iguana' ? Iguana : Catch
  const types = {
    grade: {
      level: calculateGrade(amount),
      ringAmount:
        calculateGrade(amount) >= 8 ? 3 : calculateGrade(amount) >= 5 ? 2 : 1
    },
    amount: {
      level: amount > 99 ? '99+' : amount,
      ringAmount: amount >= 80 ? 3 : amount >= 50 ? 2 : 1
    }
  }
  console.log(types[type])
  return (
    <div
      className={clsx(
        'w-[60px] h-[60px] rounded-full relative flex items-center justify-center',
        className
      )}
    >
      {renderRings(types[type].ringAmount, color)}
      <div className="relative">
        <img src={icon} alt="image" className="w-full h-full object-contain" />
        <div className="absolute right-0 -top-1 w-6 h-6 border border-solid border-[rgba(177,177,177,1)] rounded-full bg-white text-center">
          <span className="text-[rgba(255,67,67,1)] font-bold leading-6">
            {types[type].level}
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
  type: PropTypes.string,
  grade: PropTypes.number,
  amount: PropTypes.number,
  color: PropTypes.string
}
