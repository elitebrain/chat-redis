import React from 'react'
import { array, func } from "prop-types";

import { ChatListLi, ChatListUl } from './chat.styles';

const ChatRoomComponent = props => {
  const { chatRoomList, handleClick } = props;
  return (
    <ChatListUl>
      {chatRoomList.map((item, i) => (
        <ChatListLi key={i} onClick={() => handleClick(item)}>
          <h2>{item.roomName}</h2>
          <h3>{item.roomName.split(',').length}</h3>
        </ChatListLi>
      ))}
    </ChatListUl>
  )
}

ChatRoomComponent.propTypes = {
  chatRoomList: array,
  handleClick: func
}

export default ChatRoomComponent
