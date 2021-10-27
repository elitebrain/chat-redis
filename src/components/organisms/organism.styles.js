import styled from "styled-components";

const DefaultCard = styled.div`
  border-radius: 20px;
  background-color: var(--gray-200);
  padding: 24px;

  &.variant_outlined {
    background-color: transparent;
    border: 1px solid var(--gray-200);
  }
`;

export { DefaultCard };
