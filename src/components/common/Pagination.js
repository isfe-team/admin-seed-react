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
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.handleCurrentChange = this.handleCurrentChange.bind(this)
  }

  componentWillMount () {
    this.selectedPageSize = +this.pageSize
  }

  handleCurrentChange (currentPage) {
    this.props.onCurrentChange(currentPage)
  }
  onPageSizeChange (size) {
    const selectedPageSize = +size
    this.setState({ selectedPageSize: selectedPageSize })
  }
  onShowSizeChange (current, size) {
    this.props.onPageSizeChange(size)
  }
  componentWillReceiveProps (nextProps) {
    this.onPageSizeChange(nextProps.pageSize)
  }

  render () {
    const { className, currentPage, pageSizes, total } = this.props
    let paginationClass = ''
    if (className) {
      paginationClass += ` ${className}`
    }
    return (
      <div style={paginationStyle} className={paginationClass}>
        <Pagination
          style={paginationPagesStyle}
          showQuickJumper
          showSizeChanger
          current={currentPage}
          pageSize={this.state.selectedPageSize}
          pageSizeOptions={pageSizes}
          total={total}
          onChange={this.handleCurrentChange}
          onShowSizeChange={this.onShowSizeChange}
        />
      </div>
    )
  }

}
