import React from 'react'
import PQTable from '../common/PQTable'
import { message } from 'antd'
import clone from 'lodash/clone'
// import { getTableInfo } from '@/apis/services/table'

export default class Table extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      query: '',
      // getTableInfo,
      resultData: [ ],
      operations: [
        { type: 'edit', label: '编辑' },
        { type: 'delete', label: '删除' }
      ],
      columns: [
        { title: '规则编号', dataIndex: 'no', scopedSlots: { customRender: 'ellipsis-with-tooltip' } },
        { title: '描述', dataIndex: 'description' },
        { title: '服务调用次数', dataIndex: 'callNo', needTotal: true, customRender: (text) => text + ' 次' },
        { title: '状态', dataIndex: 'status', needTotal: true },
        { title: '更新时间', dataIndex: 'updatedAt' },
        { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
      ]
    }
    this.getTableInfo = this.getTableInfo.bind(this)
  }

  getTableInfo () {
    return Promise.resolve(clone(this.state.resultData))
  }
  transformListData (xs) {
    return xs.result.data
  }
  handleOperation ({ type }) {
    message.info(`type: ${type}`)
  }
  onRef () {
    console.log(1)
  }
  getDataTotalCount (xs) {
    return xs.result.totalCount
  }

  render () {
    const { columns, query, operations } = this.state
    return (
      <div>
         <PQTable
          ref="table"
          className="resource-management-table"
          rowKey="key"
          onRef={this.onRef}
          loadDataApi={this.getTableInfo}
          operations={operations}
          loadDataOnMount={true}
          transformListData={this.transformListData}
          getDataTotalCount={this.getDataTotalCount}
          columns={columns}
          query={query}
        />
      </div>
    )
  }
}
