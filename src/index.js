import { bot } from '#src/dependencies/discordBotDependency.js';
import { guildMemberAddEvent } from '#src/events/guildMemberAddEvent.js';
import { welcomeMessageSetupModal } from '#src/interactions/welcomeMessageSetupModal.js';
import { welcomeMessageSetupSlashCommand } from '#src/interactions/welcomeMessageSetupSlashCommand.js';
import { exportMembersSlashCommand } from './interactions/exportMembersSlashCommand.js';
import { minecraftWhitelistCommand } from './interactions/minecraftWhitelistCommand.js';

bot.addEventHandlers([guildMemberAddEvent()]);
bot.addGenericInteractions([
  exportMembersSlashCommand,
  minecraftWhitelistCommand,
  welcomeMessageSetupModal,
  welcomeMessageSetupSlashCommand,
]);
await bot.start();
