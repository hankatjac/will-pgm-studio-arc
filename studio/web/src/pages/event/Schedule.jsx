import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/system";

const localizer = dayjsLocalizer(dayjs);

const Schedule = ({ events, addEvent, updateEvent }) => {
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(dayjs());
  const [end, setEnd] = useState(dayjs());
  const [desc, setDesc] = useState("");
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);

  const [view, setView] = useState(Views.MONTH); // Default view
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
  };

  const handleSlotSelected = (slotInfo) => {
    console.log("Real slotInfo", slotInfo);
    setTitle("");
    setDesc("");
    setStart(dayjs(slotInfo.slots[0])); // Convert to Dayjs
    setEnd(dayjs(slotInfo.slots.slice(-1)[0])); // Convert to Dayjs
    setOpenSlot(true);
  };

  const handleNewAppointment = () => {
    let updatedEvent = {
      title,
      desc,
      start: start.format("YYYY-MM-DD HH:mm"), // Format for API
      end: end.format("YYYY-MM-DD HH:mm"), // Format for API
    };
    addEvent(updatedEvent);
  };

  const handleEventSelected = (event) => {
    setOpenEvent(true);
    setId(event.id);
    setStart(dayjs(event.start)); // Convert to Dayjs
    setEnd(dayjs(event.end)); // Convert to Dayjs
    setTitle(event.title);
    setDesc(event.desc);
    setSelectedEvent(event);
  };

  // Updates Existing Event Title and/or Description
  const handleUpdateEvent = () => {
    let updatedEvent = {
      id,
      title,
      desc,
      start: start.format("YYYY-MM-DD HH:mm"), // Format for API
      end: end.format("YYYY-MM-DD HH:mm"), // Format for API
    };

    if (
      updatedEvent.title === selectedEvent.title &&
      updatedEvent.desc === selectedEvent.desc &&
      updatedEvent.start ===
        dayjs(selectedEvent.start).format("YYYY-MM-DD HH:mm") &&
      updatedEvent.end === dayjs(selectedEvent.end).format("YYYY-MM-DD HH:mm")
    ) {
      alert("Nothing changed!");
      return;
    }
    updateEvent(updatedEvent);
  };

  return (
    <div id="Calendar">
      {/* react-big-calendar library utilized to render calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectEvent={(event) => handleEventSelected(event)}
        onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
        style={{ height: 500, margin: "50px" }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={view}
        view={view} // Include the view prop
        date={date} // Include the date prop
        onView={(view) => setView(view)}
        onNavigate={(date) => {
          setDate(new Date(date));
        }}
      />

      {/* @mui/material Modal for booking new updatedEvent */}
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={openSlot}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {`Make Event on ${start.format("MMMM Do YYYY")}`}
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "75%",
                display: "grid",
              },
            }}
          >
            <TextField
              required
              id="standard-required"
              label="Title"
              variant="standard"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Description"
              variant="standard"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="start time"
                value={start}
                onChange={(date) => {
                  setStart(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              <TimePicker
                label="end time"
                value={end}
                onChange={(date) => {
                  setEnd(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (!title.trim() || !desc.trim()) {
                // alert("Title and Description are required!");
                return; // Prevent submission if fields are empty
              }
              handleNewAppointment();
              handleClose();
            }}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* @mui/material Modal for Existing Event */}

      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={openEvent}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {`View/Edit event on ${start.format("MMMM Do YYYY")}`}
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "75%",
                display: "grid",
              },
            }}
          >
            <TextField
              required
              id="standard-required"
              label="Title"
              variant="standard"
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Description"
              variant="standard"
              defaultValue={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="start time"
                value={start}
                onChange={(date) => {
                  setStart(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              <TimePicker
                label="end time"
                value={end}
                onChange={(date) => {
                  setEnd(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (!title.trim() || !desc.trim()) {
                // alert("Title and Description are required!");
                return; // Prevent submission if fields are empty
              }
              handleUpdateEvent();
              handleClose();
            }}
          >
            Confirm Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Schedule;
