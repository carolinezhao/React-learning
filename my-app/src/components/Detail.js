import React, { Component } from 'react';
import { normalize, schema } from 'normalizr';

const originalData = {
  "id": "123",
  "author": {
    "id": "1",
    "name": "Caroline"
  },
  "title": "My awesome blog post",
  "comments": [{
    "id": "324",
    "commenter": {
      "id": "2",
      "name": "Bear"
    }
  }]
}

// schema.Entity(key, definition = {}, options = {})
// key [required]: The key name under which all entities of this type will be listed in the normalized response. Must be a string name.
// definition: A definition of the nested entities found within this entity. Defaults to empty object.
// You do not need to define any keys in your entity other than those that hold nested entities. All other values will be copied to the normalized entity's output.

// 所有第一个参数 (string) 都是最终的 entities 对象的属性。

const user = new schema.Entity('users');

const test1 = normalize(originalData, user); // 所有内容都放进了 users 对象
console.log(test1)

const comment = new schema.Entity('comments', {
  commenter: user // 目标数据中 commenter 的属性值会以 user (schema) 的 id 表示
});

const test2 = normalize(originalData, comment); // 所有内容都放进了 comments 对象
console.log(test2)

const article = new schema.Entity('articles', {
  author: user, // 目标数据中 author 的属性值会以 user (schema) 的 id 表示
  comments: [comment] // 目标数据中 comments 数组中的元素会以 comment (schema) 的 id 表示
});

// {
//   ...,
//   comments: ['6'] // 通过 id 定位到相应的 comment
// }

// comments: {
//   6: {
//     id: '6',
//     commenter: '1' // 通过 id 定位到相应的 user
//   }
// }

// users: {
//   1: {
//     id: '1',
//     name: 'caroline'
//   }
// }


// normalize(data, schema)
// data [required]: Input JSON (or plain JS object) data that needs normalization
// schema [required]: A schema definition

const normalizedData1 = normalize(originalData, article);
console.log(normalizedData1)
console.log('')


const data = [ { id: 'a', name: 'Madell' }, { id: 'b', name: 'Patrick' } ];
const userSchema = new schema.Entity('users');

// schema.Array(definition, schemaAttribute)
// Creates a schema to normalize an array of entities.
// If the input value is an Object instead of an Array, the normalized result will be an Array of the Object's values.

const userListSchema = new schema.Array(userSchema);
// or use shorthand syntax:
// const userListSchema = [ userSchema ];

const test3 = normalize(data, userListSchema);
console.log(test3)

const normalizedData2 = normalize(data, userListSchema);
console.log(normalizedData2)


// schema.Object
// schema.Union
// schema.Values


class Detail extends Component {
  render() {
    return (
      <div>Print normalizedData</div>
    )
  }

}

export default Detail;