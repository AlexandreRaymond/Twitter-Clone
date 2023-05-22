import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((resData) => {
        setCurrentUser(resData);
        setStatus("idle");
      })
      .catch((err) => {
        console.log("Profile error", err);

        setStatus("error");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
