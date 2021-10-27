import styled from "styled-components";

const DefaultRow = styled.div`
  margin-bottom: ${props => props.marginBottom || "24px"};
`;

const DropboxItem = styled.li`
  padding: 4px 8px;
  &:hover {
    background-color: var(--gray-300);
    cursor: pointer;
  }
`;
const DropboxWrapper = styled.ul`
  position: fixed;
  border: 1px solid var(--gray-900);
  background-color: var(--gray-100);
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

export { DefaultRow, DropboxItem, DropboxWrapper };
