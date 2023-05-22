import React from "react";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import { GiClusterBomb } from "react-icons/gi";

const ErrorPage = () => {
  return (
    <ErrorSection>
      <BombIcon>
        <GiClusterBomb />
      </BombIcon>
      <div>
        <Hone>An unknown error has occured.</Hone>
        <Paragraph>
          Please try refreshing the page, or <a href="#">contact support</a> if
          the problem persists.
        </Paragraph>
      </div>
    </ErrorSection>
  );
};

const ErrorSection = styled.div`
  height: 500px;
  width: 620px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
`;

const BombIcon = styled.div`
  font-size: 80px;
  padding-bottom: 20px;
`;

const Hone = styled.h1`
  text-align: center;
  font-size: 38px;
  padding-bottom: 5px;
`;

const Paragraph = styled.p`
  text-align: center;
  font-size: 22px;
`;

export default ErrorPage;
