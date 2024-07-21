import mongoose from "mongoose";
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    company: {
      type: String,
      required: false,
      ref: "User",
    },
    task: {
      type: String,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a Ticket"],
      enum: [
        "OnCampus",
        "OffCampus",
        "PrePlacment-Talk",
        "Task",
        "Meeting",
        "Presentation",
        "Meet-Up",
      ],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
    date: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;

// module.exports = mongoose.model("Ticket", ticketSchema);
