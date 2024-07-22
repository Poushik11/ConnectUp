import asyncHandler from "express-async-handler";

import Ticket from "../models/ticketModel.js";
import CollaborativeTicket from "../models/collaborativeticket.js";

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { company, task, product, description, date } = req.body;

  if (!product || !description || !task) {
    res.status(400);
    throw new Error("Please add The ticket-type,taskName and description");
  }

  const ticket = await Ticket.create({
    company,
    task,
    product,
    description,
    user: req.user.id,
    status: "new",
    date,
  });

  res.status(201).json(ticket);
});

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});
const createCollaborativeTicket = asyncHandler(async (req, res) => {
  const { ticketId, userIds } = req.body;

  // Check if the ticket exists
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // Create the collaborative ticket
  const collaborativeTicket = await CollaborativeTicket.create({
    ticketId,
    userIds,
  });

  res.status(201).json(collaborativeTicket);
});

// Get tickets for a user
const getUserTickets = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const tickets = await CollaborativeTicket.find({ userIds: userId }).populate(
    "ticketId"
  );

  res.status(200).json(tickets.map((collabTicket) => collabTicket.ticketId));
});

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

export {
  getTickets,
  getTicket,
  getUserTickets,
  createCollaborativeTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
