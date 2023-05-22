import { useContext, useState, useEffect } from "react";
import { ReactComponent as CritterLogo } from "./assets/imgs/logo.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./assets/CurrentUserContext";

import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiOutlineBell } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

const Sidebar = () => {
  // Logic
  const { currentUser, status } = useContext(CurrentUserContext);
  const UHandle = currentUser.profile.handle;

  // On the page
  return (
    <LogoSidebar>
      <CatLogo />
      <NavSidebar>
        <SideHome to={"/"}>
          <NavButton>
            <SpanLogo>
              <AiOutlineHome />
            </SpanLogo>
            <TextSpan>Home</TextSpan>
          </NavButton>
        </SideHome>
        <SideProfile to={`/${UHandle}`}>
          <NavButton>
            <CgProfile /> <TextSpan>Profile</TextSpan>
          </NavButton>
        </SideProfile>
        <SideNotif to={"/notifications"}>
          <NavButton>
            <AiOutlineBell /> <TextSpan>Notifications</TextSpan>
          </NavButton>
        </SideNotif>
        <SideBooks to={"/bookmarks"}>
          <NavButton>
            <BsBookmark /> <TextSpan>Bookmarks</TextSpan>
          </NavButton>
        </SideBooks>
      </NavSidebar>
    </LogoSidebar>
  );
};

const LogoSidebar = styled.div`
  margin-left: 100px;
`;

const CatLogo = styled(CritterLogo)`
  width: 50px;
  height: 50px;
  opacity: 0.5;
  margin-top: 22px;
  margin-left: 22px;
`;

const NavSidebar = styled.div`
  margin: 20px;
`;

const SideHome = styled(Link)`
  text-decoration: none;
`;
const SideProfile = styled(Link)`
  text-decoration: none;
`;
const SideNotif = styled(Link)`
  text-decoration: none;
`;
const SideBooks = styled(Link)`
  text-decoration: none;
`;

const SpanLogo = styled.span`
  font-size: 20px;
`;

const TextSpan = styled.span`
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-left: 20px;
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: inherit;
  margin: 1px;
  padding: 16px;
  background-color: inherit;
  font-size: 16px;
  text-align: center;
  justify-content: space-between;
  font-weight: bold;
  border-radius: 30px;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: var(--secondary);
    color: var(--primary);
  }
`;

export default Sidebar;
