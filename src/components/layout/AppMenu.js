/*!
 * 暂时使用的是 childList 为空，就认定是 MenuItem，但是这样的判断是不够的（假如集成权限配置）
 * 可以参考 docs/FAQ.md 的做法
 * @todo 层级处理改成递归（目前只支持三层），现在是由于之前多次改动，导致直接平铺处理的...
 */

import React from 'react'
import reverse from 'lodash/reverse'
import { Menu, Icon } from 'antd'
import menus from '../../menu.json'
import { hashHistory } from 'react-router'

export default class AppMenu extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      openKeys: [ ],
      cachedOpenKeys: [ ],
      selectedKeys: [ ],
      menus: menus.data[0].childList
    }
    this.handleMenuOpenChange  = this.handleMenuOpenChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.calcMenuRoute = this.calcMenuRoute.bind(this)
  }

  componentWillMount () {
    this.calcMenuRoute()
  }
  
  componentWillReceiveProps (nextProps) {
    if (!nextProps.collapsed) {
      this.calcMenuRoute()
      return
    }
    this.setState({ openKeys: [ ]})
  }

  calcMenuRoute () {
    if (!this.props.router.location.pathname) {
      return
    }
    const routes = this.props.router.location.pathname.split('/')
    this.setState({ selectedKeys: [ routes[routes.length - 1] ] })
    const [ firstRoute, secondRoute, thirdRoute ] = routes
    const openKeys = thirdRoute ? [thirdRoute, secondRoute, firstRoute] : secondRoute ? [ secondRoute, firstRoute ] : [ firstRoute ]

    if (this.collapsed) {
      this.setState({ cachedOpenKeys: openKeys })
    } else {
      this.setState({ openKeys: openKeys })
    }
  }
  get rootSubmenuKeys () {
    return this.state.menus.map((x) => x.url)
  }

  handleSelect (data) {
    const keypath = reverse(data.keyPath).join('/')
    hashHistory.push(keypath)
  }

  handleMenuOpenChange (openKeys) {
    const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys: openKeys })
    } else {
      this.setState({ openKeys: latestOpenKey ? [ latestOpenKey ] : [ ] })
    }
  }

  render () {
    function getSubMenuFragment (menus) {
      function getMenuIcon (menu) {
        return menu.icon ? <Icon type={menu.icon} /> : null
      }
      return menus.map((menu) => {
        if (menu.childList.length === 0) {
          return <Menu.Item key={menu.url}>{getMenuIcon(menu)}<span className="menu-title">{menu.name}</span></Menu.Item>
        }
        return (
          <Menu.SubMenu
            title={
              menu.icon ? (
                <span>
                  <Icon type={menu.icon} />
                  <span>{menu.name}</span>
                </span>
              ) : (
                menu.name
              )
            }
            key={menu.url}
          >
            {getSubMenuFragment(menu.childList)}
          </Menu.SubMenu>
        )
      })
    }

    const SubMenus = getSubMenuFragment(this.state.menus)
    const { collapsed } = this.props
    const { openKeys, selectedKeys } = this.state
    let appMenuClass = 'app-menu'
    if (collapsed) {
      appMenuClass += ' app-menu-collapsed'
    }

    return (
      <Menu
        key="Menu"
        className={appMenuClass}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClick={this.handleSelect}
        onOpenChange={this.handleMenuOpenChange}
      >
        {SubMenus}
      </Menu>
    )
  }
}
