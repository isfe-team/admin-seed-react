/*!
 * 使用 Form.create 来做的，但是不支持类组件，很尴尬
 * @see https://ant.design/components/form-cn/#components-form-demo-normal-login
 */

import React from 'react'
import { Form, Input, Button, Icon, notification } from 'antd'
import './styles/login.less'
import { getErrorMessage } from './utils/helpers'

class Login extends React.Component{

  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
  }
 
  login (evt) {
    evt.preventDefault()
    new Promise((resolve, reject) => {
      this.props.form.validateFields((err, formData) => {
        if (!err) {
          return resolve('成功')
        }
        return reject(err.password ? err.password.errors[0] : err.userName ? err.userName.errors[0] : err)
      })
    }).then(
      () => { location.href = './' },
      (err) => { notification.error({ message: 'LOGIN ERROR', description: getErrorMessage(err, '未知错误') }) }
    )
  }
  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    const passwordError = isFieldTouched('password') && getFieldError('password')
    return (
      <div id="login">
        <div className="login-logo-wrapper">
          <h1 onClick={this.login}>登录</h1>
          <Form onSubmit={this.login} className="login-form">
            <Form.Item
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              label="用户名："
            >
              {
                getFieldDecorator('userName', { rules: [{ required: true, message: '请输入用户名' }] })(
                  <Input placeholder="请输入用户名" prefix={<Icon type="user" />}
                />
                )
              }
            </Form.Item>
            <Form.Item
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              label="密码："
            >
              {
                getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码' }] })(
                  <Input type="password" placeholder="请输入密码" prefix={<Icon type="lock" />}
                />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit" className="login-button">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
export default Form.create({})(Login)
