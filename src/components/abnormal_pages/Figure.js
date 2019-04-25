import React from 'react'
import { Button } from 'antd'
import { hashHistory } from 'react-router'
import './Figure.less'

export default function Figure (props) {
  function toMain () {
    hashHistory.push('/overview')
  }

  return (
    <div className="figure">
      <div className="figure-message-wrapper">
        <div className="message">{props.message}</div>
        <div className="description">{props.description}</div>
        <Button type="primary" onClick={toMain}>回到首页</Button>
      </div>
    </div>
  )
}
