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