import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Tweets from "./Tweets";
import SmallTweet from "./SmallTweet";
import FocusTweet from "./FocusTweet";
import PostTweet from "./PostTweet";

const TweetStructure = ({ hFeed }) => {
  // Logic

  // On the page
  return (
    <div>
      {hFeed.tweetIds.map((tweetFeedId) => {
        const tweetBody = hFeed.tweetsById[tweetFeedId];
        const tweetPic = tweetBody.media[0];

        return (
          <>
            <SmallTweet tweetBody={tweetBody} tweetPic={tweetPic} />
          </>
        );
      })}
    </div>
  );
};

export default TweetStructure;
