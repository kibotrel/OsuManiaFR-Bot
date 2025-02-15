import { LogLevel } from 'discordbox';

export const environment = {
  discordBotClientId: process.env.DISCORD_BOT_CLIENT_ID ?? '',
  discordBotGuildId: process.env.DISCORD_BOT_GUILD_ID ?? '',
  discordBotSupportUserId: process.env.DISCORD_BOT_SUPPORT_USER_ID ?? '',
  discordBotToken: process.env.DISCORD_BOT_TOKEN ?? '',
  logLevel:
    process.env.NODE_ENV === 'production' ? LogLevel.Error : LogLevel.Info,
  minecraftRoleId: process.env.MINECRAFT_ROLE_ID ?? '',
  minecraftServerKey: process.env.MINECRAFT_SERVER_KEY ?? '',
  minecraftServerUrl: process.env.MINECRAFT_SERVER_URL ?? '',
  nodeEnv: process.env.NODE_ENV ?? '',
  version: '0.1.4',
};
