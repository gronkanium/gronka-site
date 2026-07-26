---
layout: command
title: "/optimize — compress and shrink a GIF in Discord"
description: "Compress an existing GIF to reduce its file size with gronka's /optimize command, right inside Discord. Free and open source."
permalink: /commands/optimize/
command_data: optimize
---

`/optimize` compresses an existing GIF to cut its file size while keeping it usable — handy for GIFs that are too big to send or embed. Attach the file or paste a URL and gronka returns a lighter version.

## how to shrink a gif in discord

1. type `/optimize` in any channel gronka can post to.
2. attach the gif to `file`, or paste a direct link into `url`. either way the cap is 50MB.
3. optionally set `lossy` to control how hard it compresses.
4. hit enter — the smaller gif comes back, along with how much came off.

for a gif already sitting in the channel, right-click (or long-press) the message and pick **apps → optimize**.

## picking a lossy level

`lossy` runs from 0 to 100 and defaults to 35. it works by allowing gifsicle to reuse similar colours between frames — the higher you push it, the more it's allowed to fudge, and the smaller the file gets.

| level | what you get |
| --- | --- |
| 0–30 | less compression, higher quality, larger files |
| 30–60 | balanced compression and quality |
| 60–100 | more compression, lower quality, smaller files |

frame optimisation always runs at gifsicle's maximum level, so even `lossy:0` will usually shave something off by stripping redundant pixels between frames — that part is lossless.

## when to reach for this

- a gif is just over your server's upload limit and you need it under
- a gif was exported at a higher quality than a Discord channel will ever show
- you converted something with [`/convert`](/commands/convert/) at `quality:high` and want the size back down

if you're starting from a video rather than a gif, use `/convert` with `optimize:true` instead — it does both passes in one go rather than making you round-trip the file.
