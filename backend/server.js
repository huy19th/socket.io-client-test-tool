const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const app = express();
const PORT = 8000;

app.use(cors());

app.use("/api", (req, res, next) => {
    res.send("api");
});

const server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true,
        transports: ['websocket', 'polling'],
        pingTimeout: 50000,
    },
});

io.use((socket, next) => {
    console.log(socket.handshake);
    next();
})

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("disconnect", (reason) => {
        console.log(`${socket.id} disconnected (${reason})`);
    });

    socket.onAny((event, ...args) => {
        console.log({event, ...args});
    });

})
