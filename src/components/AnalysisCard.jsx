import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@/components/IconButton'
import clsx from 'clsx'

const AnalysisCard = ({
  iconName,
  iconBgColor,
  title,
  children,
  className
}) => {
  return (
    <div
      className={clsx(
        'rounded-[10px] bg-[#23252A] text-white pt-3 pl-3 relative',
        className
      )}
    >
      <IconButton
        name={iconName}
        width={36}
        height={36}
        bgColor={iconBgColor}
        iconSize={24}
        className="rounded-[10px] mb-4"
      />
      <p className="text-white text-base">{title}</p>
      <div className="absolute right-4 bottom-4">{children}</div>
    </div>
  )
}

export default AnalysisCard

AnalysisCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  iconName: PropTypes.string,
  iconBgColor: PropTypes.string,
  children: PropTypes.node.isRequired
}
