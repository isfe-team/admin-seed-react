import React from 'react'
import { Button } from 'antd'
import { hashHistory } from 'react-router'
import './Figure.less'

class Figure extends React.Component {

  constructor (props) {
    super(props)
    this.toMain = this.toMain.bind(this)
  }
 

  toMain () {
    hashHistory.push('/overview')
  }

  render () {
    return (
      <div className="figure">
        <div className="figure-message-wrapper">
          <div className="message">{this.props.message}</div>
          <div className="description">{this.props.description}</div>
          <Button type="primary" onClick={this.toMain}>回到首页</Button>
        </div>
      </div>
    )
  }
}

export default Figure
