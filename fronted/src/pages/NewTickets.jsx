import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket } from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(company, task, product, date, description);
    dispatch(createTicket({ company, task, product, description, date }))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate("/tickets");
        toast.success("New ticket created!");
      })
      .catch(toast.error);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value); // Update state with the date in 'YYYY-MM-DD' format
  };

  return (
    <>
      <BackButton />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="description">Company Name</label>
          <input
            name="description"
            id="description"
            className="form-control"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          ></input>
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
          ></input>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Field </label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">Oncampus</option>
              <option value="Macbook Pro">Offcampus</option>
              <option value="iMac">PrePlacment-talk</option>
              <option value="iPad">Meeting</option>
              <option value="iPad">Meet Up</option>
              <option value="iPad">Presentation</option>
              <option value="iPad">Task</option>
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
            ></textarea>
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
            ></input>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTickets;
