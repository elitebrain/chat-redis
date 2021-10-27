import React, { useContext } from 'react'

import { Layout } from 'components/templates';
import MembersComponent from 'components/Members/MembersComponent';
import { AppContext } from 'components/App';

const Members = () => {
  const { signedMembers } = useContext(AppContext);
  return (
    <Layout arrowLeft magnification footer>
      <MembersComponent members={signedMembers} />
    </Layout>
  )
}

export default Members
