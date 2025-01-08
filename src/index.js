import { bot } from '#src/dependencies/discordBotDependency.js';
import { guildMemberAddEvent } from '#src/events/guildMemberAddEvent.js';
import { welcomeMessageSetupModal } from '#src/interactions/welcomeMessageSetupModal.js';
import { welcomeMessageSetupSlashCommand } from '#src/interactions/welcomeMessageSetupSlashCommand.js';

bot.addEventHandlers([guildMemberAddEvent()]);
bot.addGenericInteractions([
  welcomeMessageSetupModal,
  welcomeMessageSetupSlashCommand,
]);
await bot.start();
