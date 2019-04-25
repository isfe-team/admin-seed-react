import React from 'react'
import Figure from './Figure'

class NoAuth extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Figure class="no-auth" message="403" description="抱歉，没有访问权限">
        <i class="icon icon-exception icon-exception-403"></i>
      </Figure>
    )
  }
}
export default NoAuth
