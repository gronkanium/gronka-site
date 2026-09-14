---
layout: default
title: Privacy Policy
description: Privacy policy for gronka Discord bot. Learn how we handle your data, file storage, and privacy rights.
permalink: /privacy/
---

# Privacy Policy

**Last Updated:** September 14, 2026

## Introduction

This privacy policy describes how gronka ("we", "our", or "the service") handles data when you use our Discord bot service.

Two things are worth stating up front, because they shape everything below:

- **We do not collect or store your Discord username.** Only your numeric Discord user ID is stored. Nothing in the service needs a name, so none is kept.
- **Nothing is retained indefinitely except a per-user tally.** Logs, operation records, URL records and cached media are all deleted automatically after **7 days**.

## Information We Collect

### Data from Discord

When you use gronka, we may receive the following information from Discord:

- **User Information**: Your numeric Discord user ID. **Your username is not stored.** Discord's API supplies one; the bot discards it rather than writing it to disk.
- **Message Content**: Video and image files you submit for conversion or optimization, and social media URLs you submit for download
- **Command Usage**: Information about when and how you use bot commands

### Automatically Collected Data

- **File Hashes**: BLAKE3 hashes of processed files for deduplication purposes
- **Usage Statistics**: User-specific metrics about bot usage (number of conversions, file sizes, command usage, etc.)
- **Error Logs**: Technical information when errors occur (may include your Discord user ID and file metadata, but not file contents or message text)

Log and operation messages written before September 14, 2026 may still contain usernames recorded under the previous policy. Those records are covered by the 7-day retention window and clear themselves; they are not rewritten.

## How We Use Your Information

We use the collected information to:

- Process and convert your video and image files to GIF format
- Download media from social platforms at your request
- Store converted and downloaded files and serve them via our CDN
- Prevent duplicate processing of identical files
- Monitor service health and diagnose technical issues
- Generate usage statistics for service monitoring

## Data Storage

### File Storage

- Converted GIFs and downloaded media files are cached on our servers and **deleted automatically after 7 days**
- Files are identified by BLAKE3 hash, which is also how duplicate work is avoided
- Processing records link a file to a Discord user ID; those records are **deleted automatically after 7 days**
- Files served via the CDN expire sooner, on a schedule based on size: roughly 72 hours for files under 100 MB, down to about 2 hours for the largest. Once expired they are removed from CDN storage

### Logs

- Server logs may contain Discord user IDs for operational purposes
- Logs are **deleted automatically after 7 days**
- Error logs do not contain file contents or personal messages

## Data Sharing

We do not sell, trade, or rent your personal information to third parties. We may share data only in the following circumstances:

- **Service Providers**: With hosting providers and CDN services necessary to operate the bot
- **Legal Requirements**: When required by law or to protect our rights
- **Discord**: Information is shared with Discord as part of normal bot operation (per Discord's Terms of Service)

## Your Rights

You have the right to:

- **Access**: Request information about what data we have about you. In practice this is your user ID, your first and last use timestamps, and your command counters — everything else about you older than 7 days has already been deleted
- **Deletion**: Request deletion of your data. Your per-user tally can be removed on request; everything else deletes itself within 7 days whether you ask or not
- **Opt-Out**: Stop using the bot at any time. Doing nothing else, all of your data except the per-user tally is gone within 7 days

To exercise these rights, contact us via email at gronkasupport@proton.me or through the [GitHub repository](https://github.com/thedorekaczynski/gronka).

## Data Security

We implement reasonable security measures to protect your data:

- Files are stored securely on our servers
- Access to data is restricted to necessary system operations
- We use industry-standard practices for data protection

However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.

## Children's Privacy

Our service is not intended for users under the age of 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.

## Changes to This Policy

We may update this privacy policy from time to time. We will notify users of any material changes by updating the "Last Updated" date at the top of this policy.

Your continued use of the service after changes constitutes acceptance of the updated policy.

## Contact Us

If you have questions about this privacy policy, please contact us:

- **Email**: gronkasupport@proton.me
- **GitHub**: [https://github.com/thedorekaczynski/gronka](https://github.com/thedorekaczynski/gronka)

## Third-Party Services

This service uses the following third-party services:

- **Discord**: Bot platform and API provider
- **Cloudflare**: CDN and tunnel services
- **Hosting Provider**: Server infrastructure

These services have their own privacy policies governing data handling.

### Website Analytics and Heatmaps

Our website (separate from the Discord bot) uses the following third-party services, which set cookies and collect usage data such as pages visited, approximate location, device/browser, and interactions:

- **Google Tag Manager / Google Analytics**: aggregate site traffic and usage analytics
- **Microsoft Clarity**: heatmaps and anonymized session recordings to understand how visitors use the site

We do not serve advertising on the website or in the bot.

When you use the download command, the URL you submit is fetched from the source platform (e.g. Twitter/X, TikTok, Instagram, YouTube) by download tools running on our own infrastructure. The source platform sees the request from our servers, not from you, and its own privacy policy governs that interaction.

## Data Retention

Deletion is automatic, on a job that runs every few hours. It is not a manual process and does not depend on anyone remembering to do it.

**Deleted after 7 days:**

- **Media Files**: cached GIFs, videos and images on our servers
- **Logs**: server and error logs
- **Operation Records**: per-command records of what was processed and whether it succeeded
- **Processed URLs**: records linking a submitted URL to a resulting file and a user ID

**Shorter than 7 days:**

- **CDN Uploads**: expire on a size-based schedule, from about 72 hours down to about 2 hours for the largest files

**Kept until you ask us to remove it:**

- **Per-User Tally**: your Discord user ID, first and last use timestamps, and counters for how many commands you have run. This is what lets the bot report how many people use it. It contains no username, no URLs, and no file references
- **Moderation Records**: if you are banned, your user ID and the ban reason

**Never stored at all:**

- **Usernames**: Discord provides one with every interaction; it is discarded rather than written to disk, and is not sent to our CDN provider or to notification services

## International Data Transfers

Your data may be processed and stored in countries other than your own, depending on where the service is hosted.

## Compliance

We aim to comply with applicable data protection laws, including GDPR for EU users and CCPA for California residents, to the extent applicable to this service.

---

_This privacy policy is effective as of the date listed above and applies to all users of the gronka Discord bot service._
