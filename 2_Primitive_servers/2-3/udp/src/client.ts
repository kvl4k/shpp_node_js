import dgram from 'dgram';
import { performance } from 'perf_hooks';

const client = dgram.createSocket('udp4');
const message = Buffer.from("Kovalchuk test message.");
let t0: number = performance.now();
let t1: number = performance.now();


client.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg}`);
    t1 = performance.now();
    msg === message ? console.log("Request equals response.") : console.log("Request does not equals response.");
    console.log(`The time it took to transmit the data and receive it back: ${t1-t0} ms`);
    client.close();
});

client.send(message, 0, message.length, 3000, 'localhost', (err) => {
    if (err) throw err;
    t0 = performance.now();
});