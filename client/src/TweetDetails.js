import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
//import { CurrentUserContext } from "./CurrentUserContext";
import { format } from "date-fns";

import { FaRegComments } from "react-icons/fa";
import { GiRapidshareArrow } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineSave } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";

const TweetDetails = () => {
  // Logics
  const [singularTweet, setSingularTweet] = useState(null);
  const [likedTweet, setLikedTweet] = useState(false);
  const { tweetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((resData) => {
        setSingularTweet(resData);
        setLikedTweet(resData.tweet.isLiked);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  if (!singularTweet) {
    return <div>Waiting on Server...</div>;
  }
  const toggleLike = (e) => {
    setLikedTweet(!likedTweet);
    console.log("toggle function");
  };

  const tweetStamp = format(
    new Date(singularTweet.tweet.timestamp),
    "h:hh aa - LLL LL y"
  );

  const detailOfTweet = singularTweet.tweet.author;
  const picTweet = singularTweet.tweet.media;

  // On the page
  return (
    <>
      <BackHome to="/">
        <BackButton>
          <IoMdArrowRoundBack /> <h1>Meow</h1>
        </BackButton>
      </BackHome>
      <Wrapper>
        <UserProfile>
          <ProfileImg
            src={detailOfTweet.avatarSrc}
            alt={detailOfTweet.displayName}
          />
          <div>
            <h1>{detailOfTweet.displayName}</h1>
            <p>@{detailOfTweet.handle}</p>
          </div>
        </UserProfile>
        <br></br>
        <div>
          <Status>{singularTweet.tweet.status}</Status>
          <br></br>
          {picTweet[0] ? <TweetImage src={picTweet[0].url} /> : null}
        </div>
        <br></br>
        <Timestamp>{tweetStamp} - Critter web app</Timestamp>
        <br></br>
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
    </>
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

const BackHome = styled(Link)`
  margin: 10px 0;
  text-decoration: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 3px;
`;

const BackButton = styled.button`
  display: flex;
  flex-direction: row;
  gap: 15px;
  border: none;
  background-color: inherit;
  height: 50px;
  width: inherits;
  text-align: center;
  border-radius: 30px;
  padding: 16px;
  margin: 1px;

  &:hover {
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

export default TweetDetails;
