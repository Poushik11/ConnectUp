import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddFriend.css";

axios.defaults.baseURL = "http://localhost:5000";

const AddFriend = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addedFriends, setAddedFriends] = useState([]);
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

        if (Array.isArray(response.data)) {
          setAddedFriends(response.data.map((friend) => friend._id));
        }
      } catch (error) {
        // console.error("Error fetching friends", error);
        toast.error("Error fetching friends");
      }
    };

    fetchFriends();
  }, [token]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(
        `/api/users/searchUsers?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
      toast.error("Error fetching search results");
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const response = await axios.post(
        "/api/users/addFriend",
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddedFriends((prevAddedFriends) => [...prevAddedFriends, friendId]);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="add-friend-container">
      <h2 className="add-friend-title">Add Friend</h2>
      <input
        className="add-friend-input"
        type="text"
        placeholder="Search for friend by email"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <ul className="friend-list">
        {searchResults.map((user) => (
          <li key={user._id} className="friend-item">
            <div>
              <div className="friend-username">{user.username}</div>
              <div className="friend-email">{user.email}</div>
            </div>
            {/* <button
              className="add-friend-button"
              onClick={() => handleAddFriend(user._id)}
            >
              Add Friend
            </button> */}
            <button
              onClick={() => handleAddFriend(user._id)}
              className={`add-button ${
                addedFriends.includes(user._id) ? "added" : ""
              }`}
              disabled={addedFriends.includes(user._id)}
            >
              {addedFriends.includes(user._id) ? "Added" : "Add Friend"}
            </button>
          </li>
        ))}
      </ul>
      <div className="toast-container">
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddFriend;
