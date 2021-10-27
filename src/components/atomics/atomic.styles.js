import styled from "styled-components";

const DefaultButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid var(--gray-600);
  color: var(--gray-800);
  border-radius: 4px;
  transition: .2s ease-in-out;

  &.variant_filled {
    background-color: var(--primary);
  }
  &.variant_filled.warning {
    background-color: var(--warning);
  }
  &.variant_filled.disabled {
    color: var(--gray-500);
  }

  &:hover {
    cursor: pointer;
    background-color: var(--gray-300-alpha-80);
  }
`;

const DefaultInput = styled.input`
  border-bottom: 1px solid var(--gray-400);
  color: var(--gray-700);
  padding: 6px 12px;
  width: ${props => props.width || "100%"};

  &::placeholder {
    color: var(--gray-500);
  }

  &:focus {
    border-bottom-color: var(--gray-600);
  }
  
  &.variant_outlined {
    border: 1px solid var(--gray-400);
  }

  &.variant_filled {
    background-color: var(--gray-400-alpha-50);
  }

  &.has_error {
    border-bottom-color: var(--danger);
  }
  &.has_error::placeholder {
    color: var(--danger);
  }
`;

export { DefaultButton, DefaultInput };
