/*!
 * 一个基于 ATable 通用的包含表格以及可选包含分页的表格组件
 * 可以基于该组件做各种定制（比如 XList），也可单独使用
 * @see http://vue.ant.design/components/table-cn
 * @see https://stackoverflow.com/questions/43702591/how-to-use-template-scope-in-vue-jsx
 * 
 * @todo
 * - 增加 TextButton 和 AButton 控制
 */

import React from 'react'
import assign from 'lodash/assign'
import cloneDeep from 'lodash/cloneDeep'
import isFunction from 'lodash/isFunction'
import { Table, Tooltip } from 'antd'
import Pagination from './Pagination'
import TextButton from './TextButton'
import { showErrorTip } from '../../utils/helpers'
import './PQTable.less'

/* constants，默认的页面大小 */

const DEFAULT_PAGE_SIZES = [ '10', '20', '50', '100' ]
export default class PQTable extends React.Component {
  constructor (props) {
   super (props)
   const defaultPageSizes = props.defaultPageSizes ? props.defaultPageSizes : DEFAULT_PAGE_SIZES
   // 分页的默认数据
   const pagination = assign({ }, {
     currentPage: 1,
     totalRows: 0,
     pageSize: defaultPageSizes[0],
     pageSizes: defaultPageSizes
   }, props.initialPagination)
   this.state = {
    pagination: pagination,
    loadedInitialData: false,
    listData: [ ]
   }
   this.loadData = this.loadData.bind(this)
   this.handlePageSizeChange = this.handlePageSizeChange.bind(this)
   this.handleCurrentChange = this.handleCurrentChange.bind(this)
   this.emitOperation = this.emitOperation.bind(this)
 }

  // 过滤列表的操作项
  get collapsedOperations () {
    return this.props.operations.filter((x) => x.collapsed)
  }

  get hasCollapsedOperation () {
    return this.collapsedOperations.length > 0
  }

  get noCollapsedOperations () {
    return this.props.operations.filter((x) => !x.collapsed)
  }

  get newColums () {
    const data = this.transformColums(this.props.columns)
    return data
  }

  toBoolean (fnOrBoolean, ...args) {
    if (isFunction(fnOrBoolean)) {
      return !!fnOrBoolean.apply(this, args)
    }
    return !!fnOrBoolean
  }

  componentDidMount() {
　　this.props.onRef(this)
　}

  transformColums (data) {
    const OperationsRenderer = (/* createElement injected */context) => {
      const { record, index } = context
      const noCollapsedOperations = this.noCollapsedOperations.filter((x) => isFunction(x.exist) ? this.toBoolean(x.exist, record, index) : true)
      const Buttons = noCollapsedOperations.map((operation, index) => {
        const disabled = this.toBoolean(operation.disabled)
        const danger = this.toBoolean(operation.danger)
        return (
          <TextButton
            key={index}
            className='pq-table-operation-item'
            disabled={disabled}
            danger={danger}
            label={operation.label}
            onButtonClick={this.emitOperation}
          ></TextButton>
        )
      })
  
      return Buttons
    }
    const colums = data.map((x) => {
      switch (x.customRender) {
        case 'ellipsis-with-tooltip':
          x.render = text => <Tooltip placement='top' className='pq-table-tooltip' title={text}>{text}</Tooltip>
          break
        case 'operation':
          x.render = (text, record, index) => <OperationsRenderer text={text} record={record} index={index} />
          break        
      }
      return x
    })
    return colums
  }

  componentWillMount () {
    Promise.resolve(
      this.props.loadDataOnMount ? this.loadData() : null
    ).finally(() => {
      this.setState({ loadedInitialData: true })
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.query !== nextProps.query) {
      this.handleQueryChange()
    }
  }

  handleQueryChange () {
    if (!this.state.loadedInitialData) {
      return
    }
    if (this.state.pagination.currentPage !== 1) {
      this.state.pagination.currentPage = 1
    }
    this.loadData()
  }

  handleChangeTable (pagination, filters, sorter) {
    // this.props.onTableChange(pagination, filters, sorter)
  }

  // 重置分页数据
  resetPagination () {
    this.state.pagination.currentPage = 1
    this.state.pagination.totalRows = 0
  }

  emitOperation (operation, record) {
    // 因为如果是 @click.native 的话，哪怕是 disabled，仍旧会触发
    // 所以在这里再判断一次
    // 也可以不用 AMenu 的形式，但是还要改样式
    const disabled = !!(typeof operation.disabled === 'function' ? operation.disabled(record) : operation.disabled)

    if (disabled) { return }

    return assign({ }, { record }, {
      type: operation.type,
      listData: this.state.listData
    })
  }

  loadData () {
    // this.listData = [ ]
    return this.props.loadDataApi(this.state.pagination.currentPage, this.state.pagination.pageSize)
      .then((data) => {
        const totalCount = this.props.getDataTotalCount(data)
        this.state.pagination.totalRows = totalCount
        // 解决删除最后一页的最后一条数据时，没有触发change事件重新load的问题
        const maxPage = Math.ceil(totalCount / this.state.pagination.pageSize)
        if (maxPage > 0 && maxPage < this.state.pagination.currentPage) {
          return this.handleCurrentChange(maxPage)
        }
        const listData = this.props.transformListData(data)
        this.setState({ listData: listData })
        return { listData }
      }, (error) => {
        this.setState({ listData: [ ] })
        this.resetPagination()
        showErrorTip(error, '查询列表数据失败')
        return Promise.reject(error)
      })
  }

  resetReload () {
    console.log(2)
    this.resetPagination()
    return this.loadData()
  }

  getCurrentPage () {
    return this.state.pagination.currentPage
  }

  getPagination () {
    return cloneDeep(this.state.pagination)
  }

  paginationUpdate () {
    this.loadData()
  }

  handlePageSizeChange (pageSize) {
    this.state.pagination.pageSize = pageSize
    this.paginationUpdate()
  }

  handleCurrentChange (currentPage) {
    if (this.state.pagination.currentPage === currentPage) {
      return
    }
    this.state.pagination.currentPage = currentPage
    this.paginationUpdate()
  }

  onRef (ref) {
    this.child = ref
  }
 
  render () {
    let tableClass = 'pq-table-core'
    const { layoutFixed, singleLineMode, stickHeader, className } = this.props
    if (className) {
      tableClass += ` ${className}`
    }
    if (layoutFixed) {
      tableClass += ' table-layout-fixed'
    }
    if (singleLineMode) {
      tableClass += ' table-single-line-mode'
    }
    if (stickHeader) {
      tableClass += ' stick-header'
    }
    let TablePagination = null

    const { pagination } = this.state
    if (this.props.withPagination && this.state.loadedInitialData) {
      TablePagination = (
        <Pagination
          onPageSizeChange={this.handlePageSizeChange}
          onRef={this.onRef}
          onCurrentChange={this.handleCurrentChange}
          currentPage={pagination.currentPage}
          total={pagination.totalRows}
          pageSize={pagination.pageSize}
          pageSizes={pagination.pageSizes}
          className="pq-table-pagination"
        />
      )
    }

    return (
      <div className="pq-table">
        <Table
          className={tableClass}
          dataSource={this.state.listData}
          columns={this.newColums}
          pagination={false}
          rowKey={this.props.rowKey}
          size="middle"
          onChange={this.handleChangeTable}
          scroll={this.props.stickHeader ? { y: 'calc(100% - 46px)' } : { }}
        >
        </Table>
        {TablePagination}
      </div>
    )
  }
  

}
