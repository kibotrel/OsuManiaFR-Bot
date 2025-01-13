import {
  ActionRowBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { generateCustomId } from 'discordbox';

import {
  Actions,
  WelcomeMessageVariables,
} from '#src/constants/interactionConstants.js';

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
    .setName(Actions.WelcomeMessageSlashCommand),

  callback: async (interaction, metadata) => {
    const { welcome_channel: welcomeChannel, rules_channel: rulesChannel } =
      metadata.commandArguments;

    const modal = new ModalBuilder()
      .setCustomId(
        generateCustomId(Actions.WelcomeMessageModal, {
          additionalData: `${rulesChannel}-${welcomeChannel}`,
        }),
      )
      .setTitle('Set message template !')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('template')
            .setLabel('Set your welcome message template')
            .setPlaceholder(
              `Welcome to ${WelcomeMessageVariables.User} on our server!`,
            )
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph),
        ),
      );

    return interaction.showModal(modal);
  },
};
