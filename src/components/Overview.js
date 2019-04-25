import React from 'react'
import { Card } from 'antd'
import './Overview.less'

class Overview extends React.Component {

  constructor (props) {
    super(props)
    console.log(props)
  }
  render () {
    return (
      <div className="overview-wrapper">
        <Card title="页面整体布局">
          <p>总体左右布局</p>
          <p>左边上下布局，上为logo，下为menu</p>
          <p>右边上下布局，上为header，下为content</p>
        </Card>
      </div>
    )
  }
}

export default Overview
