import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "./assets/CurrentUserContext";
import { format } from "date-fns";
import { GrLocation } from "react-icons/gr";
import { AiOutlineCalendar } from "react-icons/ai";

import FocusTweet from "./assets/FocusTweet";

const Profile = () => {
  // Logics
  const { currentUser, status } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const UHandle = currentUser.profile.handle;
  const { profileId } = useParams();
  const myself = "/:profileId";
  const [focusedButton, setFocusedButton] = useState("tweets");

  const navigate = useNavigate();

  const ownMonth = format(new Date(currentUser.profile.joined), "LLLL yyyy");

  let myText = currentUser.profile.location;
  const myArray = myText.split(" ");
  let word = myArray[0];
  let virgule = word.substring(0, word.length - 1);

  useEffect(() => {
    navigate("/error");
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((resData) => {
        setUserProfile(resData);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  // On the page
  if (!currentUser || !userProfile) {
    return <div>Loading yourself...</div>;
  } else if (UHandle == profileId) {
    return (
      // My profile
      <Wrapper>
        <Banner src={currentUser.profile.bannerSrc} />
        <MyProfilePic src={currentUser.profile.avatarSrc} />
        <UserInfo>
          <TagNames>
            <DisplayName>{currentUser.profile.displayName}</DisplayName>
            <HandleName>@{profileId}</HandleName>
          </TagNames>
          <Location>
            <AreaInfo>
              <GrIcon />
              {virgule}
            </AreaInfo>
            <AreaInfo>
              <CalendarIcon />
              Joined {ownMonth}
            </AreaInfo>
          </Location>
          <SocialFollow>
            <span>
              <Follows>{currentUser.profile.numFollowing}</Follows> Following
            </span>
            <span>
              <Follows>{currentUser.profile.numFollowers}</Follows> Followers
            </span>
          </SocialFollow>
        </UserInfo>
        <Socials>
          <TweetsButton
            autoFocus
            id="tweets"
            onClick={() => setFocusedButton("tweets")}
          >
            Tweets
          </TweetsButton>
          <Button id="media" onClick={() => setFocusedButton("media")}>
            Media
          </Button>
          <Button id="likes" onClick={() => setFocusedButton("likes")}>
            Likes
          </Button>
        </Socials>
        <BottomDisplay>
          {focusedButton === "tweets" && <FocusTweet />}
          {focusedButton === "media" && <div>Media</div>}
          {focusedButton === "likes" && <div>Likes</div>}
        </BottomDisplay>
      </Wrapper>
    );
  }

  const Placesyo = () => {
    return (
      <>
        <GrIcon /> <span>{userProfile.profile.location}</span>
      </>
    );
  };

  return (
    // Other's profile
    <Wrapper>
      <Banner src={userProfile.profile.bannerSrc} />
      <TopSection>
        <MyProfilePic src={userProfile.profile.avatarSrc} />
        <FollowButton>Following</FollowButton>
      </TopSection>
      <UserInfo>
        <TagNames>
          <DisplayName>{userProfile.profile.displayName}</DisplayName>
          <div>
            <HandleName>@{profileId}</HandleName>
            <span>
              {userProfile.profile.isFollowingYou ? (
                <span>Follows you</span>
              ) : null}
            </span>
          </div>
        </TagNames>
        <BFF>
          <span>Best friends with @{currentUser.profile.handle}.</span>
        </BFF>
        <Location>
          <AreaInfo>
            {userProfile.profile.location ? <Placesyo /> : null}
            <CalendarIcon />
            Joined {format(new Date(userProfile.profile.joined), "LLLL yyyy")}
          </AreaInfo>
        </Location>
        <SocialFollow>
          <span>
            <Follows>{userProfile.profile.numFollowing}</Follows> Following
          </span>
          <span>
            <Follows>{userProfile.profile.numFollowers}</Follows> Followers
          </span>
        </SocialFollow>
      </UserInfo>
      <Socials>
        <TweetsButton
          autoFocus
          id="tweets"
          onClick={() => setFocusedButton("tweets")}
        >
          Tweets
        </TweetsButton>
        <Button id="media" onClick={() => setFocusedButton("media")}>
          Media
        </Button>
        <Button id="likes" onClick={() => setFocusedButton("likes")}>
          Likes
        </Button>
      </Socials>
      <BottomDisplay>
        {focusedButton === "tweets" && <FocusTweet />}
        {focusedButton === "media" && <div>Media</div>}
        {focusedButton === "likes" && <div>Likes</div>}
      </BottomDisplay>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 620px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Banner = styled.img`
  object-fit: cover;
  width: 620px;
  height: 250px;
  background-color: blue;
  z-index: 0;
`;

const MyProfilePic = styled.img`
  border: 3px solid white;
  border-radius: 100px;
  height: 175px;
  width: 175px;
  z-index: 1;
  margin-top: -90px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  padding: 0 0 15px 20px;
  gap: 10px;
`;

const TagNames = styled.div`
  padding-bottom: 12px;
`;

const DisplayName = styled.h1`
  font-size: 20px;
`;

const HandleName = styled.p`
  font-size: 16px;
  color: gray;
`;

const Location = styled.div`
  padding: 10px 0 10px 0;
  color: gray;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const GrIcon = styled(GrLocation)`
  margin-right: 5px;
  opacity: 0.55;
`;

const CalendarIcon = styled(AiOutlineCalendar)`
  margin-right: 7px;
  opacity: 0.9;
`;

const AreaInfo = styled.span`
  gap: 100px;
  color: gray;
`;

const SocialFollow = styled.div`
  padding: 10px 0 10px 0;
  margin-left: 2px;
  color: gray;
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const Follows = styled.span`
  font-weight: bold;
  color: black;
  gap: 10px;
`;

const Socials = styled.div`
  height: 50px;
  width: 620px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const Button = styled.button`
  width: 34%;
  border: none;
  font-weight: bold;
  background-color: inherit;

  &:hover {
    cursor: pointer;
    color: var(--primary);
  }

  &:focus {
    color: var(--primary);
    border-bottom: 3px solid var(--primary);
    border-radius: 2px;
  }
`;

const TweetsButton = styled.button`
  width: 34%;
  border: none;
  font-weight: bold;
  background-color: inherit;

  &:hover {
    cursor: pointer;
    color: var(--primary);
  }

  &:focus {
    color: var(--primary);
    border-bottom: 3px solid var(--primary);
    border-radius: 2px;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FollowButton = styled.button`
  display: flex;
  height: 40px;
  width: inherit;
  margin-top: 5px;
  margin-right: 20px;
  padding: 14px;
  background-color: var(--primary);
  color: white;
  font-size: 16px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 30px;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: var(--secondary);
  }
`;

const BottomDisplay = styled.div``;

const BFF = styled.div``;

export default Profile;
