import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

// reference: https://github.com/WhiteYin/translation/issues/13

class Loadmore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 20,
      hasMoreItems: true
    };
  }

  showItems() {
    let items = [];
    for (let i = 0; i < this.state.items; i++) {
      items.push(<li key={i}>Item {i}</li>);
    }
    return items;
  }

  loadMore() {
    if (this.state.items === 200) {
      this.setState({
        hasMoreItems: false
      });
    } else {
      setTimeout(() => {
        this.setState({
          items: this.state.items + 20
        });
      }, 1000);
    }
  }

  render() {
    return (
      <div style={{height:'200px', overflow:'auto'}}>
        <InfiniteScroll
          loadMore={this.loadMore.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={<div key={0}>Loading...</div>}
          useWindow={false}
        >
          {this.showItems()}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Loadmore;