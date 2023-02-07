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
    // ...
    console.log("...");
}

function processHttpRequest($method, $uri, $headers, $body) {
    // ... проанализировать входящие данные, вычислить результат
    // и специальной командой красиво вывести ответ
    outputHttpResponse(/*...*/);
}

function parseTcpStringAsHttpRequest(string) {
    return {
        method: string.match(/\w*/).shift().trim(),
        uri : string.match(/\s[\w\/.]*/).shift().trim(),
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