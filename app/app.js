import React, { Children } from 'react'
import AppHeader from './components/layout/app-header.js'
import { withRouter } from 'react-router';
import AppMenu from './components/layout/app-menu.js';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import './styles/app.less'

class App extends React.Component{
  constructor (props){
    super(props)
  }

  render(){
    const { children } = this.props
    return (
      <LocaleProvider locale={zh_CN}>
        <div className="app">
          <AppHeader {...this.props} className="app-header"></AppHeader>
          <div className="app-content">
            <AppMenu className="app-menu" {...this.props}></AppMenu>
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
