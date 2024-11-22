import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SvgIcon from '@/components/SvgIcon'
import { months } from '@/assets/js/constant.js'

const MonthTimeline = ({ className, darkMode }) => {
  const [currentMonth, setCurrentMonth] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const visibleMonths = months.slice(startIndex, startIndex + 4)
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }
  const handleNext = () => {
    if (startIndex < months.length - 4) {
      setStartIndex(startIndex + 1)
    }
  }
  return (
    <div
      className={clsx(
        'rounded-[25px] shadow-timeLine py-3 px-5 flex items-center',
        `${darkMode ? 'bg-[rgba(51,51,54,0.7)]' : 'bg-white'}`,
        className
      )}
    >
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className={clsx(
          'relative w-9 h-9 flex items-center justify-center rounded-full',
          `${darkMode ? 'bg-white' : 'bg-[rgba(85,85,85,1)]'}`,
          `${
            startIndex > 0
              ? 'text-gray-600 cursor-pointer'
              : 'cursor-not-allowed'
          }`
        )}
      >
        <SvgIcon
          name={`${darkMode ? 'arrow-left' : 'arrow-left-white'}`}
          width={12}
          height={9}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      </button>
      <div className="flex-1 mx-6">
        <div className="relative flex">
          <div
            className={clsx(
              'absolute left-3 top-4 w-[calc(100%-24px)] h-[2px] bg-[rgba(85,85,85,1)]',
              { 'bg-white': darkMode }
            )}
          ></div>
          {visibleMonths.map((month, index) => {
            const absoluteIndex = startIndex + index
            return (
              <div
                key={month}
                className="flex flex-col items-center cursor-pointer group pr-[68px] last:pr-0"
                onClick={() => setCurrentMonth(absoluteIndex)}
              >
                <div className="mb-2">
                  <div
                    className={clsx(
                      'relative w-[34px] h-[34px] rounded-full transition-colors',
                      {
                        'bg-[rgba(94,255,35,0.5)] z-[1000]':
                          currentMonth === absoluteIndex
                      }
                    )}
                  >
                    <div
                      className={clsx(
                        'absolute top-1/2 left-1/2 w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 bg-[rgba(85,85,85,1)] rounded-full',
                        { 'bg-white': darkMode }
                      )}
                    />
                  </div>
                </div>
                <span
                  className={clsx('text-sm text-[rgba(85,85,85,1)]', {
                    'text-white': darkMode
                  })}
                >
                  {month}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <button
        className={clsx(
          'relative w-9 h-9 flex items-center justify-center rounded-full',
          `${darkMode ? 'bg-white' : 'bg-[rgba(85,85,85,1)]'}`,
          ` ${
            startIndex < months.length - 4
              ? 'text-gray-600 cursor-pointer'
              : 'cursor-not-allowed'
          }`
        )}
        onClick={handleNext}
        disabled={startIndex >= months.length - 4}
      >
        <SvgIcon
          name={`${darkMode ? 'arrow-right' : 'arrow-right-white'}`}
          width={12}
          height={9}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      </button>
    </div>
  )
}

export default MonthTimeline

MonthTimeline.propTypes = {
  className: PropTypes.string,
  darkMode: PropTypes.bool
}
