import { bot } from './dependencies/discordBotDependency.js';
import { guildMemberAddEvent } from './events/guildMemberAddEvent.js';
import { welcomeMessageSetupModal } from './interactions/welcomeMessageSetupModal.js';
import { welcomeMessageSetupSlashCommand } from './interactions/welcomeMessageSetupSlashCommand.js';

bot.addEventHandlers([guildMemberAddEvent()]);
bot.addGenericInteractions([
  welcomeMessageSetupModal,
  welcomeMessageSetupSlashCommand,
]);
await bot.start();
