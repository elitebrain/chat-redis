import React, { useState, useEffect } from 'react'
import { bool, func, string } from 'prop-types';

import { DefaultButton } from './atomic.styles'

const AtomicButton = props => {
  const { children, variant, className = "", warning, disabled, handleClick } = props;
  const [cn, setCn] = useState('');
  const setClassName = () => {
    let _className = className;
    if (variant) {
      _className += ` variant_${variant}`
    }
    if (disabled) {
      _className += " disabled"
    }
    if (warning) {
      _className += " warning"
    }
    setCn(_className);
  }
  useEffect(() => {
    setClassName()
  }, [variant, disabled]);
  return (
    <DefaultButton className={cn} onClick={handleClick}>
      {children}
    </DefaultButton>
  )
}

AtomicButton.propTypes = {
  children: string,
  className: string,
  variant: string,
  disabled: bool,
  handleClick: func
}

export default AtomicButton
