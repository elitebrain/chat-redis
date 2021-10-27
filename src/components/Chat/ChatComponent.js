import React, { useContext, useState, useRef, useEffect } from 'react';
import { array, bool, func } from "prop-types";

import { ChatWrapper, ChatItem, ChatMsg, ChatTime, InputWrapper, ChatNickname, ChatLoading } from './chat.styles'
import { AppContext } from 'components/App';
import { dateForm } from 'utils/functions';
import { AtomicButton, AtomicInput } from 'components/atomics';

const ChatComponent = props => {
  const { chatList, loading, handleSendMsg } = props;
  const { user } = useContext(AppContext);
  const [msg, setMsg] = useState('');
  const ulRef = useRef();
  
  const handleChange = e => {
    const { value } = e.target;
    setMsg(value);
  }

  const _handleSendMsg = () => {
    if (msg.length > 0) {
      setMsg('');
      handleSendMsg({ msg, email: user.email, nickname: user.nickname });
    }
  }
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      _handleSendMsg();
    }
  }
  
  useEffect(() => {
    if (ulRef.current) {
      const ulHeight = ulRef.current.offsetHeight;
      let innerHeight = 0;
      const children = ulRef.current.children;
      for (let i = 0; i < children.length; i++) {
        innerHeight += children[i].offsetHeight + 8;
      }
      const scrollTop = innerHeight - ulHeight;
      if (scrollTop > 0) {
        ulRef.current.scrollTop = scrollTop + 48;
      }
    }
  }, [chatList]);
  
  const exposureTime = (idx, gubun) => {
    if (gubun) {
      if (idx === chatList.length - 1 || chatList[idx].email !== chatList[idx+1].email || dateForm(chatList[idx].send_time).format('HH:mm') !== dateForm(chatList[idx+1].send_time).format('HH:mm')) {
        return true;
      }
    }
    return false;
  }
  
  return (
    <>
      <ChatWrapper ref={ulRef}>
        {loading && <ChatLoading />}
        {chatList.map((item, i) => (
          <ChatItem key={i} className={user.email === item.email ? "send_msg" : "receive_msg"}>
            {user.nickname !== item.nickname && (i === 0 || chatList[i-1].nickname !== item.nickname || !chatList[i-1].hash) && <ChatNickname>{item.nickname}</ChatNickname>}
            {exposureTime(i, user.email === item.email) && <ChatTime className="send_msg">{dateForm(item.send_time).format('HH:mm')}</ChatTime>}
            <ChatMsg className="msg">{item.msg}</ChatMsg>
            {exposureTime(i, user.email !== item.email) && <ChatTime className="receive_msg">{dateForm(item.send_time).format('HH:mm')}</ChatTime>}
          </ChatItem>
        ))}
      </ChatWrapper>
      <InputWrapper>
        <AtomicInput className="mr_6px" value={msg} handleChange={handleChange} handleKeyUp={handleKeyUp} width="calc(100% - 62px)" />
        <AtomicButton variant="filled" warning disabled={msg.length === 0} handleClick={_handleSendMsg}>전송</AtomicButton>
      </InputWrapper>
    </>
  )
}

ChatComponent.propTypes = {
  chatList: array,
  loading: bool,
  handleSendMsg: func
}

export default ChatComponent
