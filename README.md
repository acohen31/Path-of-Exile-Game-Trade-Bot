# Path of Exile Game Trade Bot

Path of Exile Game Trade Bot is a Discord bot for consolodating live item searches from the Path of Exile (PoE) [trade site](https://www.pathofexile.com/trade). It monitors live trade updates based on user-provided search URLs and notifies the user through Discord when items of interest are listed.

## Motivation & Features

Trading in Path of Exile can be a complex and demanding part of the gameplay experience. The official Path of Exile trade website requires traders to maintain multiple live search tabs in their web browsers, which can be cumbersome and inefficient, particularly for active traders juggling numerous searches. This not only clutters the desktop but also impacts computer performance and user focus.

This bot was created to address the friction in the trading experience. Instead of managing multiple tabs, traders can receive live search results directly in Discord. This consolidation simplifies the trading process, making it more accessible and less disruptive to the gaming experience. By using this bot, traders can:

- Monitor multiple live trade searches without tab-switching.
- Receive instant notifications within a single Discord channel.
- Enjoy a cleaner, more organized trading workflow.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js version 16.0 or above.
- You have a Discord account and have created a bot user on the [Discord Developer Portal](https://discord.com/developers/applications).
- You have a Path of Exile account and have obtained your `POESESSID` for authenticated requests. [How to find](https://www.gamepressure.com/newsroom/how-to-find-poe-session-id/z74e59) `POESESSID`.

## Installation

To install the bot, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/acohen31/path-of-exile-game-trade-bot.git
   ```
2. Navigate to the project directory:
   ```sh
   cd path-of-exile-game-trade-bot
   ```
3. Install the required dependencies:
   ```sh
   npm install
   ```

## Configuration

1. Rename the `.env.example` file to `.env`.
2. Set your Discord bot token, client ID, guild ID, and your `POESESSID` in the `.env` file.
   ```
   TOKEN=your_discord_bot_token
   CLIENT_ID=your_client_id
   GUILD_ID=your_guild_id
   POESESSID=your_poe_session_id
   WEBHOOK_URL=your_discord_webhook_url
   ```

## Running the Bot

To run the bot, use the following command:

```sh
node bot.js
```

## Usage

To use the bot, you must first register the slash commands with your Discord server by running:

```sh
node register-commands.js
```

After registering the commands, you can use the following commands within your Discord server:

- `/add url:<trade_search_url>` - Starts monitoring a live search for the provided Path of Exile trade search URL.
- `/cancel url:<trade_search_url>` - Stops monitoring the live search.

## Contributing

If you want to contribute to this project, please fork the repository and issue pull requests or submit issues with your suggestions.

## Acknowledgements

This bot is not affiliated with or endorsed by Grinding Gear Games, the developers of Path of Exile.
