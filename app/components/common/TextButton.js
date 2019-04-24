import React from 'react'
import './TextButton.less'

export default class TextButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (evt) {
    this.props.onButtonClick(this.props, evt)
  }

  render () {
    const { disabled, danger, label, className } = this.props
    let buttonClass = 'x-text-button'
    if (className) {
      buttonClass += ` ${className}`
    }
    if (disabled) {
      buttonClass += ' disabled';
    }
    if (danger) {
      buttonClass += ' danger'
    }
    return (
      <button className={buttonClass} disabled={disabled} onClick={this.handleClick}>
        {label}
      </button>
    )
  }

}
