var http = require("http");
var PORT = 3000;
var friends = [
    {
        id: 0,
        name: "Sir Isaac Newton"
    },
    {
        id: 1,
        name: "Sir Nikola Tesla"
    },
    {
        id: 2,
        name: "Sir Albert Einstein"
    },
    {
        id: 3,
        name: "Miss. Marie curie"
    },
    {
        id: 4,
        name: "Sir Galileo Galilei"
    },
];
var server = http.createServer(function (req, res) {
    var urlPortions = req.url.split("/");
    var portionIndex = +urlPortions[urlPortions.length - 1];
    if (req.method === "POST" && urlPortions.length === 2 && urlPortions[1] === "friends") {
        req.on("data", function (data) {
            var dataUsable = data.toString();
            friends.push(JSON.parse(dataUsable));
        });
        req.pipe(res);
    }
    if (req.method !== "GET")
        return;
    if (portionIndex >= friends.length) {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("not found!");
    }
    if (urlPortions.length === 2 && urlPortions[1] === "friends") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(friends));
    }
    else if (req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("Hello, welcome to your first server");
    }
    else if (urlPortions.length === 3) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(friends[portionIndex]));
    }
    else {
        res.statusCode = 404;
    }
});
server.listen(PORT, function () {
    console.log("listening on port ".concat(PORT));
});
