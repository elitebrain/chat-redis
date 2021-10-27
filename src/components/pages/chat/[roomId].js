import React, { useEffect, useState } from 'react'

import { Layout } from 'components/templates';
import ChatComponent from 'components/Chat/ChatComponent';
import { getQueryFromSearch } from 'utils/functions';
import { socket } from 'utils/socket';

const Chat = props => {
  const { location, match } = props;
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { roomId } = match.params;
  const { search } = location;
  const headerTitle = `${getQueryFromSearch({ search, key: 'roomName' })}`;
  const headerSubTitle = `(${getQueryFromSearch({ search, key: 'roomName' }).split(',').length})`;

  useEffect(() => {
    socket.on("receiveMsg", (msgObj) => {
      const { hash, email, nickname, msg, send_time } = msgObj;
      setChatList(prevState => {
        if (roomId === msgObj.roomId && prevState.findIndex(v => v.hash === hash) === -1) {
          return [...prevState, { hash, email, nickname, msg, send_time }].sort((a, b) => new Date(a.send_time) - new Date(b.send_time));
        } else {
          return prevState;
        }
      })
    });
  }, []);

  useEffect(() => {
    console.log(roomId)
    if (roomId) {
      setLoading(true);
      setTimeout(() => socket.emit('getMsg', { roomId }), 1000);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [roomId]);

  const handleSendMsg = ({ msg, email, nickname }) => {
    console.log(msg, email, roomId)
    socket.emit("sendMsg", { roomId, email, nickname, msg });
  };
  return (
    <Layout arrowLeft headerTitle={headerTitle} headerSubTitle={headerSubTitle} magnification contentHeight="580px">
      <ChatComponent loading={loading} chatList={chatList} handleSendMsg={handleSendMsg} />
    </Layout>
  )
}

export default Chat