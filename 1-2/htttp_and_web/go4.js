function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();


function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}`);
    for (const headerKey in headers) {
        console.log(`${headerKey}: ${headers[headerKey]}`)
    }
    console.log("\n" + body);
}

function processHttpRequest($method, $uri, $headers, $body) {
    let correctMethod = $method === "POST";
    let correctUri = /[\w\/]*/.test($uri);
    let statusCode = (correctMethod && correctUri) ? 200 : 400;
    let statusMessage = statusCode === 200 ? "OK" : "Bad Request";
    if ($uri.indexOf('/api') !== 0) {
        statusCode = 404;
        statusMessage = "Not Found";
    }

    let body = `${$body.substring($body.indexOf('=')+1, $body.indexOf('&'))}:${$body.substring($body.lastIndexOf('=')+1)}`;
    let logPass;

    try {
        logPass = require("fs").readFileSync("passwords.txt", 'utf-8');
        body = logPass.indexOf(body) !== -1 ? "<h1 style=\"color:green\">FOUND</h1>" : "<h1 style=\"color:darkred\">Invalid login or password</h1>";
    } catch {
        statusCode = 500;
        statusMessage = "Internal Server Error";
        body = "internal server error"
    }

    if (statusMessage === "Bad Request") {
        body = "bad request";
    }

    if (statusMessage === "Not Found") {
        body = "not found";
    }

    let headers = {
        date: new Date(Date.now()),
        server: "Apache/2.2.14 (Win32)",
        'content-length': body.toString().length,
        connection: "Closed",
        'content-type': "text/html; charset=utf-8"
    }

    outputHttpResponse(statusCode, statusMessage, headers, body);
}

function parseTcpStringAsHttpRequest(string) {
    return {
        method: string.match(/\w*/).shift().trim(),
        uri : string.match(/\s[\w\/.?=,]*/).shift().trim(),
        headers: parseHeadersFromTcp(string),
        body : /^[\w=+&]*$/gm.test(string) ?
            string
                .match(/^[\w=+&]*$/gm)
                .filter(item => item.length > 0)
                .shift()
            : undefined
    };
}

function parseHeadersFromTcp(string) {
    if (string.search(":") === -1) { return undefined};
    let headers = string.match(/^[\w-]*:[\s\w\-*.,\/]*$/gim);
    let objHeaders = {};
    for (const header of headers) {
        objHeaders[header.substring(0,header.indexOf(':'))] = header.substring(header.indexOf(':')+1).trim();
    }
    return objHeaders;
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);