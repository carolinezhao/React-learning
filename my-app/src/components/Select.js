import React, { Component } from 'react';

import Dot from './Dot'

class Select extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dotsSelected: 0
    }

    this.change = this.change.bind(this)
  }
  
  change(dotsSelected) {
    this.setState({dotsSelected})
  }
  
  render() {
    const totalDots = 5
    const {dotsSelected} = this.state
    
    return (
      <div>
        {[...Array(totalDots)].map((n, i) =>
            <Dot key={i} selected={i < dotsSelected} onClick={() => {this.change(i + 1)}}/>
          )
        }
        <span>{dotsSelected} of {totalDots}</span>
      </div>
    )
  }
}

export default Select

// reference: Learning React Chapter 6
