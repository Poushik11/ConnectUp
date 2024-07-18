import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/auth/authSlice";

import React, { useEffect, useState } from "react";

import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [profileImage, setProfileImage] = useState(
    "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fHww"
  );
  const [profileType, setProfileType] = useState("company");
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    companyName: "",
    companyEmail: "",
    yearsOfExp: "",
    position: "",
    collegeName: "",
    cgpa: "",
    currentSem: "",
  });

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || "",
        address: user.address || "",
        companyName: user.companyName || "",
        companyEmail: user.companyEmail || "",
        yearsOfExp: user.yearsOfExp || "",
        position: user.position || "",
        skills: user.skills || [],
        collegeName: user.collegeName || "",
        cgpa: user.cgpa || "",
        currentSem: user.currentSem || "",
      });
    }
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSkillChange = (e) => {
  //   setFormData({ ...formData, skills: e.target.value.split(",") });
  // };

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
              src="https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fHww"
              alt="Default Profile"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <p>{user && user.email}</p>
      </div>
      <div className="profile-details">
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
          {profileType === "company" ? (
            <>
              <li>
                <strong>Company Name:</strong> {user && user.companyName}
              </li>
              <li>
                <strong>Company Email:</strong> {user && user.companyEmail}
              </li>
              <li>
                <strong>Years of Experience:</strong> {user && user.yearsOfExp}
              </li>
              <li>
                <strong>Position:</strong> {user && user.position}
              </li>
              <li>
                <strong>Skills:</strong>{" "}
                {user && user.skills ? user.skills.join(", ") : ""}
              </li>
            </>
          ) : (
            <>
              <li>
                <strong>College Name:</strong> {user && user.collegeName}
              </li>
              <li>
                <strong>CGPA:</strong> {user && user.cgpa}
              </li>
              <li>
                <strong>Current Semester:</strong> {user && user.currentSem}
              </li>
              <li>
                <strong>Skills:</strong>{" "}
                {user && user.skills ? user.skills.join(", ") : ""}
              </li>
            </>
          )}
        </ul>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Edit Profile Details</h2>
        <select
          value={profileType}
          onChange={(e) => setProfileType(e.target.value)}
        >
          <option value="company">Company Professional</option>
          <option value="college">College Level</option>
        </select>
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
        {profileType === "company" ? (
          <>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
            />
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleInputChange}
              placeholder="Company Email"
            />
            <input
              type="text"
              name="yearsOfExp"
              value={formData.yearsOfExp}
              onChange={handleInputChange}
              placeholder="Years of Experience"
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Position"
            />
            {/* <input
              type="text"
              name="skills"
              value={formData.skills.join(", ")}
              onChange={handleSkillChange}
              placeholder="Skills (comma separated)"
            /> */}
          </>
        ) : (
          <>
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              placeholder="College Name"
            />
            <input
              type="text"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleInputChange}
              placeholder="CGPA"
            />
            <input
              type="text"
              name="currentSem"
              value={formData.currentSem}
              onChange={handleInputChange}
              placeholder="Current Semester"
            />
            {/* <input
              type="text"
              name="skills"
              value={formData.skills.join(", ")}
              onChange={handleSkillChange}
              placeholder="Skills (comma separated)"
            /> */}
          </>
        )}
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
