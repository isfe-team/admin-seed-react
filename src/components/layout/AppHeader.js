import React from 'react'
import { Icon, Modal } from 'antd'
import { hashHistory } from 'react-router'
import './AppHeader.less'

const LOGO_URL = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'

export default function AppHeader (props) {
  function logout () {
    Modal.confirm({
      title: '是否退出系统？',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        hashHistory.push('/login')
      }
    })
  }

  const iconType = props.collapsed ? 'menu-fold' : 'menu-unfold'
  const { collapsed } = props
  let headerLogoClass = 'app-header-logo-wrap'
  if (collapsed) {
    headerLogoClass += ' collapsed-app-header-logo'
  }

  return (
    <div className='app-header'>
      <div className={headerLogoClass}>
        <img src={LOGO_URL} className='app-header-logo'></img>
        <h1>Admin-seed-react</h1>
      </div>
      <div className='app-header-operations'>
        <Icon type={iconType} className='app-header-operations-icon' onClick={props.toggleCollapsed} />
        <div className='app-header-text'>
          <span className='app-header-user-info'>Hi, 游客 </span>
          <Icon type='logout' className='app-header-icon' onClick={logout} />
        </div>
      </div>
    </div>
  )
}
