import React from 'react'
import { Icon, Modal } from 'antd'
import { hashHistory } from 'react-router'
import './AppHeader.less'
const logo = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'

export default class AppHeader extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.collapsed = this.collapsed.bind(this)
    this.state = {
      iconType: 'menu-fold'
    }
  }
  logout () {
    Modal.confirm({
      title: '是否退出系统？',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        hashHistory.push('/login')
      }
    })
  }
  collapsed () {
    this.props.onCollapsed()
  }

  get iconType () {
    return this.props.collapsed ? 'menu-fold' : 'menu-unfold'
  }

  render () {
    const { collapsed } = this.props
    let headerLogoClass = 'app-header-logo-wrap'
    if (collapsed) {
      headerLogoClass += ' collapsed-app-header-logo'
    }
    return (
      <div className='app-header'>
        <div className={headerLogoClass}>
          <img src={logo} className="app-header-logo"></img>
          <h1>Admin-seed-react</h1>
        </div>
        <div className='app-header-operations'>
          <Icon type={this.iconType} className="app-header-operations-icon" onClick={this.collapsed} />
          <div className="app-header-text">
            <span className='app-header-user-info'>Hi, 游客 </span>
            <Icon type='logout' className='app-header-icon' onClick={this.logout} />
          </div>
        </div>
      </div>
    )
  }
}