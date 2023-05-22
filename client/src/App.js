import React from "react";
import { useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./assets/CurrentUserContext";

import GlobalStyles from "./GlobalStyles";
import { ReactComponent as CritterLogo } from "./assets/imgs/logo.svg";
import Sidebar from "./Sidebar";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import ErrorPage from "./assets/ErrorPage";

const App = () => {
  // Logic
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { status, setStatus } = useContext(CurrentUserContext);

  // On the page
  if (status == "loading") {
    return <div>Loading...</div>;
  }
  if (status == "error") {
    return <ErrorPage />;
  }
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <MainLayout>
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/tweet/:tweetId" element={<TweetDetails />} />
              <Route path="/:profileId" element={<Profile />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </MainContent>
        </MainLayout>
      </BrowserRouter>
    </>
  );
};

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export default App;
