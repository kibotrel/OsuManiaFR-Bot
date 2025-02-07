import { SlashCommandBuilder } from 'discord.js';

import { environment } from '#src/configurations/environmentConfiguration.js';
import { Actions } from '#src/constants/interactionConstants.js';

export const minecraftWhitelistCommand = {
  action: new SlashCommandBuilder()
    .addSubcommand((subcommand) =>
      subcommand
        .setName('add')
        .setDescription('Add a user to the whitelist.')
        .addStringOption((option) =>
          option
            .setDescription('User that will be whitelisted.')
            .setName('minecraft_username')
            .setRequired(true),
        ),
    )
    .setDescription("Manage this community's Minecraft server whitelist.")
    .setName(Actions.MinecraftWhitelistSlashCommand),

  callback: async (interaction) => {
    const minecraftUsername =
      interaction.options.getString('minecraft_username');

    await interaction.deferReply({ ephemeral: true });

    const minecraftWhitelistEndpoint = new URL(
      'add.php',
      environment.minecraftServerUrl,
    );

    minecraftWhitelistEndpoint.searchParams.append(
      'username',
      minecraftUsername,
    );
    minecraftWhitelistEndpoint.searchParams.append(
      'k',
      environment.minecraftServerKey,
    );

    const response = await fetch(minecraftWhitelistEndpoint);

    if (response.status !== 200) {
      return interaction.followUp({
        content: 'Failed to add user to the whitelist.',
        ephemeral: true,
      });
    }

    return interaction.followUp({
      content: `Added ${minecraftUsername} to the whitelist.`,
      ephemeral: true,
    });
  },
};
