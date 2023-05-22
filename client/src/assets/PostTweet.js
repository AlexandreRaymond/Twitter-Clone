import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import TweetStructure from "./TweetStructure";

const PostTweet = ({ hFeed, setHFeed }) => {
  // Logics
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [thatText, setThatText] = useState("");
  const disableButton = false;
  const navigate = useNavigate();

  if (!hFeed) {
    <div>Meow?</div>;
  }

  const theUser = hFeed.tweetsById["1214624813723136002"].author.handle;

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status: thatText }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setThatText(resData);
        console.log("Tweet posted", theUser);
      })
      .catch((err) => {
        navigate("/error");
      });
  };

  // On the page
  return (
    <>
      <CatTitle>What's on your mind?</CatTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          rows="70"
          cols="4"
          value={thatText}
          placeholder={"Texto cat here"}
          onChange={(e) => setThatText(e.target.value)}
        />
        <Postin>
          <span>{thatText.length}</span>
          <span>
            {thatText.length > 280 ? (
              <SendTweet type="submit" disabled="disabled">
                Meow
              </SendTweet>
            ) : (
              <SendTweet type="submit">Meow</SendTweet>
            )}
          </span>
        </Postin>
      </Form>
    </>
  );
};

const Form = styled.form``;

const CatTitle = styled.h1`
  padding: 10px;
`;

const Input = styled.textarea`
  resize: none;
  width: 600px;
  height: 150px;
  border-radius: 10px;
  border: none;
  border-style: none;
  border-color: transparent;
  font-size: 14px;
  font-weight: bold;
  font-family: sans-serif;
  padding: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const SendTweet = styled.button`
  cursor: pointer;
  display: flex;
  height: 30px;
  width: inherit;
  padding: 14px;
  background-color: var(--primary);
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 30px;
  border: none;

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const Postin = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  height: 20px;
  font-weight: bold;
  align-items: center;
  justify-content: right;
  gap: 20px;
  margin: 5px;
`;

export default PostTweet;
