import React, { useState, useEffect } from 'react'
import { Pagination as AntPagination } from 'antd'

const paginationStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}
const paginationPagesStyle = { marginRight: '10px' }

export default function Pagination (props) {
  const [selectedPageSize, setSelectedPageSize] = useState(10)
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    if (!isMount) {
      setIsMount(true)
    }
    setSelectedPageSize(+props.pageSize)
  }, [props.pageSize])

  function handleCurrentChange (currentPage) {
    props.onCurrentChange(currentPage)
  }

  function onPageSizeChange (size) {
    setSelectedPageSize(+size)
  }

  function onShowSizeChange (current, size) {
    props.onPageSizeChange(size)
  }

  const { className, currentPage, pageSizes, total } = props
  const paginationClass = className || ''
  return (
    <div style={paginationStyle} className={paginationClass}>
      <AntPagination
        style={paginationPagesStyle}
        showQuickJumper
        showSizeChanger
        current={currentPage}
        pageSize={selectedPageSize}
        pageSizeOptions={pageSizes}
        total={total}
        onChange={handleCurrentChange}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  )
}
