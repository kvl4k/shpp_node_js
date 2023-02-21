import net from 'net';
import { performance } from 'perf_hooks';

const PORT = 3000;
const MESSAGE = "Kovalchuk test message.";
let t0: number;
let t1: number;

const client = new net.Socket();

client.connect(PORT, 'localhost', () => {
    t0 = performance.now();
    console.log('Connected to server');
    client.write(MESSAGE);
});

client.on('data', (data) => {
    t1 = performance.now();
    console.log(`Received from server: ${data}`);
    MESSAGE === data.toString() ? console.log("Request equals response.") : console.log("Request does not equals response.");
    console.log(`The time it took to transmit the data and receive it back: ${t1 - t0} ms`);
    client.destroy();
});

client.on('close', () => {
    console.log('Connection closed');
});