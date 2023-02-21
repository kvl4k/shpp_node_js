import dgram from 'dgram';


let server = dgram.createSocket('udp4');


server.on('error', function (error) {
    console.log(`new Date().getHours()}:${new Date().getMinutes()} Error: ` + error);
    server.close();
});

server.on('message', function (msg, info) {
    console.log(`${new Date().getHours()}:${new Date().getMinutes()} New message from IP address: ${info.address}:${info.port}`);
    console.log(`${new Date().getHours()}:${new Date().getMinutes()} Data received from client : ` + msg.toString());
    console.log(`${new Date().getHours()}:${new Date().getMinutes()} Message is sent to client`)
    server.send(msg, 0, msg.length, info.port, info.address, (err) => {
        if (err) {
            console.log("Error: " + err);
        }
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`${new Date().getHours()}:${new Date().getMinutes()} Server listening on port: ${address.port}`);
    server.on('close', function () {
        console.log(`${new Date().getHours()}:${new Date().getMinutes()} Soccet is closed.`);
    });
    
});


server.bind(3000);

