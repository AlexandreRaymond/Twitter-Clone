import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TweetStructure from "./TweetStructure";

const FocusTweet = () => {
  // Logics
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profileId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((resData) => {
        console.log("FocusResData", resData);
        setFeed(resData);
        setLoading(false);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  if (loading === true) {
    return <div>Loading</div>;
  }

  // On the page
  return (
    <>
      <div>{profileId} Remeowed</div>
      <TweetStructure hFeed={feed} />
    </>
  );
};

export default FocusTweet;
