import { GatewayIntentBits } from 'discord.js';
import { DiscordBot } from 'discordbox';

import { environment } from '../configurations/environmentConfiguration.js';

export const bot = new DiscordBot({
  gatewayIntents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  token: environment.discordBotToken,
  clientId: environment.discordBotClientId,
  guildId: environment.discordBotGuildId,
  supportUserId: environment.discordBotSupportUserId,
  logLevel: environment.logLevel,
});
