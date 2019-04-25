import React from 'react'
import Figure from './Figure'

class ServerError extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Figure class="serve-error" message="500" description="抱歉，服务异常了">
        <i class="icon icon-exception icon-exception-500"></i>
      </Figure>
    )
  }
}
export default ServerError
