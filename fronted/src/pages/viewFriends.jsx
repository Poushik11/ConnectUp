import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./viewFriends.css";

axios.defaults.baseURL = "http://localhost:5000";

const ViewFriends = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(false); // State to handle error visibility

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("/api/users/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends", error);
        toast.error("No Friends available");
        setError(true);
      }
    };

    fetchFriends();
  }, [token]);

  return (
    <div className="view-friends-container">
      <h2 className="view-friends-title">My Friends</h2>
      {error && friends.length === 0 ? (
        <p className="error-message">
          No friends available. Please add some friends.
        </p>
      ) : error ? (
        <p className="no-friends-message">
          error fetching friends try again later..
        </p>
      ) : (
        <ul className="friend-list">
          {friends.map((friend, index) => (
            <li key={friend._id} className="friend-item">
              <div className="friend-info">
                <div className="friend-serial">{index + 1}.</div>
                <img
                  src={`https://api.multiavatar.com/${friend.name}.png`}
                  alt={`${friend.name}'s avatar`}
                  className="friend-avatar"
                />
                <div className="friend-username">{friend.name}</div>
                <div className="friend-email">{friend.email}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="toast-container">
        <ToastContainer />
      </div>
    </div>
  );
};

export default ViewFriends;
