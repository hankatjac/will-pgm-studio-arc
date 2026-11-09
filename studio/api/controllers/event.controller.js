import db from "../models/index.js";
const Event = db.event;

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Add a new event
export const addEvent = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");

    await Event.create({
      title: req.body.title,
      desc: req.body.desc,
      start: req.body.start,
      end: req.body.end,
      uid: userId,
    });

    return res.json("Event has been created.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");

    const deleted = await Event.destroy({
      where: { id: eventId, uid: userId },
    });

    if (!deleted) {
      return res.status(403).json("You can delete only your event!");
    }
    return res.json("Event has been deleted!");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");

    const [updated] = await Event.update(
      {
        title: req.body.title,
        desc: req.body.desc,
        start: req.body.start,
        end: req.body.end,
      },
      {
        where: { id: eventId, uid: userId },
      }
    );

    if (!updated) {
      return res.status(403).json("You can update only your event!");
    }
    return res.json("Event has been updated.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};