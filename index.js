const WebSocket = require('ws');
const dotenv = require('dotenv');
dotenv.config();
 
const webhook_url = process.env.WEBHOOK_URL;
const item_url = 'https://www.pathofexile.com/api/trade/fetch/';

const ws = new WebSocket('wss://www.pathofexile.com/api/trade/live/Sanctum/VQn2Tp', {
    headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'Upgrade',
        'Cookie': process.env.POESESSID,
        'Host': 'www.pathofexile.com',
        'Origin': 'https://www.pathofexile.com',
        'Pragma': 'no-cache',
        'Upgrade': 'websocket',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    }
});

ws.on('error', console.error);

const queue = [];
ws.on('message', function message(data) {
  console.log('received: %s', data);
  // parse string JSON into object
  data = JSON.parse(data);
  // guard for no new data
  if (!data.new){
    return;
  }
  queue.push(...data.new);

});

// async function since we want to wait for the async function, fetch, to finish 
async function extract_data(){
  if(queue.length == 0){
    return;
  }
  let full_url = item_url;
  const amount_to_pop = Math.min(queue.length,5)
  for(let i = 0; i < amount_to_pop; i++){
    full_url += queue.pop() + ',';    
  }
  // fetching with a format string, concatinating the item_url prefix with the item_id
  const response = await fetch(full_url);
  // convert the response body into json
  const item_data = await response.json();

  for(const item of item_data.result){
    let name = `${item.item.name} ${item.item.baseType}`
    let price = `${item.listing.price != null ? `${item.listing.price.amount} - ${item.listing.price.currency}`:"No price"}`
    let item_details =  `${name}\n${price}\n`;
    for(const mod of item.item.explicitMods){
      item_details += `${mod}\n`
    }
    item_details += `${item.listing.whisper}\n--------------`;
    
    const message = await fetch(webhook_url, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({"content": item_details})
    })
    console.log(await message.text());
  }
}

setInterval(extract_data, 5000)