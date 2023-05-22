import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { useNavigate } from "react-router-dom";

import GlobalStyles from "../GlobalStyles";
import SmallTweet from "./SmallTweet";
import PostTweet from "./PostTweet";
import TweetStructure from "./TweetStructure";

const Tweets = () => {
  // Logics
  const [hFeed, setHFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((resData) => {
        setHFeed(resData);
        setLoading(false);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  // On the page
  if (loading === true) {
    return <div>Waiting...</div>;
  }

  return (
    <>
      <PostTweet hFeed={hFeed} />
      <TweetStructure hFeed={hFeed} loading={loading} />
    </>
  );
};

export default Tweets;
