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

const user = new schema.Entity('users');

const comment = new schema.Entity('comments', {
  commenter: user
});

const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

// normalize(data, schema)
// data [required]: Input JSON (or plain JS object) data that needs normalization
// schema [required]: A schema definition

const normalizedData1 = normalize(originalData, article);
console.log(normalizedData1)


const data = [ { id: 'a', name: 'Madell' }, { id: 'b', name: 'Patrick' } ];
const userSchema = new schema.Entity('users');

// schema.Array(definition, schemaAttribute)
// Creates a schema to normalize an array of entities.
// If the input value is an Object instead of an Array, the normalized result will be an Array of the Object's values.

const userListSchema = new schema.Array(userSchema);

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