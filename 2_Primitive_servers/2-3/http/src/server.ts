import http from "http";

const PORT: number = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.method == "POST") {
        var data: string = "";
    }

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', () => {
        const responseText = data;

        console.log(`Client IP address: ${req.socket.remoteAddress}`);
        console.log(`${new Date().getHours()}:${new Date().getMinutes()} Received data: ${data}`);
        console.log(`${new Date().getHours()}:${new Date().getMinutes()} Response sent: ${responseText}`);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(responseText);
    });
})

server.listen(PORT, () => console.log(`${new Date().getHours()}:${new Date().getMinutes()} Server started listening on port ${PORT}.`));

server.on('connection', (socket) => {
    console.log(`${new Date().getHours()}:${new Date().getMinutes()} New connection from: ${socket.remoteAddress}`)
});

server.on('close', () => console.log(`${new Date().getHours()}:${new Date().getMinutes()} Server closed.`));

