import { webhook_url } from './bot.js'
const queue = [];
const item_url = "https://www.pathofexile.com/api/trade/fetch/";

export function queue_append(ids){
    // guard for no new data
    if (!ids) {
        return;
      }
      queue.push(...ids);
}
// async function since we want to wait for the async function, fetch, to finish
export async function extract_data() {
  if (queue.length == 0) {
    return;
  }
  let full_url = item_url;
  const amount_to_pop = Math.min(queue.length, 5);
  for (let i = 0; i < amount_to_pop; i++) {
    full_url += queue.pop() + ",";
  }
  // fetching with a format string, concatinating the item_url prefix with the item_id
  const response = await fetch(full_url);
  // convert the response body into json
  const item_data = await response.json();

  for (const item of item_data.result) {
    let name = `${item.item.name} ${item.item.baseType}`;
    let price = `${
      item.listing.price != null
        ? `${item.listing.price.amount} - ${item.listing.price.currency}`
        : "No price"
    }`;
    let item_details = `${name}\n${price}\n`;
    for (const mod of item.item.explicitMods) {
      item_details += `${mod}\n`;
    }
    item_details += `${item.listing.whisper}\n--------------`;

    const message = await fetch(webhook_url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: item_details }),
    });
    console.log(await message.text());
  }
}
