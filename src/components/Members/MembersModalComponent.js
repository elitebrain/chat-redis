import React, { useState, useContext } from 'react';
import { array, object } from "prop-types";

import { ReactComponent as CheckSvg } from "assets/icons/check.svg";
import { ButtonWrapper, MembersLi, MembersUl } from './members.styles'
import { AtomicButton } from 'components/atomics';
import { AppContext } from 'components/App';

const MembersModalComponent = props => {
  const { members, history } = props;
  const [checkedMembers, setCheckedMembers] = useState([]);
  const { handleInviteChat, handleCloseModal, user } = useContext(AppContext);

  const handleMember = item => {
    const { email, nickname } = item;
    setCheckedMembers(prevState => {
      if (prevState.findIndex(v => v.email === email) === -1) {
        return [...prevState, { email, nickname }]
      } else {
        return [...prevState.filter(v => v.email !== email)]
      }
    });
  }
  console.log(history, typeof history)
  const inviteChatCallback = pathname => {
    history.push(pathname);
  }
  const handleOk = () => {
    console.log(checkedMembers)
    handleInviteChat({ selectedMembers: checkedMembers, cb: inviteChatCallback });
  }
  return (
    <>
      <MembersUl height="340px">
        {members.filter(v => v.email !== user.email).map((item,i) => (
          <MembersLi key={i} className={item.signedIn ? "signed_in" : ""} onClick={(e) => handleMember(item)}>
            <span>{`${item.nickname} (${item.email})`}</span>
            <span className={`check_ico${checkedMembers.findIndex(v => v.email === item.email) === -1 ? '' : ' checked'}`}><CheckSvg /></span>
          </MembersLi>
        ))}
      </MembersUl>
      <ButtonWrapper>
        <AtomicButton className="mr_6px" handleClick={handleOk}>확인</AtomicButton>
        <AtomicButton handleClick={handleCloseModal}>취소</AtomicButton>
      </ButtonWrapper>
    </>
  )
}

MembersModalComponent.propTypes = {
  members: array,
  history: object
}

export default MembersModalComponent
