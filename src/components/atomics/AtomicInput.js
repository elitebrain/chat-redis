import React, { useState, useEffect } from 'react';
import { func, string } from "prop-types";
import { DefaultInput } from './atomic.styles';

const AtomicInput = props => {
  const { className = "", variant, placeholder, value, name, handleKeyUp, handleChange, width, errMsg } = props;
  const [cn, setCn] = useState('');
  const setClassName = (className) => {
    let _className = className;
    if (variant) {
      _className += ` variant_${variant}`
    }
    if (errMsg) {
      _className += " has_error"
    }
    setCn(_className);
  }
  useEffect(() => {
    setClassName(className);
  }, [errMsg]);
  return (
    <DefaultInput className={cn} placeholder={placeholder} value={value} name={name} onKeyUp={handleKeyUp} onChange={handleChange} width={width} />
  )
}

AtomicInput.propTypes = {
  className: string,
  variant: string,
  placeholder: string,
  value: string,
  name: string,
  handleKeyUp: func,
  handleChange: func,
  width: string,
  errMsg: string
}

export default AtomicInput
