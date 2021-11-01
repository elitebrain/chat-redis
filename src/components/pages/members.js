import React, { useContext, useEffect } from 'react'

import { socket } from 'utils/socket';
import { Layout } from 'components/templates';
import MembersComponent from 'components/Members/MembersComponent';
import { AppContext } from 'components/App';

const Members = props => {
  const { location } = props;
  const { signedMembers } = useContext(AppContext);
  const { pathname } = location;
  
  useEffect(() => {
    // 회원 목록 요청
    socket.emit("signup_members");
  }, []);
  return (
    <Layout arrowLeft magnification footer pathname={pathname}>
      <MembersComponent members={signedMembers} />
    </Layout>
  )
}

export default Members
