import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  margin: 0.5rem 1rem;
`

export default function Header() {
  return (
    <StyledHeader>
      <h3>CRA Lambda Demo</h3>
    </StyledHeader>
  )
}
