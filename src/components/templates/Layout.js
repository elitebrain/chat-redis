import React from 'react';
import { useHistory } from "react-router-dom";
import { array, bool, func, object, oneOfType, string } from "prop-types";

import { ContentWrapper, DefaultLayout, FooterItem, FooterNav, FooterWrapper } from './template.styles'
import HeaderComponent from './HeaderComponent';

const Layout = props => {
  const { bgColor, children, arrowLeft, headerTitle, headerSubTitle, magnification, plus, handleArrowLeft, handleMagnification, handlePlus, contentHeight = "500px", footer } = props;
  const history = useHistory();
  const handleNav = pathname => {
    history.push(pathname);
  }
  return (
    <DefaultLayout bgColor={bgColor}>
      <HeaderComponent
        arrowLeft={arrowLeft}
        headerTitle={headerTitle}
        headerSubTitle={headerSubTitle}
        magnification={magnification}
        plus={plus}
        handleArrowLeft={handleArrowLeft}
        handleMagnification={handleMagnification}
        handlePlus={handlePlus}
      />
      <ContentWrapper contentHeight={contentHeight}>
        {children}
      </ContentWrapper>
      {footer && <FooterWrapper>
        <FooterNav>
          <FooterItem onClick={() => handleNav("/members")}></FooterItem>
          <FooterItem onClick={() => handleNav("/chat-list")}></FooterItem>
          <FooterItem onClick={() => handleNav("/")}></FooterItem>
        </FooterNav>
      </FooterWrapper>}
    </DefaultLayout>
  )
}

Layout.propTypes = {
  bgColor: string,
  arrowLeft: bool,
  headerTitle: string,
  headerSubTitle: string,
  magnification: bool,
  plus: bool,
  handleArrowLeft: func,
  handleMagnification: func,
  handlePlus: func,
  children: oneOfType([array, object]),
  footer: bool
}

export default Layout