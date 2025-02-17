# ✨ Features <!-- omit in toc -->

This Discord bot features are accessible through [Disord Slash Commands](https://support-apps.discord.com/hc/en-us/articles/26501837786775-Slash-Commands-FAQ). It is up to the Discord server owner to configure authorization for each command.

## 📚 Summary <!-- omit in toc -->

- [`/export-members`](#export-members)
- [`/minecraft-whitelist add`](#minecraft-whitelist-add)
- [`/minecraft-whitelist show`](#minecraft-whitelist-show)
- [`/welcome-message-setup`](#welcome-message-setup)

### `/export-members`

> [!NOTE]
>
> This command as no options.

Export Server's member list to a CSV file. The CSV file will contain the following columns:

|    Column Name    |          Description           |
| :---------------: | :----------------------------: |
|  `accountHandle`  |       The account handle       |
| `accountUsername` |  The global username, if set   |
|  `guildUsername`  | This server's username, if set |

This command is useful for server administrators to keep track of osu! username changes for example.

### `/minecraft-whitelist add`

> [!TIP]
>
> This command has the following options:
>
> |     Option Name      |  Type   | Required |                                                              Description                                                              |
> | :------------------: | :-----: | :------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
> | `minecraft_username` | String  |   Yes    |                                              Minecraft username that will be whitelisted                                              |
> |  `is_account_owner`  | Boolean |   Yes    |                                    If Slash command user is the account of this Minecraft account                                     |
> |    `discord_user`    |  User   |    No    | Discord user that will be linked to the Minecraft username, if not set, defaults to Slash command user when `is_account_owner = true` |

Add a Minecraft username to the community's Minecraft server's whitelist. Also gives whitelisted user the `Minecraft` Discord role.

### `/minecraft-whitelist show`

> [!NOTE]
>
> This command as no options.

Show the current whitelist of the community's Minecraft server. This command allows to keep track of how many users are currently whitelisted and which Minecraft account belongs to which Discord user.

### `/welcome-message-setup`

> [!TIP]
>
> This command has the following options:
>
> |    Option Name    |  Type   | Required |                    Description                     |
> | :---------------: | :-----: | :------: | :------------------------------------------------: |
> | `welcome_channel` | Channel |    No    | The channel where the welcome message will be sent |
> |  `rules_channel`  | Channel |    No    |      The channel where the rules are located       |

Setup the welcome message for new members. Invoking this command then prompts the user a modal to input the welcome message template. This template can leverage Discord's markdown syntax and use custom variables to personalize the message:

- `{{rulesChannel}}`: The rules channel mention
- `{{user}}`: The new member's username
- `{{welcomeChannel}}`: The welcome channel mention

Each option (welcome channel, rules channel and message template) can be set independently. Simply invoke the command again with the desired options only to update accordingly.
