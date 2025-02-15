import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { environment } from '#src/configurations/environmentConfiguration.js';
import { MINECRAFT_WHITELIST_CACHE_KEY } from '#src/constants/cacheConstants.js';
import { BASE_EMBED_COLOR } from '#src/constants/embedConstants.js';
import { Actions } from '#src/constants/interactionConstants.js';
import { cache } from '#src/dependencies/cacheDependency.js';

const MinecraftWhitelistSubcommands = {
  Add: 'add',
  Show: 'show',
};

const minecraftWhitelistSubcommandAddCallback = async (
  interaction,
  metadata,
) => {
  const { userId: addedByUserId } = metadata;
  const discordUser = interaction.options.getUser('discord_user') ?? { id: '' };
  const isAccountOwner = interaction.options.getBoolean('is_accont_owner');
  const discordOwnerId = isAccountOwner ? addedByUserId : discordUser.id;

  const minecraftUsername = interaction.options.getString('minecraft_username');
  const minecraftWhitelistEndpoint = new URL(
    'add.php',
    environment.minecraftServerUrl,
  );

  minecraftWhitelistEndpoint.searchParams.append('username', minecraftUsername);
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

  await cache.sadd(
    MINECRAFT_WHITELIST_CACHE_KEY,
    `${discordOwnerId}:${minecraftUsername}:${addedByUserId}`,
  );

  if (discordOwnerId) {
    const guildMember = await interaction.guild.members.fetch(discordOwnerId);

    await guildMember.roles.add(environment.minecraftRoleId);
  }

  return interaction.followUp({
    content: `Added ${minecraftUsername} to the whitelist.`,
    ephemeral: true,
  });
};

const sortByMinecraftUsername = (a, b) => {
  const [, minecraftUsernameA] = a.split(':');
  const [, minecraftUsernameB] = b.split(':');

  return minecraftUsernameA.localeCompare(minecraftUsernameB);
};

const minecraftWhitelistSubcommandShowCallback = async (interaction) => {
  const whitelist = (await cache.smembers(MINECRAFT_WHITELIST_CACHE_KEY))
    .sort(sortByMinecraftUsername)
    .map((entry) => {
      const [discordUser, minecraftUsername, addedByUser] = entry
        .split(':')
        .map((member, index) => {
          return index % 2 ? member : member ? `<@${member}>` : 'Unknown';
        });

      if (discordUser === addedByUser) {
        return `${discordUser} (${minecraftUsername})`;
      }

      return `${discordUser} (${minecraftUsername}) added by ${addedByUser}`;
    });

  const whitelistEmbed = new EmbedBuilder()
    .setColor(BASE_EMBED_COLOR)
    .setDescription(
      whitelist.length
        ? whitelist.join('\n')
        : 'No user currently whitelisted.',
    )
    .setFooter({ text: `v${environment.version}` })
    .setTimestamp()
    .setTitle(`Minecraft server whitelist (${whitelist.length})`);

  return interaction.followUp({
    embeds: [whitelistEmbed],
    ephemeral: true,
  });
};

export const minecraftWhitelistCommand = {
  action: new SlashCommandBuilder()
    .addSubcommand((subcommand) =>
      subcommand
        .setName(MinecraftWhitelistSubcommands.Add)
        .setDescription('Add a user to the whitelist.')
        .addStringOption((option) =>
          option
            .setDescription('Minecraft username that will be whitelisted.')
            .setName('minecraft_username')
            .setRequired(true),
        )
        .addBooleanOption((option) =>
          option
            .setDescription('Is this your minecraft account?')
            .setName('is_account_owner')
            .setRequired(true),
        )
        .addUserOption((option) =>
          option
            .setDescription('User that will be whitelisted.')
            .setName('discord_user'),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(MinecraftWhitelistSubcommands.Show)
        .setDescription('Show the whitelist.'),
    )
    .setDescription("Manage this community's Minecraft server whitelist.")
    .setName(Actions.MinecraftWhitelistSlashCommand),

  callback: async (interaction, metadata) => {
    await interaction.deferReply({ ephemeral: true });

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case MinecraftWhitelistSubcommands.Add:
        return minecraftWhitelistSubcommandAddCallback(interaction, metadata);

      case MinecraftWhitelistSubcommands.Show:
        return minecraftWhitelistSubcommandShowCallback(interaction);

      default:
        break;
    }
  },
};
