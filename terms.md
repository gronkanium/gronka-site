---
layout: default
title: Terms of Use
description: Terms of use for gronka Discord bot. Acceptable use policy, user responsibilities, and service terms.
permalink: /terms/
---

# Terms of Use

**Last Updated:** July 24, 2026

## Agreement to Terms

By using gronka, you agree to these terms. If you don't agree, don't use the service.

## What gronka Does

gronka is a Discord bot that:

- converts videos and images to GIF format
- downloads media from supported social platforms (twitter/x, tiktok, instagram, youtube, and others)
- stores and serves converted files via CDN

available commands: `/convert`, `/download`, `/optimize`, `/info`, plus context menu actions for quick access.

## Acceptable Use

you can use gronka to convert and download media for personal or commercial use, as long as you:

- have the right to use and convert the content you submit
- comply with copyright laws and platform terms of service
- don't upload illegal, harmful, or malicious content
- don't use the service to harass others or violate privacy rights

### Fair Use

use the service responsibly. there are no hard limits for normal use, but:

- don't spam commands or intentionally abuse the service
- don't use it for data storage or archival purposes
- excessive or abusive use may result in rate limiting or bans

running this service costs money. please be reasonable with your usage.

we may suspend or ban users who violate these terms or abuse the service, without notice or explanation.

## Service Limits

current limits:

- videos: 100mb maximum
- images: 50mb maximum
- rate limit: 10 seconds between commands per user
- admin users bypass these limits

limits may change without notice to ensure service stability.

## How It Works

gronka uses:

- **discord.js** for bot functionality
- **ffmpeg** and **gifsicle** for video/image conversion and gif optimization
- **cloudflare r2** (optional) for file storage and CDN
- hosted instances of **cobalt** and **yt-dlp** for social media downloads (see below)

files are stored either on cloudflare r2 or local storage, depending on configuration.

## Social Media Downloads

gronka fetches media from source platforms using hosted instances of [cobalt](https://github.com/imputnet/cobalt) (AGPL-3.0) and [yt-dlp](https://github.com/yt-dlp/yt-dlp) (Unlicense), two open-source download tools, and for some sources by fetching the media directly. these run on our own infrastructure — gronka itself is licensed under the MIT License, and the tools' licenses apply to us as the operator, not to your use of the bot.

we don't control the source platforms (twitter/x, tiktok, instagram, youtube, and others) and can't guarantee that any particular url or platform will work. platforms change their apis and restrictions without notice, and downloads may fail or stop working at any time.

## Your Responsibilities

- you're responsible for the content you submit
- you must have permission to use and convert any content you upload
- you're responsible for securing your discord account
- you bear all risk for how you use the service and downloaded content

## Disclaimers

we provide this service "as-is" with no warranties of any kind. this means:

- no guarantee of uptime or availability
- no warranty of fitness for any purpose
- no guarantee that converted files will be error-free
- we may modify or discontinue the service at any time

we're not liable for any damages, data loss, or issues arising from your use of the service.

## Indemnification

you agree to indemnify, defend, and hold gronka and its operator harmless from any claims, damages, losses, or expenses (including reasonable legal fees) arising from:

- content you submit, convert, or download through the service
- your violation of these terms
- your violation of any law or third-party right, including copyright, publicity, or privacy rights

this applies even after you stop using the service.

## Third-Party Services

this service uses:

- **discord** - bot platform (subject to discord's terms)
- **cloudflare** - CDN and storage

your use of these services is subject to their respective terms. cobalt and yt-dlp are open-source tools we host ourselves, not third-party services — see "Social Media Downloads" above.

## Intellectual Property

- you keep ownership of content you submit
- by using the service, you grant us permission to store, process, and serve your files
- gronka's source code is available under the MIT License at [github.com/thedorekaczynski/gronka](https://github.com/thedorekaczynski/gronka)

## Termination

you can stop using gronka anytime by removing the bot or not using commands.

we can terminate your access if you violate these terms, abuse the service, or for any reason we deem necessary.

## Changes to Terms

we may update these terms at any time. changes take effect immediately when posted. continued use means you accept the updated terms.

check the "last updated" date at the top to see when terms were last modified.

## Privacy

we collect minimal data to operate the service:

- discord user ids for rate limiting and tracking
- file hashes to avoid duplicate processing
- operation logs for debugging

we don't sell or share your data. see our privacy policy for details.

## Age Requirements

you must be at least 13 years old to use this service. if you're under 18, you need parental consent.

## Governing Law & Disputes

these terms are governed by applicable laws. if you have disputes or issues, please contact us through github or email for good faith resolution.

## Contact

for questions or issues:

- **email**: gronkasupport@proton.me
- **github**: [https://github.com/thedorekaczynski/gronka](https://github.com/thedorekaczynski/gronka)

---

_by using gronka, you acknowledge that you have read and agree to these terms._
