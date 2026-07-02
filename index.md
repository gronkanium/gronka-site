---
layout: default
description: a discord bot that downloads from social media and converts to gif
image: /assets/favicon.png
---

[![Add to Discord](https://img.shields.io/badge/Add_to_Discord-5865F2?logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=1439329052002357599)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/thedorekaczynski/gronka)

a discord bot that downloads from social media and converts to gif.

## commands

- `/download` - download from twitter, tiktok, instagram, youtube, reddit, facebook, threads
- `/convert` - turn a video or image into a gif
- `/optimize` - compress an existing gif

you can also right-click any message and use the context menu.

## self-hosting

docker is the supported way to run gronka (the image includes ffmpeg, gifsicle, and yt-dlp).

```bash
git clone https://github.com/thedorekaczynski/gronka.git
cd gronka
cp .env.example .env
```

add your `DISCORD_TOKEN` and `CLIENT_ID` to `.env`, then:

```bash
docker compose up -d
docker compose run --rm app npm run register-commands
```

check `.env.example` for all options.

## license

MIT
