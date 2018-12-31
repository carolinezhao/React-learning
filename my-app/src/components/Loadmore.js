import React, { Component } from "react";

// reference: https://github.com/WhiteYin/translation/issues/13

class Loadmore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 15,
      loading: false
    };
  }

  // use the scrollTop property of the element to get the scroll position (which is relative to the top of the window) and then add it to the clientHeight property (the height of the document)

  componentDidMount() {
    this.refs.myscroll.addEventListener("scroll", () => {
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight
      ) {
        this.loadMore();
      }
    });
  }

  showItems() {
    let items = [];
    for (let i = 0; i < this.state.items; i++) {
      items.push(<li key={i}>Item {i}</li>);
    }
    return items;
  }

  loadMore() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ items: this.state.items + 5, loading: false });
    }, 1000);
  }

  // there is a reference to the div called myscroll which makes it possible to access the element in React using this.refs.myscroll

  render() {
    return (
      <div ref="myscroll" style={{ height: "400px", overflow: "auto" }}>
        <ul>{this.showItems()}</ul>
        {this.state.loading
          ? <p>loading ...</p>
          : ""}
      </div>
    );
  }
}

export default Loadmore;