import { SlashCommandBuilder } from 'discord.js';

import { Actions } from '#src/constants/interactionConstants.js';
import { AttachmentBuilder } from 'discord.js';

export const exportMembersSlashCommand = {
  action: new SlashCommandBuilder()
    .setDescription('Create a CSV file with all member usernames.')
    .setName(Actions.ExportMembersSlashCommand),

  callback: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const {
      member: {
        guild: { members: membersManager },
      },
    } = interaction;

    const membersCollection = await membersManager.fetch({
      cache: false,
      force: true,
    });

    const members = membersCollection
      .filter((member) => !member.user.bot)
      .map((member) => {
        return {
          accountHandle: member.user.username,
          accountUsername: member.user.globalName ?? '',
          guildUsername: member.nickname ?? '',
        };
      });

    const csvData = members.map((member) => {
      return `${member.accountHandle},${member.accountUsername},${member.guildUsername}`;
    });

    csvData.unshift('Account Handle,Account Username,Guild Username');

    const csvBuffer = Buffer.from(csvData.join('\n'), 'utf-8');

    return interaction.followUp({
      content:
        "Here is a CSV file with all server and account usernames from this server's members.",
      ephemeral: true,
      files: [
        new AttachmentBuilder().setFile(csvBuffer).setName('usernames.csv'),
      ],
    });
  },
};
