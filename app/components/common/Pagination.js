/*!
 * 基于 `APagination`，用于分页组件，能和 table 搭配使用，见 PQTable
 * props 见下面 props 注释
  * @Prop({ type: [ Number, String ], default: 10 }) 
  // 每页显示个数选择器的选项设置
  @Prop({ type: Array, default () { return [ '10', '20', '30', '40' ] } }) pageSizes
  // 总条目数
  @Prop({ type: Number, default: 0 }) total
  // 当前页数
  @Prop({ type: Number, default: 1 }) currentPage
 *
 * events
 * @emits {currentChange} currentPage 改变时会触发，返回当前页
 * @emits {sizeChange} pageSize 改变时会触发，返回当前每页条数
 *
 * @TODOS optimize 最大页数小于当前页数，导致的两次 load（增加验证，但是感觉意义不大）
 */

import React from 'react'
import { Pagination } from 'antd'

const paginationStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}
const paginationPagesStyle = { marginRight: '10px' }

export default class Paginations extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedPageSize: 10
    }
  }

  componentWillMount () {
    this.selectedPageSize = +this.pageSize
  }

  handleCurrentChange (currentPage) {
    return currentPage 
  }
  onPageSizeChange (size) {
    this.selectedPageSize = +size
  }
  onShowSizeChange (current, size) {
    return size
  }
  componentWillReceiveProps (nextProps) {
    this.onPageSizeChange(nextProps.pageSize)
  }

  render () {
    return (
      <div style={paginationStyle}>
        <Pagination
          style={paginationPagesStyle}
          showQuickJumper
          showSizeChanger
          current={this.props.currentPage}
          pageSize={this.state.selectedPageSize}
          pageSizeOptions={this.state.pageSizes}
          total={this.state.total}
          onChange={this.handleCurrentChange}
          onShowSizeChange={this.onShowSizeChange}
        />
      </div>
    )
  }

}
