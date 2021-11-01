const redis = require("redis");
const { getHashStr } = require("../shared/functions");
const client = redis.createClient();

// 참여한 채팅 방 목록 조회
const getJoinedRooms = (socket, email) => {
  new Promise((resolve, reject) => {
    client.smembers(email, async (error, roomList) => {
      if (error) return reject(error);
      const _roomList = [];
      for (let i = 0; i < roomList.length; i++) {
        const roomId = JSON.parse(roomList[i]).roomId;
        socket.join(roomId);
        client.hget(`latest_${roomId}`, 'msgObj', (err, item) => {
          socket.nsp.to(socket.id).emit('joined_rooms', ({ roomList: [{ ...JSON.parse(roomList[i]), latest_msg: JSON.parse(item)?.msg, latest_msg_send_time: JSON.parse(item)?.send_time }] }));
        });
      }
      resolve(_roomList);
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
          io.emit("signed_members", prevMembers.map(item => JSON.stringify(item)));
        }
      }
      resolve(items);
    })
  })
}

const socketEvents = io => {
  io.on("connection", socket => {
    console.log(socket.id);
    io.emit("connected", {id: socket.id});

    // 로그인
    socket.on("signin:user", ({ email, nickname }) => {
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
          io.emit("signed_members", prevMembers.map(item => JSON.stringify(item)));
          io.emit("signed_user", JSON.stringify({ email, nickname, signedIn: true }));
          resolve(items);
        })
      })
    });

    // 회원 목록
    socket.on("signup_members", async () => {
      const sockets = await io.fetchSockets();
      const ioSockets = sockets.map(item => ({ id: item.id, email: item.email, nickname: item.nickname }));
      console.log('signup_members ioSockets', ioSockets);
      // for (let i = 0; i < ioSockets.length; i++) {
      //   if (!ioSockets[i].email || !ioSockets[i].nickname) {
      //     io.to(ioSockets[i].id).emit('reload')
      //   }
      // }
      new Promise((resolve, reject) => {
        client.smembers('signup_members', (error, items) => {
          if (error) return reject(error);
          resolve(items);
          console.log('signup_members items', items);
          const _items = items;
          for (let i = 0; i < items.length; i++) {
            const item = JSON.parse(items[i]);
            if (ioSockets.findIndex(v => v.email === item.email) === -1) {
              client.srem('signup_members', items[i]);
              client.sadd('signup_members', JSON.stringify({ email: item.email, nickname: item.nickname, signedIn: false }))
              _items[i] = JSON.stringify({ email: item.email, nickname: item.nickname, signedIn: false });
            }
          };
          io.emit("signed_members", _items);
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
      new Promise((resolve, reject) => {
        client.smembers(email, (error, roomList) => {
          if (error) return reject(error);
          const idx = roomList.map(item => JSON.parse(item).emailList).findIndex(v => v.sort().toString() === [email, ...emailList].sort().toString());
          let _roomId = roomId;
          if (idx !== -1) {
            _roomId = roomList.map(item => JSON.parse(item))[idx].roomId
          }
          client.sadd(email, JSON.stringify({ roomId: _roomId, roomName, emailList }));
          socket.join(_roomId);
          io.emit("joined:room", { roomId: _roomId, email });
          socket.emit("joined:rooms", { email });
          getJoinedRooms(socket, email);
        })
      })
    });

    // 참여한 채팅 방 목록 불러오기
    socket.on("joined:rooms", ({ email }) => {
      console.log("joined:rooms ", email);
      if (email) {
        getJoinedRooms(socket, email);
      }
    });

    let prevMsgs = [];
    const setupPrevMsgs = (roomId, hash, _msgObj, itemsLength, idx) => {
      if (itemsLength - 1 === idx) {
        io.to(roomId).emit("receivePrevMsgs", { prevMsgs });
        prevMsgs = [];
      } else {
        prevMsgs.push({ roomId, hash, email: _msgObj.email, nickname: _msgObj.nickname, msg: _msgObj.msg, send_time: _msgObj?.send_time, from: "getMsg" });
      }
      // io.to(roomId).emit("receiveMsg", { roomId, hash, email: _msgObj.email, nickname: _msgObj.nickname, msg: _msgObj.msg, send_time: _msgObj?.send_time, from: "getMsg" })
    };
    
    // 채팅 내용 불러오기 (방 입장 시)
    socket.on("getMsg", async ({ roomId }) => {
      console.log('getMsg', roomId)
      const sockets = await io.in(roomId).fetchSockets();
      console.log('sockets in room', sockets.map(item => ({ email: item.email, nickname: item.nickname })));
      new Promise((resolve, reject) => {
        client.smembers(roomId, (error, items) => {
          if (error) reject(error);
          for (let i = 0; i < items.length; i++) {
            client.hget(items[i], 'msgObj', (err, obj) => {
              if (err) return;
              if (obj) {
                const _msgObj = JSON.parse(obj);
                setupPrevMsgs(roomId, items[i], _msgObj, items.length, i);
                // client.hget(`latest_${roomId}`, 'msgObj', (latestErr, latestObj) => {
                //   if (latestErr) return;
                //   const _latestObj = JSON.parse(latestObj);
                //   const _msgObj = JSON.parse(obj);
                //   io.to(roomId).emit("receiveMsg", { roomId, hash: items[i], email: _msgObj.email, nickname: _msgObj.nickname, msg: _msgObj.msg, send_time: _msgObj?.send_time, from: "getMsg", latest_msg_send_time: _latestObj?.send_time, latest_msg: _latestObj?.msg })
                // });
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
      console.log('sendMsg@@@@@@@@@@@email', email);
      // 자동 메시지 생성 (for test)
      if (email === "automsg@auto.com" && !!parseInt(msg)) {
        let num = 1;
        let interval = setInterval(() => {
          const hash = getHashStr(32);
          const send_time = new Date();
          client.sadd(roomId, hash);
          const hashMsg = `${num}_${getHashStr(64)}`;
          new Promise((resolve, reject) => {
            resolve(client.hset(hash, 'msgObj', JSON.stringify({ msg: hashMsg, email, nickname, send_time })));
          });
          new Promise((resolve, reject) => {
            resolve(client.hset(`latest_${roomId}`, 'msgObj', JSON.stringify({ msg: hashMsg, send_time })));
          });
          io.to(roomId).emit('receiveMsg', { roomId, hash, email, nickname, msg: hashMsg, send_time });
          num++;
          console.log(num, parseInt(msg), num > parseInt(msg))
          if (num > parseInt(msg)) {
            clearInterval(interval);
          }
        }, 200);
      }
      const hash = getHashStr(32);
      const send_time = new Date();
      client.sadd(roomId, hash);
      // client.hmset(hash, 'msg', msg, 'email', email, 'nickname', nickname, 'send_time', send_time);
      new Promise((resolve, reject) => {
        resolve(client.hset(hash, 'msgObj', JSON.stringify({ msg, email, nickname, send_time })));
      });
      new Promise((resolve, reject) => {
        resolve(client.hset(`latest_${roomId}`, 'msgObj', JSON.stringify({ msg, send_time })));
      });
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