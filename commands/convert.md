---
layout: command
title: "/convert — turn a video or image into a GIF in Discord"
description: "Convert a video (up to 100MB) or image to a GIF right inside Discord with gronka's /convert command. Trim, set quality, and compress — free and open source."
permalink: /commands/convert/
command_data: convert
---

`/convert` turns a video or image into a GIF without leaving Discord. Drop a file or paste a URL, and gronka handles the rest — with quality presets, trimming by start/end time, and optional compression to shrink the result. You can also right-click any message and pick **convert to gif** from the context menu.

## how to convert a video to a gif in discord

1. type `/convert` in any channel gronka can post to.
2. either attach a file to the `file` option, or paste a direct link into `url`.
3. optionally set `start_time` and `end_time` to trim, and `quality` to trade size against fidelity.
4. hit enter — the gif comes back as an attachment.

already have the video in the channel? right-click (or long-press on mobile) the message and pick **apps → convert to gif**. there's an advanced version of the same context menu if you want the options without typing the command out.

## quality presets

`quality` controls the colour palette and the dithering algorithm. bigger palettes look better and weigh more.

| preset | colours | dithering |
| --- | --- | --- |
| `low` | 128 | Bayer — fastest, visible banding on gradients |
| `medium` (default) | 192 | Sierra-2-4A — the balanced option |
| `high` | 256 | Floyd–Steinberg — best looking, slowest |

if the gif still comes out bigger than you want, set `optimize:true` to run it through the same gifsicle pass [`/optimize`](/commands/optimize/) uses, and tune `lossy` (0–100, default 35) to push the size down further.

## trimming

`start_time` and `end_time` are in seconds and apply to videos only — they're ignored for images. `/convert file:[attachment] start_time:30 end_time:60` gives you a gif of just that thirty-second stretch, which is usually the difference between a gif that fits in the channel and one that doesn't.

## supported formats

- **video** (up to 100MB) — mp4, mov, webm, avi, mkv
- **image** (up to 50MB) — png, jpg, jpeg, webp, gif

animated webp works too, including the stickers TikTok hands out — those take a separate ImageMagick path, because ffmpeg can't demux animated webp.
