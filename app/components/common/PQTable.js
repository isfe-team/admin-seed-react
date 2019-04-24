/*!
 * 一个基于 ATable 通用的包含表格以及可选包含分页的表格组件
 * 可以基于该组件做各种定制（比如 XList），也可单独使用
 * @see http://vue.ant.design/components/table-cn
 * @see https://stackoverflow.com/questions/43702591/how-to-use-template-scope-in-vue-jsx
 *
 * @example
 * <PQTable :query="query" @load-data-api="api" :columns="columns"><Query /></PQTable>
 *
 * props 见下面 props
 *
 * events
 * @emits {loadedData} loadData 完成时触发，返回转换后的列表数据
 * @emits {paginationUpdate} pagination 相关参数变化后触发（size-change 和 current-change），返回当前分页信息
 * @emits {operation} 某个操作点击时触发，返回操作类型和当前 record
 *
 * @todo
 * - 增加 TextButton 和 AButton 控制
 */

import React from 'react'
import assign from 'lodash/assign'
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'
import identity from 'lodash/identity'
import isFunction from 'lodash/isFunction'
import { Table, Tooltip, Button } from 'antd'
import Pagination from './Pagination'
import TextButton from './TextButton'
import { showErrorTip, removeHMS } from '../../utils/helpers'
import './PQTable.less'

/* constants，默认的页面大小 */

const DEFAULT_PAGE_SIZES = [ '10', '20', '50', '100' ]
export default class PQTable extends React.Component {
  constructor (props) {
   super (props)
   console.log(props, 'prop')
   this.state = {
    pagination: { },
    loadedInitialData: false,
    listData: [ ]
   }
   this.loadData = this.loadData.bind(this)
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

  componentWillMount () {
    const defaultPageSizes = this.props.defaultPageSizes ? this.props.defaultPageSizes : DEFAULT_PAGE_SIZES
    // 分页的默认数据
    const pagination = assign({ }, {
      currentPage: 1,
      totalRows: 0,
      pageSize: defaultPageSizes[0],
      pageSizes: this.defaultPageSizes
    }, this.initialPagination)
    this.setState({ pagination: pagination })
    Promise.resolve(
      this.props.loadDataOnMount ? this.loadData() : null
    ).finally(() => {
      this.loadedInitialData = true
    })
  }

  componentDidMount () {
    this.props.onRef(this)
  }

  componentWillReceiveProps () {
    this.handleQueryChange()
  }

  handleQueryChange () {
    if (!this.loadedInitialData) {
      return
    }
    if (this.state.pagination.currentPage !== 1) {
      this.state.pagination.currentPage = 1
    }
    this.loadData()
  }
  handleChangeTable (pagination, filters, sorter) {
    return sorter
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

  render () {
    const tableClass = {
      'pq-table-core': true,
      'table-layout-fixed': this.layoutFixed,
      'table-single-line-mode': this.singleLineMode,
      'stick-header': this.stickHeader
    }
    let TablePagination = null

    function toBoolean (fnOrBoolean, ...args) {
      if (isFunction(fnOrBoolean)) {
        return !!fnOrBoolean.apply(this, args)
      }
      return !!fnOrBoolean
    }

    // functional components, createElement is auto injected
    const OperationsRenderer = (/* createElement injected */context) => {
      const { record, index } = context
      const noCollapsedOperations = this.noCollapsedOperations.filter((x) => isFunction(x.exist) ? toBoolean(x.exist, record, index) : true)
      const Buttons = noCollapsedOperations.map((operation, index) => {
        const disabled = toBoolean(operation.disabled)
        const danger = toBoolean(operation.danger)
        return (
          <TextButton
            key={index}
            className='pq-table-operation-item'
            disabled={disabled}
            danger={danger}
            onClick={this.emitOperation.bind(this, operation, record)}
          >{operation.label}</TextButton>
        )
      })

      if (!this.hasCollapsedOperation || !this.showCollapsedOperation) {
        return Buttons
      }

      const Overlay = this.collapsedOperations.filter((operation) => toBoolean(operation.exist))
        .map((operation) => {
          const disabled = toBoolean(operation.disabled)
          return (
            <Menu.MenuItem key={index} disabled={disabled} onClick={this.emitOperation.bind(this, operation, record)}>
              {operation.label}
            </Menu.MenuItem>
          )
        })

      const Dropdown = (
        <Dropdown className='pq-table-operation-item pq-table-operations-more pointer' trigger={['click']}>
          <span>更多&nbsp;<AIcon type="down" /></span>
          <Menu>{Overlay}</Menu>
        </Dropdown>
      )

      return [Buttons, Dropdown]
    }

    const { pagination } = this.state

    if (this.withPagination && this.loadedInitialData) {
      TablePagination = (
        <Pagination
          onPageSizeChange={this.handlePageSizeChange}
          onCurrentChange={this.handleCurrentChange}
          currentPage={pagination.currentPage}
          total={pagination.totalRows}
          pageSize={pagination.pageSize}
          pageSizes={pagination.pageSizes}
          className="pq-table-pagination"
        />
      )
    }

    // 维护用户自定义的 scopedSlots
    const scopedSlots = assign({
      // default is useless
      default: () => null,
      component: (text, record, index) => null,
      // 非 top 情况下，比如 topLeft 会在数据比较少时出现错位
      'time-without-hms': (text) => <Tooltip placement='top' className='pq-table-tooltip' title={text}>{removeHMS(text)}</Tooltip>,
      'ellipsis-with-title': (text) => <span title={text}>{text}</span>,
      'ellipsis-with-tooltip': (text) => <Tooltip placement='top' className='pq-table-tooltip' title={text}>{text}</Tooltip>,
      'operation': (text, record, index) => <OperationsRenderer text={text} record={record} index={index} />
    }, this.$scopedSlots)
    return (
      <div className="pq-table">
        <Table
          class={tableClass}
          dataSource={this.state.listData}
          columns={this.props.columns}
          pagination={false}
          rowKey={this.props.rowKey}
          size="middle"
          onChange={this.handleChangeTable}
          scroll={this.props.stickHeader ? { y: 'calc(100% - 46px)' } : { }}
          // {...{ props: this.$attrs }}
          scopedSlots={scopedSlots}
        >
        </Table>
        {TablePagination}
      </div>
    )
  }
  

}
