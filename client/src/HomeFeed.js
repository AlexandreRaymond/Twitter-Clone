import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./assets/CurrentUserContext";

import GlobalStyles from "./GlobalStyles";
import Tweets from "./assets/Tweets";
import PostTweet from "./assets/PostTweet";

const HomeFeed = () => {
  return (
    <>
      <HomeFeedTitle>HomeFeed</HomeFeedTitle>
      <Tweets />
    </>
  );
};

const HomeFeedTitle = styled.h1`
  text-align: center;
  justify-content: center;
  font-size: 20px;
  font-family: sans-serif;
  color: var(--primary);
`;
export default HomeFeed;
