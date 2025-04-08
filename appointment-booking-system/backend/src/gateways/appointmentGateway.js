
let io=null;
function initializeSocket(server) {
  const { Server } = require("socket.io");

  io=new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected:",socket.id);
  });
}

function emitSlotBooked(data) {
  if (io) {
                io.emit("slotBooked", data);
  }
}

module.exports = {initializeSocket,emitSlotBooked};
