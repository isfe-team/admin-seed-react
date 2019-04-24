import React from 'react'
import Figure from './Figure'

class NotFound extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Figure message="404" description="抱歉，你访问的页面不存在或正在开发">
        <i class="icon icon-exception icon-exception-404"></i>
      </Figure>
    )
  }
}
export default NotFound
