import React from 'react';
import { useHistory } from "react-router-dom";
import { bool, func, string } from "prop-types";

import { ReactComponent as ArrowLeftSvg } from "assets/icons/arrow_left.svg";
import { ReactComponent as MagnificationSvg } from "assets/icons/magnification.svg";
import { ReactComponent as PlusSvg } from "assets/icons/plus.svg";
import { HeaderWrapper, IconWrapper } from './template.styles';

const HeaderComponent = props => {
  const { arrowLeft, headerTitle, headerSubTitle, magnification, plus, handleArrowLeft, handleMagnification, handlePlus } = props;
  const history = useHistory();
  return (
    <HeaderWrapper>
      {arrowLeft && <IconWrapper float="left" onClick={() => history.go(-1)}>
        <ArrowLeftSvg />
      </IconWrapper>}
      {headerTitle && <IconWrapper float="left" onClick={handleArrowLeft} width="calc(100% - 156px)">
        <h2>{headerTitle}</h2>
        <h3>{headerSubTitle}</h3>
      </IconWrapper>}
      {/* {headerTitle && <IconWrapper margin="18px 0px" float="left" onClick={handleArrowLeft}>
        <h3>{headerSubTitle}</h3>
      </IconWrapper>} */}
      {magnification && <IconWrapper onClick={handleMagnification}>
        <MagnificationSvg />
      </IconWrapper>}
      {plus && <IconWrapper onClick={handlePlus}>
        <PlusSvg />
      </IconWrapper>}
    </HeaderWrapper>
  )
}

HeaderComponent.propTypes = {
  arrowLeft: bool,
  headerTitle: string,
  headerSubTitle: string,
  magnification: bool,
  plus: bool,
  handleArrowLeft: func,
  handleMagnification: func,
  handlePlus: func,
}

export default HeaderComponent
