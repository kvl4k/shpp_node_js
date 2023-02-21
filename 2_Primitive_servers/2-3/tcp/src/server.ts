import net from 'net';
const PORT = 3000;

let server = net.createServer((socket) => {
    console.log(`${new Date().getHours()}:${new Date().getMinutes()} Client connected.`);
    socket.on('data', (data) => {
        console.log(`${new Date().getHours()}:${new Date().getMinutes()} Received from client: ${data}`);
        console.log(`${new Date().getHours()}:${new Date().getMinutes()} Server received: ${data}`);
        socket.write(data);
    });

    socket.on('end', () => {
        console.log(`${new Date().getHours()}:${new Date().getMinutes()} Client disconnected`);
    });

});

server.listen(PORT, () => console.log(`${new Date().getHours()}:${new Date().getMinutes()} Server listening on port: ${PORT}`));


server.on('error', (err) => {
    throw err;
});