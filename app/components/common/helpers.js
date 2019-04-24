export const transformColums = data => {
  const colums = data.map((x) => {
    if (x.type === 'title') {
      return x.render = text => <span title={text}>{text}</span>
    }
  })
  return colums
}