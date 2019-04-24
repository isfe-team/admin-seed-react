import React, { Children } from 'react'
import AppHeader from './components/layout/app-header.js'
import { Breadcrumb } from 'antd'
import { withRouter } from 'react-router';
import AppMenu from './components/layout/app-menu.js';
import './styles/app.less'

class App extends React.Component{
  constructor (props){
    super(props)
  }

  render(){
    const { children } = this.props
    return (
      <div className="app">
        <AppHeader {...this.props} className="app-header"></AppHeader>
        <div className="app-content">
          <AppMenu className="app-menu" {...this.props}></AppMenu>
          <div className="app-content-main">
            <div className="app-page">{children}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
