import React from 'react'
import PQTable from '../common/PQTable'
import { message } from 'antd'
import { getTableInfo } from '../../apis/api_list/tableApis'

export default class Table extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      query: '',
      getTableInfo,
      resultData: [ ],
      operations: [
        { type: 'edit', label: '编辑' },
        { type: 'delete', label: '删除' }
      ],
      columns: [
        { title: '规则编号', dataIndex: 'no', customRender: 'ellipsis-with-tooltip' },
        { title: '描述', dataIndex: 'description' },
        { title: '服务调用次数', dataIndex: 'callNo' },
        { title: '状态', dataIndex: 'status', needTotal: true },
        { title: '更新时间', dataIndex: 'updatedAt' },
        { title: '操作', dataIndex: 'operation', customRender: 'operation' }
      ]
    }
  }
  transformListData (xs) {
    return xs.result.data
  }
  handleOperation ({ type }) {
    message.info(`type: ${type}`)
  }

  getDataTotalCount (xs) {
    return xs.result.totalCount
  }

  render () {
    const { columns, query, operations, getTableInfo } = this.state
    return (
      <div>
         <PQTable
          ref="table"
          className="resource-management-table"
          rowKey="key"
          loadDataApi={getTableInfo}
          operations={operations}
          loadDataOnMount={true}
          withPagination={true}
          transformListData={this.transformListData}
          getDataTotalCount={this.getDataTotalCount}
          columns={columns}
          query={query}
        />
      </div>
    )
  }
}
