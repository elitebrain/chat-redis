import styled from "styled-components";

const ContentWrapper = styled.div`
  height: ${props => props.contentHeight};
  width: 100%;
  overflow-y: auto;
  box-shadow: 0px 1px 1px 1px var(--gray-800-alpha-50);
`;

const DefaultLayout = styled.div`
  display: block;
  width: 500px;
  margin: 100px auto;
  background-color: ${props => props.bgColor || "transparent"};
  border: 1px solid var(--gray-700);
`;

const FooterItem = styled.span`
  display: inline-block;
  width: calc(100% / 3);
  height: 80px;
  background-color: var(--gray-200);
  border-right: 1px solid var(--gray-400);
  &:last-child {
    border-right: none;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--gray-300);
  }
`;
const FooterNav = styled.nav`
  background-color: var(--gray-300);
  height: 100%;
`;
const FooterWrapper = styled.div`
  height: 80px;
`;

const HeaderWrapper = styled.div`
  height: ${props => props.height || "60px"};
  text-align: right;
  box-shadow: 0px 1px 1px 1px var(--gray-800-alpha-50);
`;

const IconWrapper = styled.div`
  display: inline-block;
  margin: ${props => props.margin || "18px"};
  height: 24px;
  float: ${props => props.float || 'initial'};

  width: ${props => props.width || "auto"};
  text-align: left;
  
  &:hover {
    cursor: pointer;
  }

  & > h2 {
    display: inline-block;
    vertical-align: text-bottom;
    margin-right: 6px;
    font-size: 16px;
    color: var(--gray-800);
    font-weight: 600;
    max-width: calc(100% - 30px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > h3 {
    display: inline-block;
    vertical-align: text-bottom;
    font-size: 12px;
    color: var(--gray-600);
  }
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`;
const ModalContent = styled.div`
  position: absolute;
  background-color: var(--gray-100);
  width: 300px;
  min-height: 400px;
`;
const ModalOveray = styled.div`
  position: absolute;
  background-color: var(--gray-800-alpha-80);
  width: 100%;
  height: 100%;
`;

export { ContentWrapper, DefaultLayout, FooterItem, FooterNav, FooterWrapper, HeaderWrapper, IconWrapper, ModalContainer, ModalContent, ModalOveray };