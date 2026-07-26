---
layout: command
title: "/download — TikTok, Twitter & Instagram videos in Discord"
description: "Download videos from TikTok, Twitter/X, Instagram, YouTube, Reddit & more directly in Discord with gronka's /download command. Free and open source."
permalink: /commands/download/
command_data: download
---

`/download` grabs a video or image from a social media link and posts it straight into your Discord server. It supports 20+ platforms — TikTok, Twitter/X, Instagram, YouTube, Reddit, Twitch, Imgur and more — powered by cobalt and yt-dlp. Every source can be turned on or off individually from the built-in web dashboard, so server admins stay in control of what's allowed.

## how to download a video in discord

1. copy the link to the post — the normal share link works, no need to clean up tracking parameters.
2. type `/download` in any channel gronka can post to, and paste the link into the `url` field.
3. hit enter. gronka replies in the channel with the video or image attached.

you can skip the command entirely: right-click (or long-press on mobile) any message containing a link, then pick **apps → download**. same result, no typing.

## supported platforms

<div class="platform-groups" markdown="0">
<div class="platform-group">
<h3>social</h3>
<ul>
<li>Twitter / X</li>
<li>TikTok</li>
<li>Instagram</li>
<li>Reddit</li>
<li>Facebook</li>
<li>Bluesky</li>
<li>Snapchat</li>
<li>Tumblr</li>
<li>Xiaohongshu / RedNote</li>
</ul>
</div>
<div class="platform-group">
<h3>video &amp; streaming</h3>
<ul>
<li>YouTube</li>
<li>Twitch (clips)</li>
<li>Kick</li>
<li>Rumble</li>
<li>Bilibili</li>
<li>Dailymotion</li>
<li>Streamable</li>
</ul>
</div>
<div class="platform-group">
<h3>media &amp; audio</h3>
<ul>
<li>Imgur</li>
<li>SoundCloud</li>
<li>Coub</li>
<li>Newgrounds</li>
</ul>
</div>
</div>

a handful of adult and image-board sources are supported too. they ship disabled-friendly — like every other source, an admin can switch them off from the dashboard.

## trimming while you download

`start_time` and `end_time` take seconds, and cut the video before it's posted. `/download url:… start_time:30 end_time:60` gives you just that thirty-second stretch, which is usually the difference between a clip that fits in the channel and one that doesn't.

## what you get back

gronka posts the original file as a normal Discord attachment whenever it fits. anything past your server's upload limit gets hosted and posted as a link instead of failing quietly, and admins can set their own size cap from the dashboard. downloaded videos can be piped straight into [`/convert`](/commands/convert/) if you want a gif out of them.
