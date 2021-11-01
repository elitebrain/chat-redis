import React from 'react'
import { array, func } from "prop-types";

import { ChatListLi, ChatListUl } from './chat.styles';
import { dateForm } from 'utils/functions';

const ChatRoomComponent = props => {
  const { chatRoomList, handleClick } = props;
  return (
    <ChatListUl>
      {chatRoomList.map((item, i) => (
        <ChatListLi key={i} onClick={() => handleClick(item)}>
          <h2>{item.roomName}</h2>
          <h3>{item.roomName.split(',').length}</h3>
          {item.latest_msg_send_time && <p className="latest_send_time">{dateForm(item.latest_msg_send_time).format("YYYY-MM-DD||HH:mm")}</p>}
          {item.latest_msg && <p className="preview_msg">{item.latest_msg}</p>}
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
