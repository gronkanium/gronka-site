---
layout: default
description: gronka is a free, open-source discord bot that converts videos and images to gifs and downloads media from 20+ platforms — twitter/x, tiktok, instagram, youtube, reddit, and more
image: /assets/og-image.png
---

# gronka

[![Add to Discord](https://img.shields.io/badge/Add_to_Discord-5865F2?logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=1522194017692156046)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/thedorekaczynski/gronka)

gronka is a free, open-source discord bot that downloads videos and images from social media and converts them to gifs — right inside your server.

## commands

- `/download` - download from 20+ platforms: twitter/x, tiktok, instagram, youtube, reddit, twitch, imgur, and more
- `/convert` - turn a video or image into a gif
- `/optimize` - compress an existing gif

you can also right-click any message and use the context menu.

every download source can be turned on or off individually from the built-in web dashboard.

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
