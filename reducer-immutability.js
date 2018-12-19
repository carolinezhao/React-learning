// reducer

// 在数组中插入/删除/更新数据

// 原则：不修改原始内存中的引用。
// 方法：先进行复制，在复制内容上做修改。注意要复制嵌套数据的所有层级。

const insertItem1 = (array, action) => {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index)
  ]
}

const insertItem2 = (array, action) => {
  let newArray = array.slice()
  newArray.splice(action.index, 0, action.item)
  return newArray
}

const removeItem1 = (array, action) => {
  return [...array.slice(0, action.index), ...array.slice(action.index + 1)]
}

const removeItem2 = (array, action) => {
  let newArray = array.slice()
  newArray.splice(action.index, 1)
  return newArray
}

const removeItem3 = (array, action) => {
  return array.filter((item, index) => index !== action.index)
}

const updateObjectInArray = (array, action) => {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item
    }

    return {
      ...item,
      ...action.item
    }
  })
}

// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns