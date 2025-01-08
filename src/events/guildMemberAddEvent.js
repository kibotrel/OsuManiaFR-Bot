import { Events } from 'discord.js';

import { cache } from '../dependencies/cacheDependency.js';

export const guildMemberAddEvent = () => {
  return {
    name: Events.GuildMemberAdd,

    callback: async (member) => {
      const { rulesChannelId, template, welcomeChannelId } = await cache.get(
        'configuration',
      );
      const welcomeChannel = await member.guild.channels.fetch(
        welcomeChannelId,
      );

      await welcomeChannel.send(
        template
          ?.replace('{{user}}', `<@${member.user.id}>`)
          ?.replace('{{rulesChannel}}', `<#${rulesChannelId}>`),
      );
    },
  };
};
