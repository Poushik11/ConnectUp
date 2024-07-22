import mongoose from "mongoose";
const collaborativeTicketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CollaborativeTicket = mongoose.model(
  "CollaborativeTicket",
  collaborativeTicketSchema
);
export default CollaborativeTicket;
