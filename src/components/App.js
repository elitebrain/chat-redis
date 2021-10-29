import React, { createContext, useState, useEffect } from "react";
import GlobalStyle from "styles/global";
import { getHashStr } from "utils/functions";

import { socket } from 'utils/socket';
import Routes from "./Routes";
import Modal from "./templates/Modal";

export const AppContext = createContext();

const App = () => {
  const [signedMembers, setSignedMembers] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [user, setUser] = useState({ email: null, nickname: null });
  
  useEffect(() => {
    // 로그인 정보 가져오기 (sessionStorage)
    const userInfo = sessionStorage.getItem("user");
    if (userInfo) {
      const { email, nickname } = JSON.parse(userInfo);
      setUser({ email, nickname });
      socket.emit("signin:user", { email, nickname });
    };
    
    // socket 접속 정보
    socket.on('connected', obj => {
      console.log("connected obj", obj)
    });

    // 회원 목록 받기
    socket.on("signed_members", list => {
      setSignedMembers(list.map(item => JSON.parse(item)));
    });
    // 회원 목록 요청
    socket.emit("signup_members");
  }, []);

  useEffect(() => {
    if (user?.email) {
      // 채팅 초대 받기
      socket.on("invited:chat", ({ roomId, roomName, emailList }) => {
        console.log("invited:chat", roomId, joinedRooms, roomName, emailList, user.email);
        socket.emit("join:room", { roomId, roomName, email: user.email, emailList });
      });
  
      // 채팅 방 입장
      socket.on("joined:room", ({ roomId, email }) => {
        console.log('채팅 방 입장', roomId, email)
      });

      // 참여한 채팅 방 목록 요청
      socket.emit("joined:rooms", ({ email: user.email }));
      // 참여한 채팅 방 목록 받기
      socket.on("joined_rooms", ({ roomList }) => {
        console.log("joined_rooms ", roomList.map(item => JSON.parse(item)));
        setJoinedRooms(roomList.map(item => JSON.parse(item)));
      });
    }
  }, [user])
  
  // 로그인
  const handleSignIn = ({ email, nickname }) => {
    socket.emit("signin:user", ({ email, nickname }));
    sessionStorage.setItem("user", JSON.stringify({ email, nickname }));
    setUser({ email, nickname });
  }
  // 대화 초대
  const handleInviteChat = ({ selectedMembers, cb }) => {
    console.log(selectedMembers)
    const roomId = getHashStr(16);
    const roomNames = [user.nickname];
    const emailList = [];
    for (let i = 0; i < selectedMembers.length; i++) {
      const { email, nickname } = selectedMembers[i];
      roomNames.push(nickname);
      emailList.push(email);
    }
    const roomName = roomNames.sort().toString();
    socket.emit("invite:chat", { roomId, roomName, email: user.email, emailList });
    handleCloseModal();
    cb(`/chat/${roomId}?roomName=${roomName}`);
  }
  // 로그아웃
  const handleSignOut = () => {
    console.log('handleSignOut')
    socket.emit('signout:user');
    sessionStorage.removeItem('user');
    setUser({ email: null, nickname: null })
  }

  // 채팅목록 -> 오픈채팅(대화상대 목록) 모달
  const handleOpenModal = (_modalChildren) => {
    console.log('handleOpenModal')
    setModalChildren(_modalChildren);
    setIsOpenModal(true);
  }
  const handleCloseModal = () => {
    console.log('handleCloseModal')
    setIsOpenModal(false);
  }
  return (
    <AppContext.Provider value={{ user, handleSignIn, handleSignOut, signedMembers, handleOpenModal, handleCloseModal, handleInviteChat, joinedRooms }}>
      <Routes />
      {isOpenModal && <Modal handleCloseModal={handleCloseModal}>{modalChildren}</Modal>}
      <GlobalStyle />
    </AppContext.Provider>
  );
}

export default App;
