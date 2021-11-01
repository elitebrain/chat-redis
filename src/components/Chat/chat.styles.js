import styled from "styled-components";

const ChatListLi = styled.li`
  position: relative;
  height: 60px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--gray-300);
  color: var(--gray-800);
  &:first-child {
    border-top: 1px solid var(--gray-300);
  }
  &:hover {
    cursor: pointer;
    background-color: var(--gray-200);
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
  & > p {
    color: var(--gray-600);
  }
  & > p.latest_send_time {
    position: absolute;
    right: 12px;
    top: 6px;
    font-size: 12px;
    color: var(--gray-500);
  }
  & > p.preview_msg {
    font-size: 12px;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
const ChatNickname = styled.h2`
  color: var(--gray-700);
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
`;
const ChatDividerTime = styled.div`
  position: relative;
  height: 16px;
  & > span {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  & > span.divider {
    height: 100%;
    width: calc(50% - 79px);
    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-top: 1px solid var(--gray-600);
    }
  }
  & > span.time {
    width: 150px;
    font-size: 12px;
    text-align: center;
    color: var(--gray-600);
  }
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
  ChatDividerTime,
  InputWrapper
}