import WebSocket from "ws";
import * as dotenv from "dotenv";
import { queue_append } from "./handler.js";
dotenv.config();

export function search(url) {
  // Destructuring operator, desrtucturing array of size 2 
  const split_url = url.split('/');
  const size = split_url.length;
  const league = split_url[size - 2];
  const item_query = split_url[size - 1];
  const ws = new WebSocket(
    `wss://www.pathofexile.com/api/trade/live/${league}/${item_query}`,
    {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "Upgrade",
        Cookie: process.env.POESESSID,
        Host: "www.pathofexile.com",
        Origin: "https://www.pathofexile.com",
        Pragma: "no-cache",
        Upgrade: "websocket",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      },
    }
  );

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    // parse string JSON into object
    data = JSON.parse(data);
    
    queue_append(data.new);
  });

}
