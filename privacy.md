---
layout: default
title: Privacy Policy
description: "Privacy policy for the gronka Discord bot: what is stored, why, how long it is kept, and how to have it deleted."
permalink: /privacy/
---

# Privacy Policy

**Last updated:** September 30, 2026

This policy covers the gronka Discord bot and the website at gronka.dev. It explains what is stored, why, how long it is kept, and how to have it deleted.

## What we store

**Your Discord user ID.** A numeric ID that Discord assigns to your account. Everything below is filed under it.

**The media and links you submit.** Files you send to `/convert` or `/optimize`, and URLs you send to `/download`, along with the media retrieved for you.

**File hashes.** A hash of each processed file (a fingerprint computed from its contents), used to recognize a file we have already converted so the work is not repeated.

**Usage counts.** How many commands you have run, and the dates you first and last used the bot.

**Logs.** Server and error logs, which record file metadata and user IDs. They do not record file contents or the text of your messages.

**Ban records.** If you are banned from the service, your user ID and the reason.

## Why we store it

To carry out the commands you run, deliver the results, avoid repeating work already done, diagnose faults, enforce the terms of use, and report how many people use the bot. None of it is used for advertising or profiling.

## How long we keep it

Cached media, logs, operation records and URL records are deleted seven days after they are written, by an automated job that runs every six hours.

Files served over the CDN are removed sooner, within a few hours to a few days depending on file size.

Usage counts are kept until you ask for them to be deleted. Ban records are kept until the ban is lifted.

## How files are served

While a file is on the CDN it sits at a public URL derived from a hash of the file itself. Anyone holding that link can open it, and anyone who has the same file can work out the link. Links stop working once the file is removed.

## Who else receives it

The service runs on Discord and stores files with Cloudflare, so both handle your data in the course of normal operation. When you run `/download`, the request to the source platform is made by our servers rather than by you, and that platform's own policy governs what it records. We do not sell or trade your data, and we disclose it to no one else except where the law compels us.

## Your choices

Email gronkasupport@proton.me to ask what is stored about you, or to have it deleted. Everything other than your usage counts and any ban record is deleted on the schedule above regardless.

If you are in a jurisdiction with a data protection authority, you may complain to it.

## Children

gronka is not intended for anyone under the age of 13.

## Changes

This policy may be updated. The date above records the most recent change, and continuing to use the service after a change means you accept it.

## Contact

Email gronkasupport@proton.me, or open an issue at [github.com/thedorekaczynski/gronka](https://github.com/thedorekaczynski/gronka).
