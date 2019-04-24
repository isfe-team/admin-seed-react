import React from 'react'
import { Icon, Modal } from 'antd'
import { hashHistory, Link } from 'react-router'
import './app-header.less'
import { withRouter } from 'react-router-dom'
import logo from '../../images/logo.png'

export default class AppHeader extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout () {
    const that = this
    Modal.confirm({
      title: '是否退出系统？',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        location.href = './login'
      }
    })
  }
  render () {
    return (
      <div className='app-header'>
        <div className="app-header-logo-wrap">
          <img src={logo} className="app-header-logo"></img>
          <h1>Admin-seed-react</h1>
        </div>
        <div className='app-header-operations'>
          <span className='app-header-user-info'>Hi, 游客 </span>
          <Icon type='logout' className='app-header-icon' onClick={this.logout} />
          {/* <Link to="/login" activeStyle={{color: 'red'}}>Two</Link> */}
        </div>
      </div>
    )
  }
}