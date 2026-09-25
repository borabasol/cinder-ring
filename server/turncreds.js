// Issues short-lived TURN credentials (coturn "use-auth-secret" / TURN REST API scheme).
const http = require("http"), crypto = require("crypto"), fs = require("fs");
const SECRET = fs.readFileSync("/etc/cinder/turn.secret", "utf8").trim();
const ALLOWED = ["https://cinderring.tech", "https://www.cinderring.tech", "https://borabasol.github.io"];
const TTL = 24 * 3600;
http.createServer((req, res) => {
  const origin = req.headers.origin || "";
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store", "Vary": "Origin" };
  if (ALLOWED.includes(origin)) headers["Access-Control-Allow-Origin"] = origin;
  else { res.writeHead(403, headers); return res.end("[]"); }
  const username = `${Math.floor(Date.now() / 1000) + TTL}:cinder`;
  const credential = crypto.createHmac("sha1", SECRET).update(username).digest("base64");
  const host = "cinderring.tech";
  res.writeHead(200, headers);
  res.end(JSON.stringify([{ urls: [`turn:${host}:3478?transport=udp`, `turn:${host}:3478?transport=tcp`, `turns:${host}:5349?transport=tcp`], username, credential }]));
}).listen(9001, "127.0.0.1");
