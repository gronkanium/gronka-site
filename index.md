---
layout: default
description: gronka is a free, open-source discord bot that converts videos/images to gifs and downloads media from 20+ platforms — twitter/x, tiktok, instagram & more
image: /assets/og-image.png
---

# gronka

<a href="https://discord.com/oauth2/authorize?client_id=1522194017692156046"><img src="https://img.shields.io/badge/Add_to_Discord-5865F2?logo=discord&logoColor=white" alt="Add to Discord" height="20"></a>
<a href="https://github.com/thedorekaczynski/gronka"><img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white" alt="GitHub" height="20"></a>

gronka is a free, open-source discord bot that downloads videos and images from social media and converts them to gifs — right inside your server. no ads to click through, no reposting to sketchy sites: paste a link or drop a file and get it back in the channel.

## what it does

- **[`/download`](/commands/download/)** — grab a video or image from 20+ platforms: twitter/x, tiktok, instagram, youtube, reddit, twitch, imgur, and more
- **[`/convert`](/commands/convert/)** — turn any video or image into a gif, with trimming and quality presets
- **[`/optimize`](/commands/optimize/)** — compress an existing gif to shrink its file size

you can also right-click any message and use the context menu. every download source can be turned on or off individually from the built-in web dashboard.

[**Add gronka to your server →**](https://discord.com/oauth2/authorize?client_id=1522194017692156046) or [browse all commands](/commands/).

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
