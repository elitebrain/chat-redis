import React from 'react'
import { array, object, oneOfType, string } from "prop-types";

import { DefaultRow } from './molecule.styles'

const MoleculeRow = props => {
  const { children, marginBottom } = props;
  return (
    <DefaultRow marginBottom={marginBottom}>
      {children}
    </DefaultRow>
  )
}

MoleculeRow.propTypes = {
  children: oneOfType([array, object]),
  marginBottom: string
}

export default MoleculeRow
