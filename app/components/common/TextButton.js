/*!
 * text button | bqliu
 */
import React from 'react'
import './TextButton.less'

export default class TextButton extends React.Component {
  constructor (props) {
    super(props)
  }

  handleClick (evt) {
    return evt
  }

  render () {
    const { disabled } = this.props
    const buttonClass = { 'x-text-button': true, disabled: disabled, danger: danger }
    return (
      <button class={buttonClass} disabled={disabled} onClick={this.handleClick}>
      </button>
    )
  }

}
