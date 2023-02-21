import http from 'http';

const text = "Kovalchuk test message."
let t0: number;
let t1: number;
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Length': text.length
    }
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`Response received: ${data}`);
        t1 = performance.now();
        data === text ? console.log("Request equals response.") : console.log("Request does not equals response.");
        console.log(`The time it took to transmit the data and receive it back: ${t1-t0} ms`);
    });
});

req.on('error', (error) => {
    console.error(`Error sending request: ${error}`);
});

t0 = performance.now();
req.write(text);
req.end();