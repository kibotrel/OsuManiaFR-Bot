import { cache } from '../dependencies/cacheDependency.js';

export const welcomeMessageSetupModal = {
  action: 'welcome-message-modal',

  callback: async (interraction, metadata) => {
    const { userId, additionalData, modalFields } = metadata;
    const channelIds = additionalData.split('-');
    const currentConfiguration = await cache.get('configuration');
    const [rulesChannelId, template, welcomeChannelId] = [
      channelIds.at(0) || currentConfiguration.rulesChannelId,
      modalFields.get('template') || currentConfiguration.template,
      channelIds.at(1) || currentConfiguration.welcomeChannelId,
    ];

    await cache.set('configuration', {
      rulesChannelId,
      template,
      welcomeChannelId,
    });

    return interraction.reply({
      content: `Example welcome message that will be posted in <#${welcomeChannelId}>:\n\n${template
        ?.replace('{{user}}', `<@${userId}>`)
        ?.replace('{{rulesChannel}}', `<#${rulesChannelId}>`)}`,
      ephemeral: true,
    });
  },
};
