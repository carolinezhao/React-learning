# 单元测试

## 为什么要做单元测试

## 单元测试的结构和特征

单元测试的基本结构：准备输入数据、调用被测函数、断言输出结果。即 given-when-then 三段式。

特征

- 安全重构已有代码 -> 应该有且仅有一个失败的理由、不关注内部实现
  - 重构的意思是，在不改动软件外部可观测行为的基础上，调整软件内部实现的一种手段。也就是说，当被测的代码输入输出没变时，无论怎么倒腾重构代码的内部实现，测试都不应该挂掉。

- 保存业务上下文 -> 表达力极强
  - 看到测试时，你就知道它测的业务点是啥。
  - 测试挂掉时，能清楚地知道业务、期望数据与实际输出的差异。

- 快速回归 -> 快、稳定
  - 隔离尽量多的依赖。依赖少，速度就快，自然也更稳定。
  - 将依赖、集成等耗时、依赖三方返回的地方放到更高层级的测试中，有策略性地去做。
  - 测试代码中不要包含逻辑。

## React 应用的单元测试策略

reducer 测试案例

两种 reducer：一种比较简单，仅一一保存对应的数据切片；一种复杂一些，里面具有一些计算逻辑。第二种具备测试价值。

```js
import uniqBy from 'lodash/uniqBy'

export default createReducers((on) => {
  on(actions.saveUserComments, (state, action) => {
    return state.merge({
      comments: uniqBy(
        state.comments.concat(action.payload.comments), 
        'id',
      ),
    })
  })
})
```

```js
import reducers from './reducers'
import actions from './actions'

test(`
  should merge user comments and remove duplicated comments 
  when action saveUserComments is dispatched with new fetched comments
`, () => {
  const state = {
    comments: [{ id: 1, content: 'comments-1' }],
  }
  const comments = [
    { id: 1, content: 'comments-1' },
    { id: 2, content: 'comments-2' },
  ]

  const expected = {
    comments: [
      { id: 1, content: 'comments-1' },
      { id: 2, content: 'comments-2' },
    ],
  }

  const result = reducers(state, actions.saveUserComments(comments))

  expect(result).toEqual(expected)
})
```

## reference

- https://github.com/linesh-simplicity/linesh-simplicity.github.io/issues/200