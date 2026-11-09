// ...existing code...
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  userId = String(userId); // normalize type
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  } else {
    // update socketId if the user reconnects from another socket
    userExits.socketId = socketId;
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

// add helper to remove by userId
const removeUserById = (userId) => {
  userId = String(userId);
  onlineUser = onlineUser.filter((user) => user.userId !== userId);
};

const getUser = (userId) => {
  userId = String(userId);
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id); // debug
  socket.on("newUser", (userId) => {
    console.log("newUser from", userId, "socket:", socket.id); // debug
    addUser(userId, socket.id);

    // send the full online list to the newly connected socket
    socket.emit(
      "onlineUsers",
      onlineUser.map((u) => u.userId)
    );

    // notify others that this user is online
    socket.broadcast.emit("userOnline", String(userId));
  });

  // handle explicit "setOffline" (client logout)
  socket.on("setOffline", ({ userId }) => {
    if (!userId) return;
    removeUserById(userId);
    io.emit("userOffline", String(userId));
    // optional: if you want to close this socket server-side
    // socket.disconnect(true);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver && receiver.socketId) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    const user = onlineUser.find((u) => u.socketId === socket.id);
    if (user) {
      io.emit("userOffline", user.userId);
      removeUser(socket.id);
    }
  });
});

io.listen("4000");
