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

const user = new schema.Entity('users');

const comment = new schema.Entity('comments', {
  commenter: user
});

const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

const normalizedData = normalize(originalData, article);

console.log(normalizedData)

class Detail extends Component {
  render() {
    return (
      <div>Print normalizedData</div>
    )
  }

}

export default Detail;