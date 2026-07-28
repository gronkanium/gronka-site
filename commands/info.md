---
layout: command
title: "/info — bot stats & system info in Discord"
description: "View gronka's bot statistics, system information, cache stats, and GIF storage usage with the /info command inside Discord."
permalink: /commands/info/
command_data: info
---

`/info` reports bot statistics, system information, and GIF storage/cache usage in one place — a quick way to see how much gronka has been used and a health check for anyone running or self-hosting it.

## what it reports

`/info` takes no options. Run it anywhere gronka can post and it replies with an embed covering:

- **usage** — how long the bot has been up, how many servers it's in, and how many unique people have used it.
- **storage** — how many GIFs, videos, and images are stored and the disk they occupy, plus object storage used against its limit and how old the cached figure is. Reads `not configured` on instances running without object storage.
- **system** — platform and architecture, CPU count, memory used against total, and the Bun and gronka versions.

## when it's useful

on a self-hosted instance it's the fastest way to tell whether the container is healthy and whether storage is filling up, without shelling into the host. on a shared instance it tells you which version you're actually talking to, which matters when a fix has landed upstream but the bot you're using hasn't been restarted yet.

the reply also carries a link to the support server, if you want to ask a question or file a feature request.
