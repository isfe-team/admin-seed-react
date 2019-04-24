import React from 'react'
import { Button } from 'antd'
import clone from 'lodash/clone'
import PQTable from '../common/PQTable'
// import { transformColums } from '../common/helpers'

const MOCK_LIST_DATA = {
  message: 1,
  result: {
    totalCount: 10,
    data: [
      { key: 1, no: 'No 1', description: '很好' },
      { key: 2, no: 'No 21', description: '今天' }
    ]
  }
}

class SyncTable extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      query: { },
      resultData: MOCK_LIST_DATA,
      operations: [
        { type: 'edit', label: '编辑' },
        { type: 'delete', label: '删除' }
      ],
      columns: [
        { title: '规则编号', dataIndex: 'no', type: "title" },
        { title: '描述', dataIndex: 'description' },
        { title: '操作', dataIndex: 'operation' }
      ]
    }
    this.getTableInfo = this.getTableInfo.bind(this)
    this.changeTable = this.changeTable.bind(this)
    this.onRef = this.onRef.bind(this)
  }

  transformListData (xs) {
    return xs.result.data
  }
  getTableInfo () {
    return Promise.resolve(clone(this.state.resultData))
  }
  onRef (ref) {
    this.child = ref
  }
  changeTable () {
    if (this.state.resultData.message === 1) {
      this.state.resultData = {
        message: 2,
        result: {
          totalCount: 10,
          data: [
            { key: 1, no: 'No 1', description: '很好' },
            { key: 2, no: 'No 2', description: '今天' },
            { key: 3, no: 'No 3', description: '今天' },
            { key: 4, no: 'No 4', description: '今天' },
            { key: 5, no: 'No 5', description: '今天' }
          ]
        }
      }
    } else {
      this.state.resultData = clone(MOCK_LIST_DATA)
    }
    this.child.loadData()
  }
  getDataTotalCount (xs) {
    return xs.result.totalCount
  }
  // transformColums (data) {
  //   const colums = data.map((x) => {
  //     if (x.type === 'title') {
  //       x.render = text => <span title={text}>{text}</span>
  //       return x
  //     }
  //   })
  //   return colums
  // }
  // get newColums () {
  //   const data = this.transformColums(this.state.columns)
  //   return data
  // }
  render () {
    const { operations, columns, query } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.changeTable}>切换数据</Button>
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

export default SyncTable
