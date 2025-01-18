import { CONFIGURATION_CACHE_KEY } from '#src/constants/cacheConstants.js';
import {
  Actions,
  WelcomeMessageVariables,
} from '#src/constants/interactionConstants.js';

import { cache } from '#src/dependencies/cacheDependency.js';

export const welcomeMessageSetupModal = {
  action: Actions.WelcomeMessageModal,

  callback: async (interaction, metadata) => {
    const { userId, additionalData, modalFields } = metadata;
    const channelIds = additionalData.split('-');
    const currentConfiguration = await cache.get(CONFIGURATION_CACHE_KEY);
    const [rulesChannelId, template, welcomeChannelId] = [
      channelIds.at(0) || currentConfiguration.rulesChannelId,
      modalFields.get('template') || currentConfiguration.template,
      channelIds.at(1) || currentConfiguration.welcomeChannelId,
    ];

    await cache.set(CONFIGURATION_CACHE_KEY, {
      rulesChannelId,
      template,
      welcomeChannelId,
    });

    return interaction.reply({
      content: `Example welcome message that will be posted in <#${welcomeChannelId}>:\n\n${template
        ?.replace(WelcomeMessageVariables.RulesChannel, `<#${rulesChannelId}>`)
        ?.replace(WelcomeMessageVariables.User, `<@${userId}>`)
        ?.replace(
          WelcomeMessageVariables.WelcomeChannel,
          `<#${welcomeChannelId}>`,
        )}`,
      ephemeral: true,
    });
  },
};
