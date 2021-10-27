import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { OrganismCard } from 'components/organisms';
import { MoleculeRow } from 'components/molecules';
import { AtomicButton, AtomicInput } from 'components/atomics';

import { AppContext } from 'components/App';

const LoginComponent = () => {
  const [state, setState] = useState({ email: '', nickname: '' });
  const [errMsg, setErrMsg] = useState({ email: '', nickname: '' });
  const history = useHistory();
  const { handleSignIn } = useContext(AppContext);
  
  const { email, nickname } = state;
  const checkError = ({name, value}) => {
    if (value.length > 0) {
      setErrMsg(prevState => ({ ...prevState, [name]: '' }));
    } else {
      setErrMsg(prevState => ({ ...prevState, [name]: `Filled ${name} plz` }));
    }
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
    if (value.length > 0) {
      setErrMsg(prevState => ({ ...prevState, [name]: '' }));
    }
  }
  const handleJoin = () => {
    checkError({ name: "email", value: email });
    checkError({ name: "nickname", value: nickname });
    handleSignIn({ email, nickname });
    if (email.length > 0 && nickname.length > 0) {
      history.push('/members')
    }
  }
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleJoin();
    }
  }
  return (
    <OrganismCard variant="outlined">
      <MoleculeRow>
        <AtomicInput placeholder="Enter your email" value={email} name="email" handleChange={handleChange} handleKeyUp={handleKeyUp} errMsg={errMsg.email} />
      </MoleculeRow>
      <MoleculeRow>
        <AtomicInput placeholder="Enter your nickname" value={nickname} name="nickname" handleChange={handleChange} handleKeyUp={handleKeyUp} errMsg={errMsg.nickname} />
      </MoleculeRow>
      <MoleculeRow marginBottom="0px">
        <AtomicButton className="w_100" handleClick={handleJoin}>JOIN</AtomicButton>
      </MoleculeRow>
    </OrganismCard>
  )
}

export default LoginComponent
