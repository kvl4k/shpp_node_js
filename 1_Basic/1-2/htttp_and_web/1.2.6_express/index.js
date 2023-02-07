const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT);

let counter = 0;
app.get('/', (req, res) => {
    res.send(counter++ + "");
})

let homeCounter = 0
app.get('/home', (req, res) => {
    res.send(homeCounter++ + "");
})


