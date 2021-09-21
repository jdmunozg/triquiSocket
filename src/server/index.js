const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let conta = 0;

app.use(express.static("src/client"));

server.listen(5000, () => {
    console.log("Server Running");
    //alert("Server Running");
});

io.on("connection", (socket) => {
    let posicion = "0";
    conta = 0;

    socket.on("new-message", (pos) => {
        posicion = pos;
        //console.log(posicion,conta);
        io.emit("turno", posicion, conta);
        if (conta == 0) {
            conta = 1;
        } else if (conta == 1) {
            conta = 0;
        }
    });
    socket.on("ganador", (ganador) => {
        let mensaje = "";
        if (ganador[0][0] == true) {
            mensaje = "ganador: " + ganador[0][1];
            io.emit("mensaje_ganador", mensaje);
        } else if (ganador[1][0] == true) {
            mensaje = "ganador: " + ganador[1][1];
            io.emit("mensaje_ganador", mensaje);
        } else if (ganador[2][0] == true) {
            mensaje = "el ganador es: " + ganador[2][1];
            io.emit("mensaje_ganador", mensaje);
        } else if (ganador[3][0] == true) {
            mensaje = "ganador: " + ganador[3][1];
            io.emit("mensaje_ganador", mensaje);
        } else if (ganador[4][0] == true) {
            mensaje = ganador[4][1];
            io.emit("mensaje_ganador", mensaje);
        }
    });
});