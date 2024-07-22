import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createTicket } from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";
import "react-toastify/dist/ReactToastify.css";
import "./newFriends.css"; // Create this CSS file for styling

axios.defaults.baseURL = "http://localhost:5000";

function NewTickets() {
  const { user } = useSelector((state) => state.auth);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [company, setCompany] = useState("");
  const [task, setTask] = useState("");
  const [product, setProduct] = useState("Task");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [description, setDescription] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        toast.error("Error fetching friends");
      }
    };

    fetchFriends();
  }, [token]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createTicket({
        company,
        task,
        product,
        description,
        date,
        friends: selectedFriends,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("New ticket created!");
        navigate("/tickets");
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
      });
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleFriendChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFriends((prevSelectedFriends) =>
      checked
        ? [...prevSelectedFriends, value]
        : prevSelectedFriends.filter((friend) => friend !== value)
    );
  };

  return (
    <>
      <BackButton />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" className="form-control" value={name} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="email">Customer Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              name="company"
              id="company"
              className="form-control"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task">Task</label>
            <input
              name="task"
              id="task"
              className="form-control"
              placeholder="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product">Field</label>
            <select
              name="product"
              id="product"
              className="form-control"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="OnCampus">Oncampus</option>
              <option value="OffCampus">Offcampus</option>
              <option value="PrePlacment-Talk">PrePlacment-talk</option>
              <option value="Meeting">Meeting</option>
              <option value="Meet-Up">Meet Up</option>
              <option value="Presentation">Presentation</option>
              <option value="Task">Task</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description for the task</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <label htmlFor="friends">Add Friends (Optional)</label>
          <div className="form-control friends-group">
            <div className="friends-list">
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <div key={friend._id} className="friend-item">
                    <input
                      type="checkbox"
                      id={friend._id}
                      value={friend._id}
                      onChange={handleFriendChange}
                    />
                    <label htmlFor={friend._id}>
                      {friend.name} ({friend.email})
                    </label>
                  </div>
                ))
              ) : (
                <p>No friends available. Please add some friends.</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}

export default NewTickets;
