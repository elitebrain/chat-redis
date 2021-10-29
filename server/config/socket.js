const redis = require("redis");
const { getHashStr } = require("../shared/functions");
const client = redis.createClient();

// 참여한 채팅 방 목록 조회
const getJoinedRooms = (socket, email) => {
  new Promise((resolve, reject) => {
    client.smembers(email, (error, roomList) => {
      if (error) return reject(error);
      for (let i = 0; i < roomList.length; i++) {
        socket.join(JSON.parse(roomList[i]).roomId);
      }
      console.log(roomList)
      socket.emit('joined_rooms', ({ roomList }));
      resolve(roomList);
    })
  })
}

// 로그아웃 처리 (로그아웃 이벤트 | socket연결 종료)
const signOut = (socket, io) => {
  new Promise((resolve, reject) => {
    client.smembers('signup_members', (error, items) => {
      let disconnectedUser = { email: socket.email, nickname: socket.nickname, signedIn: false };
      if (error) return reject(error);
      for (i = 0; i < items.length; i++) {
        if (JSON.parse(items[i]).email === socket.email) {
          client.srem('signup_members', items[i]);
          const prevMembers = items.map(item => JSON.parse(item)).filter(v => v.email !== socket.email);
          client.sadd('signup_members', JSON.stringify(disconnectedUser));
          prevMembers.push(disconnectedUser);
          console.log('prevMembersprevMembers', prevMembers)
          io.emit("signed_members", prevMembers.map(item => JSON.stringify(item)));
        }
      }
      resolve(items);
    })
  })
}

const socketEvents = io => {
  io.on("connection", async socket => {
    console.log(socket.id);
    io.emit("connected", {id: socket.id});

    // 로그인
    socket.on("signin:user", ({ email, nickname }) => {
      console.log('@@@@@@@@@signin:user', email, nickname)
      socket.email = email;
      socket.nickname = nickname;
      new Promise((resolve, reject) => {
        client.smembers('signup_members', (error, items) => {
          if (error) return reject(error);
          for (i = 0; i < items.length; i++) {
            if (JSON.parse(items[i]).email === email) {
              client.srem('signup_members', items[i]);
            }
          }
          const prevMembers = items.map(item => JSON.parse(item)).filter(v => v.email !== socket.email);
          client.sadd('signup_members', JSON.stringify({email, nickname, signedIn: true }));
          prevMembers.push({email, nickname, signedIn: true});
          console.log('prevMembersprevMembers', prevMembers)
          io.emit("signed_members", prevMembers.map(item => JSON.stringify(item)));
          io.emit("signed_user", JSON.stringify({ email, nickname, signedIn: true }));
          resolve(items);
        })
      })
    });

    // 회원 목록
    socket.on("signup_members", () => {
      new Promise((resolve, reject) => {
        client.smembers('signup_members', (error, items) => {
          if (error) return reject(error);
          console.log('@@@@@@@@@@', items)
          resolve(items);  
          io.emit("signed_members", items);
        })
      })
    });

    // 채팅 초대 하기 (채팅 시작) 
    // roomId: hash
    // roomName: 참여자 이름 (A, B, C, ...)
    // email: 초대한 사람
    // emailList: 초대받은 사람(들)
    socket.on("invite:chat", ({ roomId, roomName, email, emailList }) => {
      console.log("invite:chat", roomId, roomName, email, emailList);
      new Promise((resolve, reject) => {
        client.smembers(email, (error, roomList) => {
          if (error) return reject(error);
          const idx = roomList.map(item => JSON.parse(item).emailList).findIndex(v => v.sort().toString() === [email, ...emailList].sort().toString());
          let _roomId = roomId;
          if (idx !== -1) {
            _roomId = roomList.map(item => JSON.parse(item))[idx].roomId
          }
          io.emit("invited:chat", { roomId: _roomId, roomName, emailList: [email, ...emailList].sort() });
        })
      })
    });

    // 채팅 초대 받기 (방 입장)
    socket.on("join:room", ({ roomId, roomName, email, emailList }) => {
      console.log('join:room', roomId, email);
      client.sadd(email, JSON.stringify({ roomId, roomName, emailList }));
      socket.join(roomId);
      io.emit("joined:room", { roomId, email });
      socket.emit("joined:rooms", { email });
      getJoinedRooms(socket, email);
    });

    // 참여한 채팅 방 목록 불러오기
    socket.on("joined:rooms", ({ email }) => {
      console.log("joined:rooms ", email);
      if (email) {
        getJoinedRooms(socket, email);
      }
    });

    // 채팅 내용 불러오기 (방 입장 시)
    socket.on("getMsg", ({ roomId }) => {
      console.log('getMsg', roomId)
      new Promise((resolve, reject) => {
        client.smembers(roomId, (error, items) => {
          if (error) reject(error);
          for (let i = 0; i < items.length; i++) {
            client.hget(items[i], 'msgObj', (err, obj) => {
              console.log(obj)
              if (err) return;
              if (obj) {
                const _msgObj = JSON.parse(obj);
                io.to(roomId).emit("receiveMsg", { roomId, hash: items[i], email: _msgObj.email, nickname: _msgObj.nickname, msg: _msgObj.msg, send_time: _msgObj.send_time })
              }
            });
            // client.hgetall(items[i], (err, msgObj) => {
            //   console.log(msgObj)
            //   if (err) return;
            //   if (msgObj) {
            //     const _msgObj = JSON.parse(msgObj.msgObj);
            //     io.to(roomId).emit("receiveMsg", { roomId, hash: items[i], email: _msgObj.email, nickname: _msgObj.nickname, msg: _msgObj.msg, send_time: _msgObj.send_time })
            //   }
            // })
          }  
        })
      })
    })
    
    // 메시지 보내기
    socket.on("sendMsg", ({ roomId, email, nickname, msg }) => {
      const hash = getHashStr(64);
      const send_time = new Date();
      client.sadd(roomId, hash);
      // client.hmset(hash, 'msg', msg, 'email', email, 'nickname', nickname, 'send_time', send_time);
      client.hset(hash, 'msgObj', JSON.stringify({ msg, email, nickname, send_time }));
      io.to(roomId).emit('receiveMsg', { roomId, hash, email, nickname, msg, send_time });
    });

    // 로그아웃
    socket.on("signout:user", () => {
      signOut(socket, io);
    });
    
    // 연결 종료
    socket.on("disconnect", () => {
      console.log("disconnect", socket.id, socket.email)
      signOut(socket, io);
    })
  });
}

module.exports = socketEvents;