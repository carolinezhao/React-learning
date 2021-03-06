# State 范式化

## 复杂数据结构存在的问题

- 当数据在多处有重复，很难保证所有数据都进行更新。
- 嵌套数据意味着 reducer 逻辑嵌套更多、复杂度更高。
- 不可变的数据在更新时需要状态树的祖先数据进行复制和更新，并且新的对象引用会导致与之 connect 的所有 UI 组件都重复 render。尽管要显示的数据没有发生任何改变，对深层嵌套的数据对象进行更新也会强制完全无关的 UI 组件重复 render。

## 范式化

- 由嵌套到扁平。
- 任何类型的数据在 state 中都有自己的 “表”。
- “数据表” 应将各个项目存储在对象中，其中每个项目的 ID 作为 key，项目本身作为 value。
- 对单个项目的引用都应该根据存储项目的 ID 来完成。
- ID 数组应该用于排序。

## 范式化数据的优势

- 每个数据项只在一个地方定义，数据项更新时不用在多处改变。
- reducer 逻辑不用处理深层次的嵌套，看上去更简单。
- 检索或者更新给定数据项的逻辑变得简单与一致。给定一个数据项的 type 和 ID，不必挖掘其他对象而是通过几个简单的步骤就能查找到它。
- 每个数据类型都是唯一的，像改评论这样的更新仅仅需要状态树中 “comment > byId > comment” 这部分的复制。这也就意味着在 UI 中只有数据发生变化的一部分才会发生更新。
- 范式化的 state 意味更多的组件被 connect，每个组件负责查找自己的数据，这和小部分的组件被 connect，然后查找大部分的数据再进行向下传递数据是恰恰相反的。事实证明，connect 父组件只需要将数据项的 Id 传递给 connect 的子对象是在 Redux 应用中优化 UI 性能的良好模式，因此保持范式化的 state 在提高性能方面起着关键作用。

## reference

- https://cn.redux.js.org/docs/recipes/reducers/NormalizingStateShape.html