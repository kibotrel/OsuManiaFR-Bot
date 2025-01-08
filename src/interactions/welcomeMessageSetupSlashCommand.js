import {
  ActionRowBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { generateCustomId } from 'discordbox';
import { cache } from '../dependencies/cacheDependency.js';

export const welcomeMessageSetupSlashCommand = {
  action: new SlashCommandBuilder()
    .addChannelOption((option) =>
      option
        .setDescription('The channel to write into.')
        .setName('welcome_channel'),
    )
    .addChannelOption((option) =>
      option
        .setDescription('The channel to read rules from.')
        .setName('rules_channel'),
    )
    .setDescription('Set up a welcome message for new members.')
    .setName('welcome-message-setup'),
  callback: async (interraction, metadata) => {
    const configuration = await cache.get('configuration');
    const { welcome_channel, rules_channel } = metadata.commandArguments;

    const modal = new ModalBuilder()
      .setCustomId(
        generateCustomId('welcome-message-modal', {
          additionalData: `${rules_channel}-${welcome_channel}`,
        }),
      )
      .setTitle('Set message template !')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('template')
            .setLabel('Set your welcome message template')
            .setPlaceholder(
              configuration.template ?? 'Welcome to {{user}} on our server!',
            )
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph),
        ),
      );

    return interraction.showModal(modal);
  },
};
