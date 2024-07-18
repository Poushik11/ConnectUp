import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/auth/authSlice";

import React, { useEffect, useState } from "react";

import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    company: "",
    position: "",
    bio: "",
  });

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || "",
        address: user.address || "",
        company: user.company || "",
        position: user.position || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for profile update submission can be added here in the future
    console.log(formData);
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          {user && user.profileImage ? (
            <img src={user.profileImage} alt="Profile" />
          ) : (
            <img
              src="data:image/jpeg;base64,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"
              alt="Default Profile"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* <h1>{user && user.name}</h1> */}
        <p>{user && user.email}</p>
      </div>
      <div className="profile-details">
        <h2>Profile Details</h2>
        <ul>
          <li>
            <strong>Name:</strong> {user && user.name}
          </li>
          <li>
            <strong>Email:</strong> {user && user.email}
          </li>
          <li>
            <strong>Phone:</strong> {user && user.phone}
          </li>
          <li>
            <strong>Address:</strong> {user && user.address}
          </li>
          <li>
            <strong>Company:</strong> {user && user.company}
          </li>
          <li>
            <strong>Position:</strong> {user && user.position}
          </li>
          <li>
            <strong>Bio:</strong> {user && user.bio}
          </li>
        </ul>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Edit Profile Details</h2>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Company"
        />
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          placeholder="Position"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Bio"
        ></textarea>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
