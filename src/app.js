import React, { useState } from 'react'
import AppHeader from './components/layout/AppHeader'
import { withRouter } from 'react-router';
import AppMenu from './components/layout/AppMenu';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import './styles/app.less'

function App (props) {
  const [collapsed, setCollapsed] = useState(false)
  const { children } = props

  function toggleCollapsed () {
    setCollapsed(!collapsed)
  }

  return (
    <LocaleProvider locale={zh_CN}>
      <div className="app">
        <AppHeader {...props} collapsed={collapsed} toggleCollapsed={toggleCollapsed} className="app-header" ></AppHeader>
        <div className="app-content">
          <AppMenu {...props} collapsed={collapsed}></AppMenu>
          <div className="app-content-main">
            <div className="app-page">{children}</div>
          </div>
        </div>
      </div>
    </LocaleProvider>
  )
}

export default withRouter(App)
