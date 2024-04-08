import { createServer } from "http";
const PORT = process.env.PORT || 5000;

const server = createServer((req, res) => {
  if (req.url === "/friends" || req.url === "/friends/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<ul>");
    res.write("<li>");
    res.write("ada lovelace");
    res.write("</li>");
    res.write("<li>");
    res.write("charles babbage");
    res.write("</li>");
    res.write("</ul>");
    res.write("</html>");
    res.end();
  } else if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(
      `<p>your friend is Isaac Newton. Wanna find out who his friends are? <a href='http://127.0.0.1:${PORT}${req.url}friends/'> find out</a></p>`
    );
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`server is active an listening on port ${PORT}`);
});
