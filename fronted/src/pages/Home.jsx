import { Link } from "react-router-dom";
// import AddFriend from "./AddFriend";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> View My Tickets
      </Link>
      <Link to="/add-friend" className="btn btn-block">
        <FaTicketAlt /> Add-Friends
      </Link>
      <Link to="/view-friends" className="btn btn-block">
        <FaTicketAlt /> view Friends
      </Link>
    </>
  );
}

export default Home;
