import React from 'react'
import SvgIcon from '@/components/SvgIcon'
import IconButton from '@/components/IconButton'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const ChartLegend = ({
  className,
  color,
  name,
  number,
  percentage,
  showPercent = true
}) => {
  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <div className="flex items-center mb-3">
        <SvgIcon name="ring" stroke={color} strokeWidth={4} />
        <p className="text-white pl-2">{name}</p>
      </div>
      <div className={clsx('flex items-center', { 'mb-3': showPercent })}>
        <IconButton
          name="iguana"
          width={20}
          height={20}
          iconSize={14}
          bgColor="#383838"
        />
        <div className="pl-2 flex items-center">
          <p className="text-white">{number}</p>
          <p className="text-[#494F5C] text-sm pl-2">隻</p>
        </div>
      </div>
      {showPercent && (
        <div className="w-full pl-2 py-0.5 flex items-end justify-center border border-solid border-[#55555A] rounded-[10px]">
          <p className="text-white">{percentage}</p>
          <p className="text-[#494F5C] text-xs pl-1">%</p>
        </div>
      )}
    </div>
  )
}

export default ChartLegend

ChartLegend.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.number,
  percentage: PropTypes.number,
  showPercent: PropTypes.bool
}
