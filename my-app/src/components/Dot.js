import React from 'react';

import './Dot.css'

const Dot = ({ selected = false, onClick }) =>
  (<div className={selected ? "dot selected" : "dot"} onClick={onClick} />)

export default Dot