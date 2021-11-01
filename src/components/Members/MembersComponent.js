import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { array } from "prop-types";

import { MembersLi, MembersUl } from './members.styles'
import { MoleculeDropbox } from 'components/molecules';
import { AppContext } from 'components/App';

const MembersComponent = props => {
  const { members } = props;
  const [selectedMember, setSelectedMember] = useState({ email: null, nickname: null });
  const [clientPosition, setClientPosition] = useState({x: 0, y:0});
  const { handleInviteChat, user } = useContext(AppContext);
  const history = useHistory();

  const handleMember = (e, item) => {
    const { clientX, clientY } = e;
    const { email, nickname } = item;
    setClientPosition({ x: clientX, y: clientY });
    setSelectedMember(prevMember => {
      if (prevMember.email !== email) {
        return { email, nickname }
      } else {
        return { email: null, nickname: null }
      }
    });
  }
  const inviteChatCallback = pathname => {
    history.push(pathname);
  }
  const handleChat = () => {
    handleInviteChat({ selectedMembers: [selectedMember], cb: inviteChatCallback });
  }
  const { x, y } = clientPosition;
  return (
    <MembersUl>
      {members.sort((a, b) => b.signedIn - a.signedIn).map((item,i) => (
        <MembersLi key={i} className={item.signedIn ? "signed_in" : ""} onClick={(e) => handleMember(e, item)}>
          <span>{`${item.nickname} (${item.email})`}</span>
        </MembersLi>
      ))}
      {selectedMember && user.email === selectedMember.email && <MoleculeDropbox x={x} y={y} itemList={["나"]} />}
      {selectedMember && selectedMember.email && user.email !== selectedMember.email && <MoleculeDropbox x={x} y={y} itemList={["채팅하기"]} handleClick={handleChat} />}
    </MembersUl>
  )
}

MembersComponent.propTypes = {
  members: array
}

export default MembersComponent
