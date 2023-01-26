const http = require("http")!;
const PORT = 3000;

const friends: object[] = [
  {
    id: 0,
    name: "Sir Isaac Newton",
  },
  {
    id: 1,
    name: "Sir Nikola Tesla",
  },
  {
    id: 2,
    name: "Sir Albert Einstein",
  },
  {
    id: 3,
    name: "Miss. Marie curie",
  },
  {
    id: 4,
    name: "Sir Galileo Galilei",
  },
];

const server = http.createServer(
  (
    req: {
      url: string;
      method: string;
      on: (a: string, b: (x: Buffer) => void) => void;
      pipe: (a: object) => void;
    },
    res: {
      write: (a: string) => void;
      writeHead: (a: number, b: object) => void;
      end: (a: string) => void;
      setHeader: (a: string, b: string) => void;
      statusCode: number;
    }
  ) => {
    const urlPortions: string[] = req.url.split("/");
    const portionIndex: number = +urlPortions[urlPortions.length - 1];
    if (req.method === "POST" && urlPortions.length === 2  && urlPortions[1] === "friends") {
      req.on("data", (data) => {
        const dataUsable = data.toString();
        friends.push(JSON.parse(dataUsable));
      });
      req.pipe(res);
    }
    if (req.method !== "GET") return;
    if (portionIndex >= friends.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("not found!");
    }
    if (urlPortions.length === 2 && urlPortions[1] === "friends") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(friends));
    } else if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Hello, welcome to your first server");
    } else if (urlPortions.length === 3) {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(friends[portionIndex]));
    } else {
      res.statusCode = 404;
    }
  }
);
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
