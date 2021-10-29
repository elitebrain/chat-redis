import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import { Layout } from 'components/templates';
import ChatRoomComponent from 'components/Chat/ChatRoomComponent';
import { AppContext } from 'components/App';
import MembersModalComponent from 'components/Members/MembersModalComponent';

const ChatList = () => {
  const { signedMembers, handleOpenModal, joinedRooms } = useContext(AppContext);
  const history = useHistory();
  const modalChildren = <MembersModalComponent members={signedMembers} history={history} />
  const handleClick = (item) => {
    const { roomId, roomName } = item;
    history.push(`/chat/${roomId}?roomName=${roomName}`);
  };
  console.log(joinedRooms)
  return (
    <Layout arrowLeft magnification plus handlePlus={() => handleOpenModal(modalChildren)} footer>
      <ChatRoomComponent chatRoomList={joinedRooms} handleClick={handleClick} />
    </Layout>
  )
}

export default ChatList
