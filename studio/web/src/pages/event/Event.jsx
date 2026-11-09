import React, { useState, useEffect, useContext } from "react";
import Schedule from "./Schedule";
import moment from "moment";
import axios from "axios";
import { AppContext } from "../../contexts/appContext";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import Confirm from "../../components/Confirm";

const Event = () => {
  const [isLoading] = useState(false);
  const nav = useNavigate();
  const { logout, events, getEvents } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState("");

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const addEvent = async (event) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/event/`, event);
      await getEvents();
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
    }
  };

  const updateEvent = async (event) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/event/${event.id}`,
        event
      );
      await getEvents();
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
    }
  };

  const handleDeleteClick = (id) => {
    setEventIdToDelete(id);
    setOpenDialog(true);
  };

  const confirmDeleteEvent = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/event/${eventIdToDelete}`
      );
      await getEvents();
      setOpenDialog(false);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message || "Failed to delete event");
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
    }
  };

  return (
    <div className="container mx-auto my-5 p-5">
      <h1 className="text-center text-4xl font-bold mb-5">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div id="main" className="space-y-5">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            events.map((event, index) => {
              const { id, title, desc, start, end } = event;
              return (
                <div key={index} className="bg-white shadow-md rounded-lg p-5">
                  <h2 className="text-2xl font-semibold">
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white">
                      {title}
                    </button>
                  </h2>
                  <p className="text-gray-700 mt-2">{desc}</p>
                  <div className="mt-4 text-gray-600">
                    <time>
                      Start: <span>{moment(start).format("YYYY-MM-DD HH:mm")}</span>
                    </time>{" "}
                    <time>
                      End: <span>{moment(end).format("YYYY-MM-DD HH:mm")}</span>
                    </time>
                  </div>
                  <MdDeleteForever
                    size={30}
                    className="text-red-500 cursor-pointer mt-2"
                    onClick={() => handleDeleteClick(id)}
                  />
                </div>
              );
            })
          )}
        </div>
        <div className="col-span-1">
          <Schedule events={events} addEvent={addEvent} updateEvent={updateEvent} />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Confirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDeleteEvent}
        title="Confirm Deletion"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
};

export default Event;