import styled from "styled-components";

const ChatListLi = styled.li`
  height: 60px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--gray-300);
  &:first-child {
    border-top: 1px solid var(--gray-300);
  }
  &:hover {
    cursor: pointer;
    background-color: var(--gray-200);
  }

  & > h2 {
    display: inline-block;
    margin-right: 6px;
    font-size: 16px;
    color: var(--gray-800);
    font-weight: 600;
  }
  & > h3 {
    display: inline-block;
    font-size: 12px;
    color: var(--gray-600);
  }
`;
const ChatListUl = styled.ul`
  width: 100%;
`;
const ChatWrapper = styled.ul`
  position: relative;
  height: calc(100% - 80px);
  overflow-y: auto;
  padding: 48px 0 0 24px;
  background-color: var(--primary-alpha-50);
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--gray-600-alpha-50);
  }
`;
const ChatLoading = styled.li`
  position: absolute;
  width: 100%;
  height: 30%;
  left: 0;
  top: 0;
  &::before {
    position: absolute;
    content: '';
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid var(--primary);
    border-top-color: transparent;
    animation: spin 1s infinite linear;
  }
`;
const ChatItem = styled.li`
  display: block;
  margin-bottom: 8px;
  &.send_msg {
    text-align: right;
    margin-right: 8px;
  }
  &.welcome {
    text-align: center;
  }
  &.send_msg > .msg {
    background-color: var(--warning);
  }
  &.receive_msg > .msg {
    background-color: var(--white);
  }
`;
const ChatTime = styled.span`
  display: inline-block;
  vertical-align: bottom;
  font-size: 12px;
  margin-bottom: 6px;
  &.send_msg {
    margin-right: 6px;
  }
  &.receive_msg {
    margin-left: 6px;
  }
`;
const ChatMsg = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  max-width: 60%;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
`;
const ChatNickname = styled.h3`
  color: var(--gray-700);
  font-size: 14px;
  margin-bottom: 6px;
`;

const InputWrapper = styled.div`
  height: 80px;
  padding: 12px;
`;

export {
  ChatListLi,
  ChatListUl,
  ChatWrapper,
  ChatLoading,
  ChatItem,
  ChatTime,
  ChatMsg,
  ChatNickname,
  InputWrapper
}