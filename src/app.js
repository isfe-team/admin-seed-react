import React, { Children } from 'react'
import AppHeader from './components/layout/AppHeader'
import { withRouter } from 'react-router';
import AppMenu from './components/layout/AppMenu';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import './styles/app.less'

class App extends React.Component{
  constructor (props){
    super(props)
    this.state = {
      collapsed: false
    }
    this.onCollapsed = this.onCollapsed.bind(this)
  }

  onCollapsed () {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { children } = this.props
    const { collapsed } = this.state
    return (
      <LocaleProvider locale={zh_CN}>
        <div className="app">
          <AppHeader {...this.props} collapsed={collapsed} onCollapsed={this.onCollapsed} className="app-header" ></AppHeader>
          <div className="app-content">
            <AppMenu {...this.props} collapsed={collapsed}></AppMenu>
            <div className="app-content-main">
              <div className="app-page">{children}</div>
            </div>
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

export default withRouter(App)
