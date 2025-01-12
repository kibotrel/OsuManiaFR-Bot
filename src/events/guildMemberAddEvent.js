import { Events } from 'discord.js';

import { CONFIGURATION_CACHE_KEY } from '#src/constants/cacheConstants.js';
import { WelcomeMessageVariables } from '#src/constants/interactionConstants.js';
import { cache } from '#src/dependencies/cacheDependency.js';

export const guildMemberAddEvent = () => {
  return {
    name: Events.GuildMemberAdd,

    callback: async (member) => {
      const { rulesChannelId, template, welcomeChannelId } = await cache.get(
        CONFIGURATION_CACHE_KEY,
      );
      const welcomeChannel = await member.guild.channels.fetch(
        welcomeChannelId,
      );

      await welcomeChannel.send(
        template
          ?.replace(
            WelcomeMessageVariables.RulesChannel,
            `<@${member.user.id}>`,
          )
          ?.replace(WelcomeMessageVariables.User, `<#${rulesChannelId}>`)
          ?.replace(
            WelcomeMessageVariables.WelcomeChannel,
            `<#${welcomeChannelId}>`,
          ),
      );
    },
  };
};
