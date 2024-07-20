import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function TicketItem({ ticket }) {
  // console.log(ticket);
  const { user } = useSelector((state) => state.auth);
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
  };
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket.product}</div>
      <div>{formatDate(ticket.date)}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <div>{user.name}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default TicketItem;
