import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link, Navigate } from "react-router-dom";
import { format } from "date-fns";

import { FaRegComments } from "react-icons/fa";
import { GiRapidshareArrow } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineSave } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

const SmallTweet = ({ tweetBody, tweetPic }) => {
  // Logics
  const [likedTweet, setLikedTweet] = useState(tweetBody.isLiked);
  const singleTweet = `/tweet/${tweetBody.id}`;

  const toggleLike = (e) => {
    setLikedTweet(!likedTweet);
  };

  const tweetStamp = format(new Date(tweetBody.timestamp), "a..aa LLL LL y");

  const rawTime = tweetBody.timestamp;

  const formatDate = (rawTime) => {
    const options = {
      hour: "numeric",
      hour12: true,
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(rawTime).toLocaleDateString(undefined, options);
  };

  const readableTime = formatDate(rawTime);
  const selectedUser = `/${tweetBody.author.handle}`;

  // On the page
  return (
    <Wrapper>
      <DetailLink to={singleTweet}>
        <UserProfile>
          <ProfileImg
            src={tweetBody.author.avatarSrc}
            alt={tweetBody.author.displayName}
          />
          <div>
            <ProfileLink to={selectedUser}>
              <h1>{tweetBody.author.displayName}</h1>
            </ProfileLink>
            <p>@{tweetBody.author.handle}</p>
          </div>
        </UserProfile>
        <br></br>
        <div>
          <Status>{tweetBody.status}</Status>
          <br></br>
          {tweetPic ? <TweetImage src={tweetPic.url} /> : null}
        </div>
        <br></br>
        <Timestamp>{readableTime}</Timestamp>
        <br></br>
      </DetailLink>
      <GrayLine></GrayLine>
      <TweetReaction>
        <Button>
          <FaRegComments />
        </Button>
        <Button>
          <GiRapidshareArrow />
        </Button>
        <Button onClick={(e) => toggleLike(e)}>
          {likedTweet ? <AiFillHeart /> : <AiOutlineHeart />}
        </Button>
        <Button>
          <AiOutlineSave />
        </Button>
      </TweetReaction>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  width: 622px;
  height: auto;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-top: 15px;
`;

const DetailLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProfileImg = styled.img`
  border-radius: 200px;
  height: 40px;
  width: auto;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const Status = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
`;

const TweetImage = styled.img`
  max-height: 400px;
  width: 600px;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
`;

const Timestamp = styled.div`
  padding-left: 5px;
  font-size: 15px;
`;

const TweetReaction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 600px;
  height: 50px;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  padding-left: 60px;
  padding-right: 60px;
  cursor: pointer;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  border-radius: 10px;

  &:active:hover {
    background-color: lightgray;
    opacity: 0.15;
  }
`;

const GrayLine = styled.div`
  margin: 5px 5px 15px 5px;
  height: 2px;
  width: 590px;
  background-color: lightgray;
  opacity: 0.2;
`;

export default SmallTweet;
