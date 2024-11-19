import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from '@/components/SvgIcon'
import { Button } from 'antd'
import IconButton from '@/components/IconButton'
import clsx from 'clsx'

const SwitchButton = ({ style, className, icon, onClick, children }) => {
  return (
    <Button
      type="primary"
      shape="round"
      style={{ ...style, padding: '4px', height: 36, minWidth: 128 }}
      className={clsx(
        'switch-btn flex justify-between border border-solid border-[#3E3E3E] font-bold cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <IconButton
        name={icon}
        bgColor="#D9D9D9"
        className="!rounded-full"
        height={30}
        width={30}
      />
      {children}
      <SvgIcon
        className="mr-2"
        name="transfer"
        color="#fff"
        width={12}
        height={12}
      />
    </Button>
  )
}

export default SwitchButton

SwitchButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}
