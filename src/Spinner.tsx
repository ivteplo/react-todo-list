import React from 'react'
import './Spinner.css'

const Spinner = ({ className = '', ...props } = {}) => {
  return (
    <div className={'Spinner ' + className} {...props}>
      <div className="Loader" />
      <span className="ScreenReaderOnly">Loading</span>
    </div>
  )
}

export default Spinner
