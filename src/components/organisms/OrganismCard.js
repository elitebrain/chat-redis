import React from 'react'
import { array, object, oneOfType, string } from "prop-types";

import { DefaultCard } from './organism.styles'

const OrganismCard = props => {
  const { className, children, variant } = props;
  return (
    <DefaultCard className={`${className} variant_${variant}`}>
      {children}
    </DefaultCard>
  )
}

OrganismCard.propTypes = {
  className: string,
  children: oneOfType([array, object]),
  variant: string
}

export default OrganismCard
