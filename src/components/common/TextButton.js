import React from 'react'
import './TextButton.less'

export default function TextButton (props) {
  function handleClick (evt) {
    props.onButtonClick(evt)
  }

  const { disabled, danger, label, className } = props
  const buttonClass = ['x-text-button']
  if (className) {
    buttonClass.push(className)
  }
  if (disabled) {
    buttonClass.push('disabled')
  }
  if (danger) {
    buttonClass.push('danger')
  }
  const mergedClassName = buttonClass.join(' ')

  return (
    <button className={mergedClassName} disabled={disabled} onClick={handleClick}>{label}</button>
  )
}
