import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    /**
     * Array of room number objects.
     * Each object contains:
     *  - number: The room number (Number)
     *  - unavailableDates: Array of dates when the room is unavailable ([Date])
     */
    // roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
    roomNumbers: [
      {
        number: { type: Number, required: true },
        unavailableDates: { type: [Date], required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
