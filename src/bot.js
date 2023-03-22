// nodemon to run or nodemon src/index.js
import { Client, IntentsBitField } from "discord.js";
import * as dotenv from "dotenv";
import { extract_data } from "./handler.js";
import { search } from "./websocket.js";

dotenv.config();
export const webhook_url = process.env.WEBHOOK_URL;


const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${client.user.tag} is online.`);
});

const current_searches = {}

client.on(`interactionCreate`, (interaction) => {
  // Guard, will only run if it is a / command
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const url = interaction.options.get("url");
    current_searches[url.value];
    search(url.value);

  }

  if (interaction.commandName === "cancel") {
    const url = interaction.options.get("url");
    // Guard, if search is not active
    if (!current_searches[url.value]){
      interaction.reply('Not an active search');
      return;
    }
    current_searches.delete(url.value);

  }
});

client.login(TOKEN);

setInterval(extract_data, 5000);