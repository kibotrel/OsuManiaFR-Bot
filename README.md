# OsuManiaFR-DiscordBot

<img src='./assets/banner.png'>

[![CodeFactor](https://www.codefactor.io/repository/github/kibotrel/osumaniafr-bot/badge)](https://www.codefactor.io/repository/github/kibotrel/osumaniafr-bot)
![GitHub package.json version](https://img.shields.io/github/package-json/v/kibotrel/OsuManiaFR-Bot)

This project is a Discord bot built for [osu!mania fr](https://discord.gg/MbtusQ9a9d) community.

## ✨ Features

Full list of features can be found in the [features](./docs/features.md) documentation.

## 📦 Install

> [!NOTE]
>
> [nvm](https://github.com/nvm-sh/nvm) and [pnpm](https://pnpm.io/) are mandatory to run this project.

Clone this repository and run the following commands:

```bash
nvm use
pnpm install
```

Then create a `.env` file at the root of the project based on the [`.env.example`](./examples/example.env) file.

> [!TIP]
>
> `KV_***` variables are related to a [Vercel KV Store](https://vercel.com/docs/storage).

Finally, run the bot with the following command:

```bash
pnpm dev
```
