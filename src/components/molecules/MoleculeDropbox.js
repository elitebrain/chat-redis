import React from 'react'
import { array, func, number } from "prop-types";

import { DropboxItem, DropboxWrapper } from './molecule.styles'

const MoleculeDropbox = props => {
  const { itemList, handleClick, x = 0, y = 0 } = props;
  return (
    <DropboxWrapper x={x} y={y}>
      {itemList.map((item, i) => (
        <DropboxItem key={i} onClick={handleClick}>{item}</DropboxItem>
      ))}
    </DropboxWrapper>
  )
}

MoleculeDropbox.propTypes = {
  itemList: array,
  handleClick: func,
  x: number,
  y: number
}

export default MoleculeDropbox
