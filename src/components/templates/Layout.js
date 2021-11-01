import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { array, bool, func, object, oneOfType, string } from "prop-types";

import { ReactComponent as ChatSvg } from "assets/icons/chat.svg";
import { ReactComponent as PersonSvg } from "assets/icons/person.svg";
import { ReactComponent as OutSvg } from "assets/icons/out.svg";
import { ContentWrapper, DefaultLayout, FooterItem, FooterNav, FooterWrapper } from './template.styles'
import HeaderComponent from './HeaderComponent';
import { AppContext } from 'components/App';

const Layout = props => {
  const {
    bgColor,
    children,
    arrowLeft,
    headerTitle,
    headerSubTitle,
    magnification,
    plus,
    handleArrowLeft,
    handleMagnification,
    handlePlus,
    contentHeight = "500px",
    pathname,
    footer
  } = props;
  const { handleSignOut } = useContext(AppContext);
  const history = useHistory();

  const handleNav = pathname => {
    history.push(pathname);
  }
  const _handleSignOut = () => {
    handleSignOut();
    handleNav("/");
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
          <FooterItem className={pathname === "/members" ? "active" : ""} onClick={() => handleNav("/members")}><PersonSvg /></FooterItem>
          <FooterItem className={pathname === "/chat-list" ? "active" : ""} onClick={() => handleNav("/chat-list")}><ChatSvg /></FooterItem>
          <FooterItem onClick={_handleSignOut}><OutSvg /></FooterItem>
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
  pathname: string,
  magnification: bool,
  plus: bool,
  handleArrowLeft: func,
  handleMagnification: func,
  handlePlus: func,
  children: oneOfType([array, object]),
  footer: bool
}

export default Layout
