import { createContext, useCallback, useState, useEffect } from "react";
import axios from "axios";
import getCurrentUser from "../utils/getCurrentUser";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser()); // Update currentUser when the component mounts
  }, []);
  const login = async (data) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      data
    );
    localStorage.setItem("currentUser", JSON.stringify(res.data)); // Persistent storage
    setCurrentUser(res.data); // Update the global state
  };

  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
    localStorage.removeItem("currentUser"); // Clear persistent storage
    setCurrentUser(null); // Update the global state
  };

  const deletePostImage = async (id) => {
    try {
      // Delete the images from Cloudinary
      await axios.post(
        `${import.meta.env.VITE_API_URL}/img/cloudinary/delete`,
        {
          public_ids: [id],
        }
      );
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting images from Cloudinary");
    }
  };

  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent;
  // };

  const getEvents = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/event`);
      const data = res.data;
      const formattedEvents = data.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(formattedEvents); // Update the global events state
    } catch (err) {
      console.error(err);
      alert(
        err.response.data.message || "An error occurred while fetching events"
      );
    }
  }, []); // Empty dependency array ensures the function is memoized

  const fetchPosts = useCallback(async (query = "") => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/post${query}`
      );
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        login,
        logout,
        deletePostImage,
        events,
        getEvents,
        currentUser,
        fetchPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
