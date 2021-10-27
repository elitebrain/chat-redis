import styled from "styled-components";

const ButtonWrapper = styled.div`
  height: 60px;
  padding: 8px;
  text-align: right;
`;

const MembersLi = styled.li`
  position: relative;
  padding: 6px 12px;
  border-bottom: 1px solid var(--gray-300);
  padding-left: 24px;

  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 7px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--gray-600);
  }

  &.signed_in::before {
    background-color: var(--success);
  }
  
  &:first-child {
    border-top: 1px solid var(--gray-300);
  }
  &:hover {
    cursor: pointer;
    background-color: var(--gray-200);
  }

  & > span {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 24px);
  }
  & > span.check_ico {
    width: 24px;
    color: var(--gray-300);
  }
  & > span.check_ico.checked {
    color: var(--primary);
  }
`;
const MembersUl = styled.ul`
  height: ${props => props.height || 'auto'};
  overflow-y: auto;
`;

export {
  ButtonWrapper,
  MembersLi,
  MembersUl
}