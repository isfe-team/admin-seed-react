import { Table } from 'antd'
import React from 'react'

export default class PersonTable extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      listData: [ ],
      columns: [ ],
      rowKey: 'key'
    }
  }

  componentWillMount () {
    console.log(this.props)
    this.state.columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];
    console.log(this.state)
  }
  handleChangeTable () {
    console.log(1)
  }

  render () {
    return (
      <div className="pq-table">
        <Table
          dataSource={this.state.listData}
          columns={this.state.columns}
          pagination={false}
          rowKey={this.rowKey}
          size="middle"
          onChange={this.handleChangeTable}
        >
        </Table>
      </div>
    )
  }
}